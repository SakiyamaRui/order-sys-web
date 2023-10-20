import generateProductList from "../../../middlewares/generateProductList";

const productListCtl = async (req, res) => {
    try {
        // 取得する販売日
        // const sale_date = req.body.sale_date;

        const product_list  = await generateProductList("2023-10-25");

        res.json({
            response: "OK",
            data: {
                product_list: product_list,
            }
        })
    }catch(e) {
        console.log(e);

        res.status(500).json({
            response: "error",
            message: "Internal Server Error",
            error: e.message,
        });
    }finally{
        res.end();
    }
}

export default productListCtl;