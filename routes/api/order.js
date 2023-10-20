import { Router } from "express";
import cashPaymentOrderRegistCtl from "../../controllers/api/order/cashPayment";
import orderHistoryCtl from "../../controllers/api/order/history";
import kosenPayOrderRegistCtl from "../../controllers/api/order/kosenPayment";
var router = Router();

router.post("/regist/cashPayment", cashPaymentOrderRegistCtl);

router.post("/regist/kosenPay", kosenPayOrderRegistCtl);

router.get("/history", orderHistoryCtl);

export default router;