import request from "request";
import API_ENDPOINT from '../API_ENDPOINT';

const orderRegistServer = (
    order_item_list
) => {
    return new Promise((resolve, reject) => {
        try {
            const options = {
                method: "POST",
                json: true,
                url: `${API_ENDPOINT}/order/regist`,
                form: {
                    order_items: JSON.stringify(order_item_list),
                }
            }
    
            request(
                options,
                (err, res, body) => {
                    if (err) {
                        throw err;
                    }

                    if (body.response == "OK") {
                        const data = body.data;
                        const order_id_list = data.order_id_list;
                        const total_amount = data.order_items.reduce((acc, cur) => {
                            return acc + (cur.quantity * cur.unit_price);
                        }, 0);
        
                        resolve({
                            empty: false,
                            order_id_list,
                            total_amount,
                        });
                    }

                    // 在庫切れ
                    if (body?.error == "empty_item") {
                        resolve({
                            empty: true,
                            list: body.list
                        });
                    }
                }
            )
        }catch(e) {
            reject(e);
        }
    })
}

export default orderRegistServer;