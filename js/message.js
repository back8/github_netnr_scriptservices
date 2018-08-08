Bmob.initialize("59a522843b951532546934352166df80", "97fcbeae1457621def948aba1db01821");
var mg = {
    page: 1,
    pageNumber: 999,
    MessageObject: Bmob.Object.extend("NetnrMessage"),
    messageObjectQuery: function () { return new Bmob.Query(mg.MessageObject) },
    messageObjectSave: function () { return new mg.MessageObject() },
    list: function () {
        loading();
        var dto = mg.messageObjectQuery();
        dto.limit(mg.pageNumber);
        dto.skip((mg.page - 1) * mg.pageNumber);
        dto.find({
            success: function (results) {
                loading(0);
                var htm = [];
                $(results).each(function (i) {
                    var cols = this.attributes, id = 'mi' + (i + 1);
                    htm.push('<div class="media" id="' + id + '"><div class="media-left">');
                    htm.push('<a href="#' + id + '"><img class="media-object" src="/images/photo.svg"></a>');
                    htm.push('</div><div class="media-body"><h4 class="media-heading">' + htmlEncode(cols.UserNickname) + '<small class="ml15">' + this.createdAt + '</small></h4>');
                    htm.push('<pre>' + htmlEncode(cols.Content) + '</pre></div></div>');
                });
                if (htm.length) {
                    $('#messagelist').html(htm.join(''));
                } else {
                    $('#messagelist').html('no message');
                }
            },
            error: function (error) {
                loading(0);
                jz.alert("查询失败: " + error.code + " " + error.message);
            }
        });
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
        var dto = mg.messageObjectSave();
        dto.save(objv, {
            success: function (object) {
                jz.msg("操作成功");
                uc.val('');
                mg.list();
                localStorage["message_nickname"] = objv.UserNickname;
            },
            error: function (model, error) {
                jz.alert("留言失败");
                console.log(model, error);
            }
        });
    }
});

if (localStorage["message_nickname"]) {
    $('input[name="UserNickname"]').val(localStorage["message_nickname"]);
}