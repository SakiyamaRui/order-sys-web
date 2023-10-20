import getProductPrice from "../API/product/getProductPrice";
import { getConnection, release, rollback } from "../models/DB/DB";
import getProductData from "../models/Product/getProductData";


const generateProductData = (
    product_id
) => {
    return new Promise(async (resolve, reject) => {
        // トランザクションの取得
        const transaction = await getConnection().catch((err) => {
            reject(err);
            return false;
        });

        if (!transaction) {
            return;
        }

        try {
            // スマホ注文システム内から商品情報の取得
            var product_data = await getProductData(
                product_id,
                transaction
            ).catch(err => {
                throw err;
            });

            // 商品IDリストの作成
            var product_id_list = [product_data.product_id];

            product_data.options.forEach(elm => {
                elm.select.forEach((elm2) => {
                    if (elm2.product_id) {
                        product_id_list.push(elm2.product_id);
                    }
                });
            });


            const response = await getProductPrice(product_id_list).catch((err) => {
                throw err;
            });
            const product_data_list = response.data.productDataList;

            // マスターに追加
            const main_product = product_data_list.find(elm => elm.product_id === product_id) || {};

            product_data = {
                ...product_data,
                ...main_product,
                price_list: product_data_list,
            }

            resolve(product_data);
        }catch(e) {
            reject(e);
        }finally {
            await release(transaction);
        }
    });
}

export default generateProductData;