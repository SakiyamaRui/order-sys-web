import flakeIdGenerate from "../../helpers/flakeIdGenerate";
import { query } from "../DB/DB";
import { Connection } from "mysql";

/**
 * ユーザーIDの作成、すでにIDが存在する場合はそのIDを返す
 * @param {{
 *  sub_id: number,
 *  sub_id: string,
 * }} user_data プロバイダーのIDとopenidのsubを渡す
 * @param {Connection} transaction DBトランザクション
 * @returns {}
 */
const userIdRegist = ({
    sub_id,
    provider,
}, transaction) => {
    return new Promise(async (resolve, reject) => {
        try {
            // すでに追加されているか確認
            let reuslt = await query(
                "SELECT * FROM `USER_MASTER` WHERE `sub` = ? AND `provider` = ?",
                [sub_id, provider],
                transaction
            ).catch((err) => {
                throw err;
            });

            // すでに追加されているため、そのままIDを返す
            if (reuslt.length != 0) {
                resolve(reuslt[0].user_id);
                return;
            }

            // ユーザーIDの作成
            const user_id = flakeIdGenerate.gen();

            // ユーザーIDの登録
            await query(
                "INSERT INTO `USER_MASTER` (`user_id`, `sub`, `provider`) VALUES (?, ?, ?)",
                [user_id, sub_id, provider],
                transaction
            ).catch((err) => {
                throw err;
            });

            resolve(user_id);
        }catch(e) {
            reject(e);
        }
    });
}

export default userIdRegist;