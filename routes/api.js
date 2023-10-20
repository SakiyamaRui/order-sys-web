import { Router } from "express";
var router = Router();
import cors from "cors";

import productRouter from "./api/product";
import sessionRouter from "./api/session";
import cartRouter from "./api/cart";
import orderRouter from "./api/order";
import kosenpayRouter from "./api/payment";

router.use("/", cors({
    origin: "http://localhost:3000",
}));

router.use("/", (req, res, next) => {
    if (req.method === "GET") {
        res.set("Cashe-Control", "public, max-age=300");
    }

    next();
})

router.use("/product", productRouter);

router.use("/session", sessionRouter);

router.use("/cart", cartRouter);

router.use("/order", orderRouter);

router.use("/kosenpay", kosenpayRouter);

export default router;