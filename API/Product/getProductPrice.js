import request from "request";
import API_ENDPOINT from '../API_ENDPOINT';


/**
 * 商品の価格を取得する
 * @param {Array<String>} product_id_list
 * @returns {Promise<Object>} 
 */
const getProductPrice = (
    product_id_list = [],
    product_uuid_list = [],
) => {
    const options = {
        method: "POST",
        json: true,
        url: `${API_ENDPOINT}/product/getProductPrice`,
        form: {
            product_id_list: JSON.stringify(product_id_list),
            product_uuid_list: JSON.stringify(product_uuid_list),
        }
    }

    return new Promise((resolve, reject) => {
        try {
            request(options, (err, res, body) => {
                if (err) {
                    throw err;
                }

                resolve(body);
            });
        }catch(e) {
            console.log(e);
            reject(e);
        }
    });
}

export default getProductPrice;