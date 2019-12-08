

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
    lists(req, res) {
        wcapi.get("products/categories").then((response) => {
            res.render("Shop/pages/categories", { categories: response.data });
        }).catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
            console.log("Response Data:", error.response.data);
        });
    },
    
    list(req, res) {

        console.log(req.params.id);
        // List cate products
        wcapi.get("products?category="+req.params.id).then((response) => {
            // Successful request
            res.render("Shop/pages/category", { products: response.data });
        }).catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
            console.log("Response Data:", error.response.data);
        });

        /*wcapi.get("products/categories/"+req.params.id).then((response) => {
            console.log(response.data);
            res.render("Shop/pages/category", {product: response.data});
        }).catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
            console.log("Response Data:", error.response.data);
        });*/
    }
}

module.exports = Categories;