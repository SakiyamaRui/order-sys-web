import orderKosenPayPayment from "../../../middlewares/Order/orderKosenPayment";


const kosenPayPaymentOrderRegist = async (req, res) => {
    try {
        //
        const user_id = (process.env.NODE_ENV === "dev")? "test" : (req.session.user_id || null);


        if (user_id === null) {
            throw new Error("user_id is null");
        }

        const order_data = await orderKosenPayPayment(user_id).catch((err) => {
            throw err;
        });

        res.json({
            response: "OK",
            message: "success",
            data: {
                ...order_data,
            }
        });

    }catch(e) {
        console.log(e);
        res.status(500).json({
            response: "error",
            message: "Internal Server Error",
            error: e.message,
            code: 500,
        });
    }finally {
        res.end();
    }
}

export default kosenPayPaymentOrderRegist;