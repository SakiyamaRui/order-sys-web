import getOrderHistory from "../../../middlewares/Order/getOrderHistory";

const orderHistoryCtl = async (req, res) => {
    try {
        //
        // const user_id = req.session.user_id || null;
        const user_id = "test";

        var order_history = [];
        if (user_id !== null) {
            // 注文履歴の取得
            order_history = await getOrderHistory(user_id).catch((e) => {
                throw e;
            });
        }

        res.json({
            response: "OK",
            data: {
                order_history,
            }
        });

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

export default orderHistoryCtl;