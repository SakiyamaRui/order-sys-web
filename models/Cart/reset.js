import { query } from "../DB/DB";


const cartItemReset = (user_id, transaction) => {
    return new Promise(async (resolve, reject) => {
        //
        try {
            await query(
                "UPDATE `USER_CART` SET `deleted` = 1 WHERE `user_id` = ?;",
                [user_id],
                transaction
            ).catch(e => {
                throw e;
            });

            resolve(true);
        }catch(e) {
            reject(e);
        }
    });
}

export default cartItemReset;