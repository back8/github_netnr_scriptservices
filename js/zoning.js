var zoning = {
    json: {},
    load: function (callback) {
        $.getJSON("/js/data/zoning-4.json", null, function (data) {
            zoning.json = data;
            callback();
        });
    },
    change: function (ses, index) {
        var se1 = ses[index++];
        if (index < ses.length) {
            var se2 = ses[index], sd = zoning.json[se1.value];
            se2.options.length = 0;
            se2.options.add(new Option("（请选择）", ""));
            if (se1.value != "" && sd) {
                for (var i = 0; i < sd.length; i++) {
                    var sdi = sd[i];
                    se2.options.add(new Option(sdi.text, sdi.id));
                }
            }
            if (index + 1 < ses.length) {
                zoning.change(ses, index);
            }
        }
    },
    getvalues: function (ses) {
        var codes = [];
        ses.each(function () {
            codes.push(this.value || "-");
        });
        return codes;
    },
    init: function (ses) {
        ses.each(function (index) {
            $(this).attr('data-index', index);
            this.options.add(new Option("（请选择）", ""));
            if (!index) {
                var idb = zoning.json["00"];
                for (var i = 0; i < idb.length; i++) {
                    var sdi = idb[i];
                    this.options.add(new Option(sdi.text, sdi.id));
                }
            }
        }).change(function () {
            zoning.change(ses, $(this).attr('data-index'));

            $('#code').html(zoning.getvalues(ses).join('</br>'));
        })
    }
}
zoning.load(function () {
    zoning.init($('select'))
});