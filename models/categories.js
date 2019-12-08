

Categories = {
    create(req, res) {
        res.send(JSON.stringify({ "status": 400, "method": 'put' }));
    },
    update(req, res) {
        res.send(JSON.stringify({ "status": 400, "method": 'put' }));
    },
    delete(req, res) {
        res.send(JSON.stringify({ "status": 400, "method": 'delete' }));
    },
    async lists(req, res) {

        let categories = await getWCApiAsync("products/categories");

        data = {
            categories: utls.getNestedChildren(categories, 0)
            //categories: categories
        }

        res.render("Shop/pages/categories", data);

    },
    
    async list(req, res) {

        rqdata = {
            category: req.params.id
        }

        let products = await getWCApiAsync("products", rqdata);
        let categories = await getWCApiAsync("products/categories");

        var getSubcategories = categories.filter(function (category) {
            return category.parent == req.params.id;
        });

        console.log(getSubcategories);

        data = {
            products: products,
            categories: utls.getNestedChildren(categories, 0),
            subcategories: (getSubcategories.length > 0) ? getSubcategories : null
        }

        res.render('shop/pages/category', data);
    }
}

module.exports = Categories;