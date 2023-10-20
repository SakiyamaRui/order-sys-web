import changeCartItem from "../../../middlewares/Cart/changeCartItem";


const cartItemChangeCtl = async (req, res) => {
    try {
        //
        const cart_id = req.params.id || null;
        const quantity = Number(req.body.quantity) || 1;

        if (cart_id === null) {
            throw new Error("Invalid cart id");
        }

        // 
        await changeCartItem(cart_id, quantity).catch((err) => {
            throw err;
        });

        res.json({
            response: "OK",
        });
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

export default cartItemChangeCtl;