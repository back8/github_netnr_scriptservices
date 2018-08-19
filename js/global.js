var ss = {
    ajax: function (obj) {
        obj.data = {
            q: "select * from json where url='" + ss.csqm(obj.url) + "'"
        };
        obj.url = "https://query.yahooapis.com/v1/public/yql?format=json";
        $.ajax(obj);
    },
    datalocation: function (data) {
        if (data.query.results) {
            data = data.query.results.json;
            if (data.json) {
                data = data.json;
            }
            return data;
        } else {
            loading(0);
            return {};
        }
    },
    csqm: function (q) {
        return q.replace(/\'/g, "\\'");
    },
    bmob: {
        init: function () {
            Bmob.initialize("59a522843b951532546934352166df80", "97fcbeae1457621def948aba1db01821");
        }
    }
}

function loading(close) {
    if (close === 0 || close === false) {
        if (window.loading) {
            clearTimeout(window.loadingdefer);
            window.loadingdom.hide();
        }
    } else {
        if (!window.loadingdom) {
            window.loadingdom = $('<div class="loading"></div>').appendTo(document.body);
        }
        window.loadingdom.hide();
        window.loadingdefer = setTimeout(function () {
            window.loadingdom.show();
        }, 1000);
    }
}

function totop() {
    $('html,body').animate({ scrollTop: 0 }, 400)
};

function htmlEncode(html) {
    return document.createElement('a').appendChild(document.createTextNode(html)).parentNode.innerHTML;
}; 