
Cart = {
    create(req, res) {
        res.setHeader('Content-Type', 'application/json');
        console.log(req.body);
        let pid = req.body.id;
        let qty = parseInt(req.body.quantity);
        let cartitems = req.session.cartitems;
        let ckavail = false;

        console.log(qty);
        console.log(cartitems);

        cartitems = cartitems.forEach((cartitem, el) => {
            var quantity = cartitems[el].quantity;
            if(cartitem.id==pid) {
                ckavail = true;
                req.session.cartitems[el].quantity += parseInt(qty); 
            }
        });

        console.log(ckavail);
        console.log(req.session.cartitems);

        cart = {
            id : pid,
            quantity: qty
        };

        if (!ckavail) {
            req.session.cartitems.push(cart);
        }
        res.send(JSON.stringify({ "status": true, "method": 'create', 'items': req.session.cartitems }));
    },
    update(req, res) {
        res.setHeader('Content-Type', 'application/json');
        console.log(req.body);
        res.send(JSON.stringify({ "status": 400, "method": 'update' }));
    },
    delete(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "status": 400, "method": 'delete' }));
    },
    lists(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "status": 400, "method": 'lists' }));
    },
    list(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "status": 400, "method": 'list' }));
    }
}

module.exports = Cart;