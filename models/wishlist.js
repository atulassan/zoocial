
Wishlist = {
    create(req, res) {
        res.setHeader('Content-Type', 'application/json');
        console.log(req.body);
        let favid = req.body.id;
        let favitems = req.session.favitems;
        let ckval = _.find(favitems, function (f) {
            return (f == favid);
        });
        if (!ckval || typeof ckval == 'undefined') {
            req.session.favitems.push(favid);
        }
        res.send(JSON.stringify({ "status": true, "method": 'create', 'items': req.session.favitems }));
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

module.exports = Wishlist;