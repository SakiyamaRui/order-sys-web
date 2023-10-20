import productAppendToCart from "../../models/Cart/appendProduct";
import { commit, getTransaction, release, rollback } from "../../models/DB/DB";


/**
 * カートに商品を追加する
 * @param {Object} product_data 商品データ
 * @param {String} user_id ユーザー識別子
 * @returns {Promise<Boolean>} 成功した場合はtrue
 */
const appendToCart = (
    product_data,
    user_id,
) => {
    return new Promise(async (resolve, reject) => {
        //
        const transaction = await getTransaction().catch((err) => {
            reject(err);
            return false;
        });

        if (!transaction) return;

        try {
            const quantity = product_data.quantity;

            // メイン商品をカートに追加
            const cart_id = await productAppendToCart({
                product_uuid: product_data.product_uuid,
                parent_id: null,
                quantity,
                user_id: user_id,
            }, transaction).catch((err) => {
                throw err;
            });

            // オプションの登録
            for (let product_uuid in product_data.options) {
                await productAppendToCart({
                    product_uuid: product_data.options[product_uuid],
                    parent_id: cart_id,
                    quantity: quantity,
                    user_id: user_id,
                }, transaction).catch((err) => {
                    throw err;
                });
            }

            await commit(transaction).catch((err) => {
                throw err;
            });

            resolve(true);
        }catch(err) {
            await rollback(transaction);
            reject(err);
        }finally{
            await release(transaction);
        }
    });
}

export default appendToCart;