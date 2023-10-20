import getCartData from "../../../middlewares/Cart/getCartData";


const getCartDataCtl = async (req, res) => {
    try {
        //
        // const user_id = req.session.user_id || null;
        const user_id = "test";

        if (user_id === null) {
            throw new Error("User not logged in");
        }

        // カート情報の取得
        const cartData = await getCartData(user_id).catch((err) => {
            throw err;
        });

        res.json({
            response: "OK",
            data: {
                cartData,
            }
        })
    }catch(e) {
        res.status(500).json({
            response: "error",
            message: "Internal Server Error",
            error: e.message,
        });
    }finally{
        res.end();
    }
}

export default getCartDataCtl;