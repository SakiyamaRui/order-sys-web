import { commit, getConnection, getTransaction, rollback } from "../../models/DB/DB";
import kousenpayRegist from "../../models/Payment/regist";


const chargeKosenpay = ({
    amount,
    payment_id,
    user_id
}) => {
    return new Promise(async (resolve, reject) => {
        const transaciton = await getTransaction().catch((e) => {
            reject(e);
            return false;
        });

        if (!transaciton) {
            return ;
        }

        try {
            //
            const res = await kousenpayRegist({
                amount,
                payment_id,
                type: 1,
                user_id,
            }, transaciton).catch((e) => {
                throw e;
            });

            //
            if (res.result) {
                // コミット
                await commit(transaciton).catch((e) => {
                    throw e;
                });
            }else{
                // ロールバック
                await rollback(transaciton);
            }

            resolve(res);
        }catch(e) {
            reject(e);
            await rollback(transaciton);
        }finally {
            await release(transaciton);
        }
    });
}

export default chargeKosenpay;