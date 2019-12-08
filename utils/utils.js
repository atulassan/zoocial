var crypto = require('crypto');

utls = {
    isEmpty: function (val) {
        if (val != '' && val != 0 && typeof (val) != 'undefined' && typeof (val) != 'null' && val != null) {
            return true;
        } else {
            return false;
        }
    },
    saltHashPassword: function (password, pslt = '', slt = true) {
        var pswd = '';
        var slth = [];
        let Salt = crypto.randomBytes(16).toString('base64');
        //let Hash = crypto.createHmac('sha512', Salt).update(password).digest("base64");
        let Hash = crypto.createHmac('sha512', Salt).update(password).digest("base64");

        if (slt) {
            slth.push(Salt);
            slth.push(Salt + "$" + Hash);
        } else {
            if (pslt == '' || pslt == null || typeof (pslt) == 'undefined') {
                var splt = password.split('$');
                slth.push(splt[0]);
                slth.push(splt[1]);
            } else {
                Hash = crypto.createHmac('sha512', pslt).update(password).digest("base64");
                slth.push(pslt);
                slth.push(pslt + "$" + Hash);
            }
        }
        return slth;
    },
    getToken: function () {
        return crypto.randomBytes(16).toString('base64');
    },
    getNestedChildren: function (arr, parent) {
        var children = [];
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i].parent == parent) {
                var grandChildren = this.getNestedChildren(arr, arr[i].id)

                if (grandChildren.length) {
                    arr[i].children = grandChildren;
                }
                children.push(arr[i]);
            }
        }
        return children;
    },
    getCategories: function (callback) {
        
        // List products
       wcapi.get("products/categories").then((response) => {
            callback(true, this.getNestedChildren(response.data, 0));
        }).catch((error) => {
            callback(false, error);
        });

    },
    check: function (a, b) {
        return a+b;
    }
}

module.exports = utls;