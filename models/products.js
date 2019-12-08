

Products = {
    create(req, res) {
        // List products
        wcapi.get("products", {
            per_page: 20, // 20 products per page
        }).then((response) => {
            res.render("Shop/pages/shop", response.data);
        }).catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
            console.log("Response Data:", error.response.data);
        });

    },
    update(req, res) {
        res.send(JSON.stringify({ "status": 400, "method": 'put' }));
    },
    delete(req, res) {
        res.send(JSON.stringify({ "status": 400, "method": 'delete' }));
    },
    async lists(req, res) {

        let products = await getWCApiAsync("products");
        let categories = await getWCApiAsync("products/categories");

        data = {
            products: products,
            categories: utls.getNestedChildren(categories, 0)
        }

        res.render("Shop/pages/shop", data);
    },
    async list(req, res) {
        //console.log(req.params.id);
        let product = await getWCApiAsync("products/" + req.params.id);
        let categories = await getWCApiAsync("products/categories");
        data = {
            product: product,
            categories: utls.getNestedChildren(categories, 0)
        }
        res.render("Shop/pages/singleproduct", data);
    }
}

module.exports = Products;