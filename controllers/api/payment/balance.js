import getKosenpayBalance from "../../../middlewares/KosenPay/balance";

const getKosenpayBalanceCtl = async (req, res) => {
    try {
        const user_id = (process.env.NODE_ENV === "dev")? "test" : (req.session.userId || null);

        if (user_id == null) {
            throw new Error("ログインしていません。");
        }

        const balance = await getKosenpayBalance(user_id).catch((e) => {
            throw e;
        });

        res.json({
            response: "OK",
            ...balance,
        });
    }catch(e) {
        res.status(500).json({
            response: "error",
            message: "Internal Server Error",
            error: e.message,
        });
    }finally {
        res.end();
    }
}

export default getKosenpayBalanceCtl;