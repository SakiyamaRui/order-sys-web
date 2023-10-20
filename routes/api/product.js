import { Router } from "express";
import productListCtl from "../../controllers/api/product/productList";
import productDataCtl from "../../controllers/api/product/productData";
var router = Router();

router.get("/productList", productListCtl);

router.get("/productData/:product_id", productDataCtl);

export default router;