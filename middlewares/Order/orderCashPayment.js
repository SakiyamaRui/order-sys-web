import cartItemReset from "../../models/Cart/reset";
import { commit, getTransaction, release, rollback } from "../../models/DB/DB";
import orderRegist from "./orderRegist";


const orderCashPayment = async (
    user_id
) => {
    return new Promise(async (resolve, reject) => {
        const transaction = await getTransaction().catch((e) => {
            reject(e);
            return false;
        });

        if (!transaction) {
            return ;
        }

        try {
            const {order_id, total_amount, empty, list} = await orderRegist(
                user_id,
                transaction
            ).catch(e => {
                throw e;
            });

            // カートの削除
            await cartItemReset(user_id, transaction).catch(e => {
                throw e;
            });

            await commit(transaction).catch((e) => {
                throw e;
            });

            resolve({
                order_id,
                total_amount,
                empty,
                list,
            });
        }catch(e) {
            await rollback(transaction);
            reject(e);
        }finally{
            await release(transaction);
        }
    });
}

export default orderCashPayment;