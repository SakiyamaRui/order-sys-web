import { Connection } from "mysql";
import { query, release, rollback } from "../DB/DB";

/**
 * 商品情報の取得
 * @param {string} product_id 
 * @param {Connection} transaction 
 * @returns 
 */
const getProductData = (
    product_id,
    transaction
) => {
    return new Promise(async (resolve, reject) => {
        //
        if (!product_id) {
            reject(new Error("product_id is required"));
        }

        try {
            //
            let result = await query(
                "SELECT `PRODUCT_MASTER`.*, `shop_name` FROM `PRODUCT_MASTER` INNER JOIN `SHOP_MASTER` ON `PRODUCT_MASTER`.`shop_id` = `SHOP_MASTER`.`shop_id` WHERE `product_id` = ?;",
                [product_id],
                transaction
            ).catch((err) => {
                throw err;
            });

            if (result.length === 0) {
                throw new Error("product not found");
            }

            result = result[0];
            resolve({
                product_id: result.product_id,
                sale_date: result.sale_date,
                is_fixed_price: Boolean(result.is_fixed_price),
                shop_name: result.shop_name,
                reception: Boolean(result.reception),
                options: JSON.parse(result.options),
            });
        }catch(e) {
            reject(e);
        }
    });
}

export default getProductData;