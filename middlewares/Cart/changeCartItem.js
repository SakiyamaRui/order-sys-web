import deleteCartItem from "../../models/Cart/deleteItem";
import changeCartQuantity from "../../models/Cart/quantityChange";
import { commit, getTransaction, rollback, release } from "../../models/DB/DB";


const changeCartItem = async (cart_id, quantity = null) => {
    return new Promise(async (resolve, reject) => {
        // トランザクションの取得
        const transaction = await getTransaction().catch((err) => {
            reject(err);
            return false;
        });

        if (transaction === false) {
            return;
        }

        try {
            if (quantity == null) {
                // カートの削除
                await deleteCartItem(cart_id, transaction).catch((err) => {
                    throw err;
                });
            }else{
                // 個数の変更
                await changeCartQuantity(cart_id, quantity, transaction).catch((err) => {
                    throw err;
                });
            }

            await commit(transaction).catch((err) => {
                throw err;
            });

            resolve(true);
        }catch(e) {
            await rollback(transaction);
            reject(e);
        }finally {
            await release(transaction);
        }
    });
}

export default changeCartItem;