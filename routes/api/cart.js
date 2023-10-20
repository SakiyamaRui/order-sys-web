import { Router } from "express";
import cartAppendCtl from "../../controllers/api/cart/append";
import getCartDataCtl from "../../controllers/api/cart/get";
import cartItemDeleteCtl from "../../controllers/api/cart/delete";
import cartItemChangeCtl from "../../controllers/api/cart/change";
var router = Router();

// 情報の取得
router.get("/", getCartDataCtl);

// 情報の追加
router.post("/", cartAppendCtl);

// アイテムの削除
router.delete("/:id", cartItemDeleteCtl);

router.put("/:id", cartItemChangeCtl);

export default router;