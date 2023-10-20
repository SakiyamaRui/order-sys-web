import changeCartItem from "../../../middlewares/Cart/changeCartItem";


const cartItemDeleteCtl = async (req, res) => {
    try {
        //
        const cart_id = req.params.id || null;

        if (cart_id === null) {
            throw new Error("Invalid cart id");
        }

        // 
        await changeCartItem(cart_id, null).catch((err) => {
            throw err;
        });

        res.json({
            response: "OK",
        });
    }catch(e) {
        res.status(500).json({
            response: "error",
            message: "Internal Server Error",
            error: e.message,
        });
    }finally{
        res.end();
    }
}

export default cartItemDeleteCtl;