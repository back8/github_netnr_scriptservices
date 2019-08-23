var sp = {
    origin: [
        "https://lib.baomitu.com/sql.js/0.5.0/js/sql-debug.js",
        "https://cdn.jsdelivr.net/npm/sql.js@1.0.0/dist/sql-asm-debug.js",
        "https://code.bdstatic.com/npm/sql.js@1.0.0/dist/sql-asm-debug.js"
    ],
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
    maxconn: 3,
    //结果
    result: [],
    //数据项
    data: [],
    //压缩率（根据开发环境的测试结果计算所得）
    cr: 3.9,
    //获取请求的源
    geturi: function () {
        if (++sp.urindex >= sp.origin.length) {
            sp.urindex = 0;
        }
        return sp.origin[sp.urindex] + "?" + Math.random();
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
            var speed = ((sp.downsize / 1024 / 1024 / sp.cr) / ((now - sp.start) / 1000)).toFixed(2);
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
        sp.addconn();
    }
}

$('#btnRunSpeedTest').click(function () {
    if (sp.start && new Date().valueOf() - sp.start <= sp.time) {
        jz.msg('正在测速中');
        return false;
    }
    //过程
    sp.progress = function (speed) {
        $('#divresult').append('<div>' + speed + ' MB/s</div>');
    };
    //完成
    sp.complete = function () {
        var sum = 0;
        sp.data.map(x => {
            sum += x * 1;
        })
        var avg = (sum / sp.data.length).toFixed(2);
        $('<h2>平均：' + avg + ' MB/s</h2>').insertBefore($('#divresult').children().first())
    };
    sp.run();
});