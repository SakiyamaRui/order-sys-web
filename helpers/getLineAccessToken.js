import request from "request";

const client_secret = "a86bd28f462b4d6ebf777eebbc334557";

const getLineAccessToken = async ({
    code,
    client_id,
    redirect_uri,
}) => {
    return new Promise(async (resolve, reject) => {
        //
        request({
            url: "https://api.line.me/oauth2/v2.1/token",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            form: {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirect_uri,
                client_id,
                client_secret,
            }
        }, (err, res, body) => {
            //
            if (err) {
                reject(err);
                return;
            }

            // ログアウト処理
            request({
                url: "https://api.line.me/oauth2/v2.1/revoke",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                form: {
                    client_id,
                    client_secret,
                    access_token: body.access_token,
                }
            }, (err, res, responseBody) => {
                resolve(JSON.parse(body));
            });
        });
    });
}

export default getLineAccessToken;