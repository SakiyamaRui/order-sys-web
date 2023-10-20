import { query } from "../DB/DB";

const getCartRecords = async (user_id, transaction) => {
    return new Promise(async (resolve, reject) => {
        //
        try {
            const response = await query(
                "SELECT * FROM `USER_CART` WHERE `user_id` = ? AND `deleted` = 0;",
                [user_id],
                transaction
            ).catch((err) => {
                throw err;
            });

            resolve(response);
        }catch(e) {
            reject(e);
        }
    });
}

export default getCartRecords;