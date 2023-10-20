import { Router } from "express";
var router = Router();

// セッションデータの取得
router.get("/data", (req, res) => {
    try {
        // セッション
        const user_id = req.session.user_id || null;
        const is_login = user_id !== null;
        const user_name = null;

        // カート情報の取得

        res.json({
            userId: user_id,
            isLogin: is_login,
            userName: user_name,
            cartLength: 0,
        });
    }catch(e) {
        console.error(e);
        res.status(500).send({
            response: "error",
            message: "Internal Server Error",
            error: e.message,
        });
    }finally {
        res.end();
    }
});


export default router;