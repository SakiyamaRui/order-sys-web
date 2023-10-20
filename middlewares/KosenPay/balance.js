import { getConnection, release } from "../../models/DB/DB";
import getBalance from "../../models/Payment/getBalance";
import getPaymentHistory from "../../models/Payment/history";


const getKosenpayBalance = (
    user_id
) => {
    return new Promise(async (resolve, reject) => {
        //
        const connection = await getConnection().catch((e) => {
            reject(e);
            return false;
        });

        if (!connection) {
            return;
        }

        try {
            //
            const balance = await getBalance(user_id, connection).catch((e) => {
                throw e;
            });

            const history = await getPaymentHistory(user_id, connection).catch((e) => {
                throw e;
            });

            resolve({
                balance,
                history,
                user_id,
            });
        }catch(e){
            reject(e);
        }finally{
            await release(connection);
        }
    });
}

export default getKosenpayBalance;