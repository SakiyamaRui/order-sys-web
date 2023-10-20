import getProductPrice from "../../API/product/getProductPrice";
import getCartRecords from "../../models/Cart/getData";
import { getTransaction, release, rollback } from "../../models/DB/DB";

const getCartData = (user_id) => {
    return new Promise(async (resolve, reject) => {
        //
        const transaction = await getTransaction().catch((err) => {
            reject(err);
            return false;
        });

        if (!transaction) {
            return;
        }

        try {
            // DBからカート情報を取得
            const cartRecords = await getCartRecords(
                user_id,
                transaction
            ).catch((err) => {
                throw err;
            });

            // カート情報から、商品UUIDのリストを作成
            const productUUIDList = Array.from(new Set(cartRecords.map((record) => {
                return record.product_uuid;
            })));

            // 商品情報を取得する
            const product_data_list = (await getProductPrice(null, productUUIDList).catch((err) => {
                throw err;
            })).data.productDataList;

            
            resolve(cartRecords.map((record) => {
                const product_data = product_data_list.find((product) => {
                    return product.product_uuid === record.product_uuid;
                }) || {
                    product_name: "",
                    price: 0,
                };

                return {
                    ...record,
                    ...product_data,
                }
            }));
        }catch(e) {
            await rollback(transaction);
            reject(e);
        }finally {
            await release(transaction);
        }
    });
}

export default getCartData;