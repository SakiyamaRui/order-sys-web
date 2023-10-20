import { query } from "../DB/DB";
import flakeId from "../../helpers/flakeIdGenerate";
import { Connection } from "mysql";

/**
 * 注文IDとアカウントを紐付ける
 * @param {string} order_id 注文ID
 * @param {string} user_id ユーザーID
 * @param {Connection} transaction 
 * @returns 
 */
const orderLinkAccount = (
    order_id_list,
    user_id,
    transaction
) => {
    return new Promise(async (resolve, reject) => {
        try {
            //

            for (let key in order_id_list) {
                const order_link_id = flakeId.gen();

                await query(
                    "INSERT INTO `ORDER_LIST` (`order_link_id`,`order_id`,`user_id`) VALUES (?,?,?);",
                    [order_link_id, order_id_list[key], user_id],
                    transaction
                ).catch((err) => {
                    throw err;
                });
            }

            resolve(true);
        }catch(e) {
            reject(e);
        }
    });
}

export default orderLinkAccount;