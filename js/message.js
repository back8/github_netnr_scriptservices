ss.bmob.init();
var mg = {
    page: 1,
    pageNumber: 999,
    bquery: Bmob.Query("NetnrMessage"),
    messageObjectSave: function () { return new mg.MessageObject() },
    list: function () {
        loading();
        var query = mg.bquery;
        query.limit(mg.pageNumber);
        query.skip((mg.page - 1) * mg.pageNumber);
        query.find().then(res => {
            loading(0);
            var htm = [];
            $(res).each(function (i) {
                var id = 'mi' + (i + 1);
                htm.push('<div class="media" id="' + id + '"><div class="media-left">');
                htm.push('<a href="#' + id + '"><img class="media-object" src="/images/photo.svg"></a>');
                htm.push('</div><div class="media-body"><h4 class="media-heading">' + htmlEncode(this.UserNickname) + '<small class="ml15">' + this.createdAt + '</small></h4>');
                htm.push('<pre>' + htmlEncode(this.Content) + '</pre></div></div>');
            });
            if (htm.length) {
                $('#messagelist').html(htm.join(''));
            } else {
                $('#messagelist').html('no message');
            }
        }).catch(err => {
            jz.alert("查询失败");
            console.log(err);
            loading(0);
        })
    }
}

mg.list();
$('textarea[name="Content"]').keydown(function (e) {
    e = e || window.event;
    var keys = e.keyCode || e.which || e.charCode;
    if (keys == 13 && e.ctrlKey) {
        $('#btnSave')[0].click();
    }
});
$('#btnSave').click(function () {
    var un = $('input[name="UserNickname"]'), uc = $('textarea[name="Content"]'), objv = {};
    objv.UserNickname = un.val().trim() == "" ? "anonymous" : un.val();
    objv.Content = uc.val().substring(0, 9999);
    if (objv.Content == "") {
        jz.msg("请输入内容")
    } else {
        var query = mg.bquery;
        for (var i in objv) {
            query.set(i, objv[i]);
        }
        query.save().then(res => {
            jz.msg("操作成功");
            uc.val('');
            mg.list();
            localStorage["message_nickname"] = objv.UserNickname;
        }).catch(err => {
            jz.alert("查询失败");
            console.log(err);
            loading(0);
        });
    }
});

if (localStorage["message_nickname"]) {
    $('input[name="UserNickname"]').val(localStorage["message_nickname"]);
}