$("#txtSearch").keydown(function (e) {
    e = e || window.event;
    var keys = e.keyCode || e.which || e.charCode;
    keys == 13 && $("#btnSearch")[0].click();
})[0].focus();
$("#btnSearch").click(QueryDomainName);
function QueryDomainName() {
    if ($("#txtSearch").val() == "") {
        jz.tip({
            target: "#txtSearch",
            content: "请输入域名",
            align: "bottom",
            time: 4,
            blank: true,
            focus: true
        })
        return
    }
    $("#btnSearch")[0].disabled = true;
    ss.ajax({
        url: "https://www.sojson.com/api/beian/" + encodeURIComponent($("#txtSearch").val()),
        dataType: "json",
        success: function (data) {
            data = data.query.results.json;
            if (data.type == 200) {
                var htm = [];
                htm.push('<tr><td>主办单位名称</td><td>' + data.name + '</td></tr>');
                htm.push('<tr><td>主办单位性质</td><td>' + data.nature + '</td></tr>');
                htm.push('<tr><td>主备案号</td><td>' + data.icp + '</td></tr>');
                htm.push('<tr><td>网站备案/许可证号</td><td>' + data.nowIcp + '</td></tr>');
                htm.push('<tr><td>网站名称</td><td>' + data.sitename + '</td></tr>');
                htm.push('<tr><td>网站首页网址</td><td>' + data.indexUrl + '</td></tr>');
                htm.push('<tr><td>审核时间</td><td>' + data.checkDate + '</td></tr>');
                $("#dn").html(htm);
            } else {
                jz.msg(data.message);
            }
        },
        error: function () {
            jz.msg("网络错误");
        },
        complete: function () {
            $("#btnSearch")[0].disabled = false;
        }
    })
}