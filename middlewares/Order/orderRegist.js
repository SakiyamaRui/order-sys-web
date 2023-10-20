import orderRegistServer from "../../API/Order/orderRegist";
import getCartRecords from "../../models/Cart/getData";
import orderLinkAccount from "../../models/Order/orderLinkAccount";

const orderRegist = (
    user_id,
    transaction
) => {
    return new Promise(async (resolve, reject) => {
        try {
            // カートの中身を取得
            const records = await getCartRecords(
                user_id,
                transaction
            ).catch(e => {
                throw e;
            });

            // 注文登録用のデータにフォーマット
            const order_item_list = records.map(record => {
                return {
                    order_line_id: null,
                    order_id: null,
                    quantity: record.quantity,
                    product_uuid: record.product_uuid,
                    store_id: "null",
                    deleted: false,
                };
            });

            // 注文登録のリクエスト
            const {
                totalAmount,
                order_id_list,
                empty,
                list,
            } = await orderRegistServer(
                order_item_list
            ).catch(err => {
                console.log(err);
                throw e;
            });

            // 在庫切れあり
            if (empty) {
                resolve({
                    empty: true,
                    list: list,
                });

                return ;
            }

            // 注文IDをアカウントに紐づけ
            await orderLinkAccount(
                order_id_list,
                user_id,
                transaction
            ).catch(e => {
                throw e;
            });

            resolve({
                order_id: order_id_list[0],
                order_id_list,
                total_amount: totalAmount,
                empty: false,
            });
        }catch(e){
            reject(e);
        }
    });
}

export default orderRegist;