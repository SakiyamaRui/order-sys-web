import generateProductData from "../../../middlewares/ganerateProductData";


const productDataCtl = async (req, res) => {

    try {
        const params = req.params;
        var product_id = "";

        if (params.hasOwnProperty("product_id")) product_id = params.product_id;
        else throw new Error("product_id is not defined");

        // 商品情報を取得
        const product_data = await generateProductData(product_id).catch((err) => {
            throw err;
        });

        res.json({
            response: "OK",
            data: {
                ...product_data,
            },
        });

    }catch(err) {
        res.status(500).json({
            response: "error",
            message: "Internal Server Error",
            error: err.message,
        });
    }finally {
        res.end();
    }
}

export default productDataCtl;