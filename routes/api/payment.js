import { Router } from "express";
import getKosenpayBalanceCtl from "../../controllers/api/payment/balance";
var router = Router();

router.get("/balance", getKosenpayBalanceCtl);

export default router;