var ss = {
    ajax: function (obj) {
        obj.data = {
            q: "select * from json where url='" + ss.csqm(obj.url) + "'"
        };
        obj.url = "https://query.yahooapis.com/v1/public/yql?format=json";
        $.ajax(obj);
    },
    csqm: function (q) {
        return q.replace(/\'/g, "\\'");
    }
}