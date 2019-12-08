

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
    lists(req, res) {

        wcapi.get("products", {
            per_page: 20, // 20 products per page
        }).then((response) => {
            res.render("Shop/pages/shop", {products: response.data});
        }).catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
            console.log("Response Data:", error.response.data);
        });
    },
    list(req, res) {
        
        console.log(req.params.id);

        wcapi.get("products/"+req.params.id).then((response) => {
            console.log(response.data);
            res.render("Shop/pages/singleproduct", {product: response.data});
        }).catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
            console.log("Response Data:", error.response.data);
        });
    }
}

module.exports = Products;