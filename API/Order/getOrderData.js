import request from "request";
import API_ENDPOINT from '../API_ENDPOINT';


const getOrderData = (order_id) => {
    return new Promise((resolve, reject) => {
        try {
            //
            const options = {
                method: "GET",
                JSON: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                url: `${API_ENDPOINT}/order/${order_id}`,
            };

            request(options, (err, res, body) => {
                if (err) {
                    throw err;
                }

                if (res.statusCode === 200) {
                    resolve(JSON.parse(body));
                }else{
                    throw new Error("Bad Request");
                }
            });
        }catch(e) {
            reject(e);
        }
    });
}

export default getOrderData;