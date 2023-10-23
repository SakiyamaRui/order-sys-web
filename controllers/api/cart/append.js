import appendToCart from "../../../middlewares/Cart/appendToCart";

const cartAppendCtl = async (req, res) => {
    try {
        //
        const user_id = (process.env.NODE_ENV === "dev")? "test" : (req.session.user_id || null);

        // ログインしていない場合はエラー
        if (user_id === null) {
            throw new Error("User not logged in");
        }

        // 商品情報の登録
        await appendToCart(
            JSON.parse(req.body.product_data),
            user_id
        ).catch((err) => {
            throw err;
        });

        res.json({
            response: "OK",
            message: "Success",
        });

    }catch(e) {
        console.log(e);
        res.status(500).json({
            response: "error",
            message: "Internal Server Error",
            error: e.message,
        });
    }finally {
        res.end();
    }
}

export default cartAppendCtl;