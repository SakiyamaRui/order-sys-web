import {query} from "../DB/DB";
import flakeId from "../../helpers/flakeIdGenerate";

const productAppendToCart = ({
    product_uuid,
    parent_id = null,
    quantity,
    user_id,
}, transaction) => {
    return new Promise(async (resolve, reject) => {
        try {
            // IDの生成
            const cart_id = flakeId.gen();

            await query(
                "INSERT INTO `USER_CART`(`cart_id`,`parent_id`,`quantity`,`user_id`,`product_uuid`) VALUES(?,?,?,?,?);",
                [cart_id, parent_id, quantity, user_id, product_uuid],
                transaction
            ).catch((err) => {
                throw err;
            });

            resolve(cart_id);
        }catch(err) {
            reject(err);
        }
    });
}

export default productAppendToCart;