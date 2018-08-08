﻿QueryLottery();
$("#seLotteryType").change(QueryLottery);

function QueryLottery() {
    loading();

    ss.ajax({
        url: "http://cp.zgzcw.com/lottery/hisnumber.action?lotteryId=" + $("#seLotteryType").val() + "&issueLen=18",
        dataType: "json",
        success: function (data) {
            data = ss.datalocation(data);
            if (data.length) {
                var htm = [];
                $(data).each(function () {
                    var codes = (this.lotteryNumber || this.tryoutNumber).split('+'),
                        code1 = codes[0].split(','), spans1 = spans2 = '';
                    for (var k = 0; k < code1.length; k++) {
                        spans1 += '<span class="sp1">' + code1[k] + '</span>';
                    }

                    if (codes[1] != undefined) {
                        var code2 = codes[1].split(',');
                        for (var u = 0; u < code2.length; u++) {
                            spans2 += '<span class="sp2">' + code2[u] + '</span>';
                        }
                    }

                    htm.push(
                        '<div class="col-md-4 col-sm-6 col-xs-12"><div class="panel panel-primary"><div class="panel-body">'
                        + '<div class="et"><label>' + this.lotteryExpect + '</label> <small> ' + formatDateTime(this.ernieDate).substr(0, 10) + '</small></div>'
                        + spans1 + spans2
                        + '</div></div></div>'
                    );
                });
                $("#divlottery").html(htm.join(''));
            }
        },
        error: function () {
            loading(0);
            jz.msg("网络错误");
        },
        complete: function () {
            loading(0);
        }
    })
}

function formatDateTime(timeStamp) {
    var date = new Date(Number(timeStamp));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};