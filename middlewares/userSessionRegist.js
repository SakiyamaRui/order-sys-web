import { commit, getTransaction, release, rollback } from "../models/DB/DB";
import userIdRegist from "../models/Login/userIdRegist";


const userSessionRegist = (
    sub_id,
    provider,
) => {
    return new Promise(async (resolve, reject) => {
        const transaction = await getTransaction().catch((err) => {
            reject(err);
            return false;
        });

        if (transaction === false) {
            return;
        }

        try {
            // user_idの検索、作成
            const user_id = await userIdRegist({
                provider,
                sub_id
            }, transaction).catch((err) => {
                throw err;
            });

            await commit(transaction).catch((err) => {
                throw err;
            });

            resolve(user_id);
        }catch(e) {
            await rollback(transaction);
            reject(e);
        }finally {
            await release(transaction);
        }
    });
}

export default userSessionRegist;