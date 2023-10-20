import { Connection } from "mysql";
import { query, release, rollback } from "../DB/DB";

/**
 * 商品リストの取得
 * @param {string} sale_date 
 * @param {Connection} transaction 
 * @returns 
 */
const getProductList = (
    sale_date,
    transaction
) => {
    return new Promise(async (resolve, reject) => {
        //
        if (!sale_date) {
            reject(new Error("sale_date is required"));
        }

        try {
            //
            let result = await query(
                "SELECT `product_id`,`sale_date`,`is_fixed_price`,`shop_name`,`reception` FROM `PRODUCT_MASTER` INNER JOIN `SHOP_MASTER` ON `PRODUCT_MASTER`.`shop_id` = `SHOP_MASTER`.`shop_id` WHERE `sale_date` = ?;",
                [sale_date],
                transaction
            ).catch((err) => {
                throw err;
            });

            resolve(result.map((elm) => {
                return {
                    product_id: elm.product_id,
                    sale_date: elm.sale_date,
                    is_fixed_price: Boolean(elm.is_fixed_price),
                    shop_name: elm.shop_name,
                    reception: Boolean(elm.reception),
                }
            }));
        }catch(e) {
            reject(e);
        }
    });
}

export default getProductList;