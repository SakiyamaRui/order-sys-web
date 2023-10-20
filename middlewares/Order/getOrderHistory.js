import getOrderData from "../../API/Order/getOrderData";
import { getConnection, release, rollback } from "../../models/DB/DB";
import userOrders from "../../models/Order/userOrders";

const getOrderHistory = (
    user_id
) => {
    return new Promise(async (resolve, reject) => {
        const connection = await getConnection().catch((e) => {
            reject(e);
            return false;
        });

        if (!connection) {
            return ;
        }

        try {
            // ユーザーの注文一覧を取得
            const userOrdersList = await userOrders(
                user_id,
                connection
            ).catch((e) => {
                throw e;
            });

            // サーバーから注文情報を取得
            var order_history = [];
            for (let key in userOrdersList) {
                //
                const order_id = userOrdersList[key].order_id;

                const order_data = await getOrderData(order_id).catch((e) => {
                    throw e;
                });

                order_history.push(order_data.data);
            }

            resolve(order_history);

        }catch(e) {
            console.log(e)
            reject(e);
        }finally{
            await release(connection);
        }
    });
}

export default getOrderHistory;