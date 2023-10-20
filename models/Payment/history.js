import { query } from "../DB/DB";


const getPaymentHistory = (user_id, transaciton) => {
    return new Promise(async (resolve, reject) => {
        try {
            const history = await query(
                "SELECT * FROM `KOSEN_PAY_LOG` WHERE `user_id` = ?;",
                [user_id],
                transaciton
            ).catch((e) => {
                throw e;
            });


            if (history.length === 0) {
                resolve([]);
            }

            resolve(history);
        }catch(e) {
            reject(e);
        }
    });
}

export default getPaymentHistory;