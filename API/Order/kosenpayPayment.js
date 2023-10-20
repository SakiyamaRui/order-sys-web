import request from "request";
import API_ENDPOINT from "../API_ENDPOINT";

const kosenPayRegist = ({
    order_id_list,
    user_id,
}) => {
    return new Promise((resolve, reject) => {
        //
        const options = {
            method: "POST",
            json: true,
            url: `${API_ENDPOINT}/register/payment/kosenPayPayment`,
            form: {
                user_id,
                order_id_list,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        request(
            options,
            (err, res, body) => {
                if (err) {
                    throw err;
                }

                const data = body;

                if (data?.result) {
                    resolve({
                        ...data,
                    });
                    return;
                }
                
                reject({
                    ...data,
                });
            }
        )
    });
}

export default kosenPayRegist;