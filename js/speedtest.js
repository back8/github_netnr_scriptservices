var st = {
    config: {
        bout: 15,
        singlesize: 6355,
        longtime: 10 * 1000,
        path: "",
        origin: [
            "https://lib.baomitu.com/sql.js/0.5.0/js/sql-debug.js",
            "https://cdn.bootcss.com/sql.js/0.5.0/js/sql-debug.js",
            "https://cdn.staticfile.org/sql.js/0.5.0/js/sql-debug.js",
            "https://cdn.jsdelivr.net/npm/sql.js@0.5.0/js/sql-debug.js",
            "https://cdnjs.cloudflare.com/ajax/libs/sql.js/0.5.0/js/sql-debug.js"
        ]
    },
    speed: function () {
        var dsize = st.complete * st.config.singlesize, ctime = new Date().valueOf() - st.startTime;
        var speed = dsize / ctime;
        return speed.toFixed(2);
    },
    startTime: null,
    endTime: null,
    complete: 0,
    speeds: [],
    showspeed: function (speed) {
        console.log(speed);
        $('#divresult').html('<h2>' + speed + ' MB/s</h2>');
    },
    run: function () {
        $('#btnRunSpeedTest')[0].disabled = true;
        st.complete = 0;
        st.speeds = [];
        st.taskout = setInterval(function () {
            st.showspeed(st.speed());
        }, 500);
        st.task = setInterval(function () {
            var speed = st.speed();
            if (speed != 0) {
                st.speeds.push(parseFloat(speed));
            }
            var ctime = new Date().valueOf() - st.startTime;
            if (ctime > st.config.longtime || st.complete == st.config.bout) {
                clearInterval(st.task);
                clearInterval(st.taskout);

                st.speeds.sort(function (a, b) {
                    return a > b ? -1 : 1;
                });
                st.speeds.length = Math.ceil(st.speeds.length * .4);

                var sum = eval(st.speeds.join("+"));
                var lastspeed = (sum / st.speeds.length).toFixed(2);

                st.showspeed(lastspeed);

                $('#btnRunSpeedTest')[0].disabled = false;
            }
        }, 100);

        st.startTime = new Date().valueOf();

        for (var i = 0; i < st.config.bout; i++) {
            var src = st.config.origin[i % 3] + st.config.path + "?" + i + Math.random();
            fetch(src).then(res => res.text()).then(function () {
                st.complete += 1;
            }).catch(err => {
                console.log(err)
            });
        }
    }
}

$('#btnRunSpeedTest').click(st.run);