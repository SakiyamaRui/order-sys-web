import getProductPrice from "../API/product/getProductPrice";
import { getTransaction, release, rollback } from "../models/DB/DB";
import getProductList from "../models/Product/getProductList";


const generateProductList = (
    sale_date,
) => {
    return new Promise(async (resolve, reject) => {
        //
        const transaction = await getTransaction().catch((err) => {
            reject(err);
            return false;
        });

        if (!transaction) {
            return ;
        }

        try {
            // 商品一覧の取得
            const product_list = await getProductList(sale_date, transaction).catch((err) => {
                throw err;
            });

            if (product_list.length == 0) {
                resolve([]);
            }

            // 商品の情報を取得
            const product_id_list = product_list.map((elm) => elm.product_id);
            const api_response = await getProductPrice(product_id_list).catch((err) => {
                throw err;
            });

            const product_list_master = product_list.map((elm) => {

                let product_data = api_response?.data?.productDataList.find((record) => {
                    return record.product_id == elm.product_id;
                });

                if (!product_data) {
                    product_data = {
                        price: 0,
                        product_name: "",
                    }
                }

                return {
                    ...elm,
                    price: product_data?.price,
                    product_name: product_data.product_name,
                }
            });

            resolve(product_list_master);
        }catch(e) {
            await rollback(transaction);
            reject(e);
        }finally {
            await release(transaction);
        }
    });
}

export default generateProductList;