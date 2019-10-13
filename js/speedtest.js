var sp = {
    //测试时长
    time: 1000 * 12,
    //开始时间
    start: null,
    //下载大小
    downsize: 0,
    //源索引
    urindex: -1,
    //源标识
    urid: 0,
    //连接数.
    conn: 0,
    //允许连接数
    maxconn: 5,
    //结果
    result: [],
    //数据项
    data: [],
    //压缩率（根据开发环境的测试结果计算所得）
    cr: function () {
        var ss = $('#seSpeedServer').val(), cr = 1;
        sp.ss.forEach(sp => {
            if (sp.link == ss) {
                cr = sp.cr;
            }
        })
        return cr;
    },
    //测速节点
    ss: [
        {
            name: "百度 CDN",
            cr: 530 / 2143,
            link: "https://code.bdstatic.com/npm/monaco-editor@0.18.0/min/vs/editor/editor.main.js"
        },
        {
            name: "jsDelivr CDN",
            cr: 499 / 2143,
            link: "https://cdn.jsdelivr.net/npm/monaco-editor@0.18.0/min/vs/editor/editor.main.js"
        }
    ],
    //绑定节点
    bindSpeedServer: function () {
        var htm = [];
        sp.ss.forEach(si => {
            htm.push('<option value="' + si.link + '">' + si.name + '</option>');
        })
        $('#seSpeedServer').html(htm.join(''));
    },
    //获取请求的源
    geturi: function () {
        return $('#seSpeedServer').val() + "?" + Math.random();
    },
    addconn: function () {
        var si1 = setInterval(function () {
            if (sp.conn < sp.maxconn) {
                sp.conn++;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', sp.geturi());
                var urid = sp.urid++;
                xhr.onprogress = function (event) {
                    sp.result[urid] = event.loaded;
                };
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        sp.conn--;
                    }
                }
                xhr.send();
            }
        }, 50);

        //统计
        var si2 = setInterval(function () {
            var now = new Date().valueOf(), ds = 0;
            sp.result.map(x => {
                ds += (x || 0);
            });
            sp.downsize = ds;
            var speed = ((sp.downsize / 1024 / 1024 * sp.cr()) / ((now - sp.start) / 1000)).toFixed(2);
            sp.data.push(speed);

            //回调
            sp.progress && sp.progress(speed);

            //结束
            if (now - sp.start > sp.time) {
                window.clearInterval(si1);
                window.clearInterval(si2);
                //完成
                sp.complete && sp.complete();
            }
        }, 900)
    },
    run: function () {
        sp.downsize = 0;
        sp.urindex = -1;
        sp.urid = 0;
        sp.conn = 0;
        sp.result = [];
        sp.start = new Date().valueOf();
        $('#divresult').html('');
        $('#seSpeedServer')[0].disabled = true;

        sp.addconn();
    }
}
sp.bindSpeedServer();

$('#btnRunSpeedTest').click(function () {
    if (sp.start && new Date().valueOf() - sp.start <= sp.time) {
        jz.msg('正在测速中');
        return false;
    }

    var sps = [];
    //过程
    sp.progress = function (speed) {
        $('#divresult').append('<div>' + speed + ' Mb/s</div>');
        sps.push(speed);
    };
    //完成
    sp.complete = function () {
        var sum = 0;
        sps.map(x => {
            sum += x * 1;
        })
        var avg = (sum / sps.length).toFixed(2);
        $('<h2>平均：' + avg + ' Mb/s</h2>').insertBefore($('#divresult').children().first())

        $('#seSpeedServer')[0].disabled = false;
    };
    sp.run();
});