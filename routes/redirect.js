import { Router } from "express";
import crypto from "crypto";
import getLineAccessToken from "../helpers/getLineAccessToken";
import jwtVerify from "../helpers/jwtVerify";
import userSessionRegist from "../middlewares/userSessionRegist";
var router = Router();

const defaultRedirect = "http://localhost:3031/";

const lineRedirectURI = "http://localhost:3031/redirect/line/openid";
const lineRedirect = "https://access.line.me/oauth2/v2.1/authorize";
const LINE_CLIENT_ID = "1660978812";


router.get("/line", (req, res) => {

    const params = new URLSearchParams({
        response_type: "code",
        client_id: LINE_CLIENT_ID,
        redirect_uri: encodeURI(`${lineRedirectURI}?return_to=${req.query.return_to || defaultRedirect}`),
        state: crypto.randomUUID(),
        scope: "openid",
    });

    res.redirect(`${lineRedirect}?${params.toString()}`);
});

router.get("/line/openid", async (req, res) => {
    try {
        // エラーが発生している場合
        if (req.query.error) {
            console.error(req.query.error);

            // エラーの発生
            res.send("error");
            return;
        }


        // アクセストークンの取得
        const response = await getLineAccessToken({
            code: req.query.code,
            client_id: LINE_CLIENT_ID,
            redirect_uri: encodeURI(`${lineRedirectURI}?return_to=${req.query.return_to || defaultRedirect}`),
        });

        if (response.error) {
            throw response.error;
        }

        // JWTの解析
        const sub = jwtVerify(response.id_token);

        // データベースにログインの登録
        const user_id = await userSessionRegist(sub, 1);

        req.session.user_id = user_id;

        // デフォルトのリダイレクト先へリダイレクト
        res.redirect(req.query.return_to || defaultRedirect);
    }catch(e) {
        console.log(e);
        res.json(e);
    }finally {
        res.end();
    }
});


export default router;