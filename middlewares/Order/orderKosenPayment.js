import kosenPayRegist from "../../API/Order/kosenpayPayment";
import cartItemReset from "../../models/Cart/reset";
import { commit, getTransaction, release, rollback } from "../../models/DB/DB";
import orderRegist from "./orderRegist";


const orderKosenPayPayment = async (
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
            const {order_id, total_amount, empty, list, order_id_list,} = await orderRegist(
                user_id,
                transaction
            ).catch(e => {
                throw e;
            });

            if (empty) {
                resolve({
                    order_id,
                    total_amount,
                    empty,
                    list,
                });

                return ;
            }

            // カートの削除
            await cartItemReset(user_id, transaction).catch(e => {
                throw e;
            });

            // KosenPayで決済
            await kosenPayRegist({
                order_id_list,
                user_id,
            }).catch((err) => {
                throw err;
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

export default orderKosenPayPayment;