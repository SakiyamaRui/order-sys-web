import { query } from "../DB/DB";
import { Connection } from "mysql";


/**
 * カート内の商品を削除する
 * @param {string} cart_id カートアイテム識別子
 * @param {Connection} transaction 
 * @returns 
 */
const deleteCartItem = (cart_id, transaction) => {
    return new Promise(async (resolve, reject) => {
        try {
            await query(
                "UPDATE `USER_CART` SET `deleted` = 1 WHERE `cart_id` = ? OR `parent_id` = ?;",
                [cart_id, cart_id],
                transaction
            ).catch((err) => {
                throw err;
            });

            resolve(true);
        }catch(e) {
            reject(e);
        }
    });
}

export default deleteCartItem;