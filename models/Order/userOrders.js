import { query } from "../DB/DB";


const userOrders = (
    user_id,
    transaction
) => {
    return new Promise(async (resolve, reject) => {
        try {
            //
            const userOrders = await query(
                "SELECT * FROM `ORDER_LIST` WHERE `user_id` = ?;",
                [user_id],
                transaction
            ).catch((e) => {
                throw e;
            });

            resolve(userOrders);
        }catch(e) {
            reject(e);
        }
    });
}

export default userOrders;