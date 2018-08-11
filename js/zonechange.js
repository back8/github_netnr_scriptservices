init(["se1", 'se2', 'se3'])

function init(ops) {
    var se1 = document.getElementById(ops[0]),
        se2 = document.getElementById(ops[1]),
        se3 = document.getElementById(ops[2]);
    //重组项
    function reform() {
        switch (arguments[0]) {
            case 2:
                var cr2 = ZoneCode[se1.options[se1.selectedIndex].text].items;
                for (var y in cr2) {
                    se2.options.add(new Option(y, cr2[y].val));
                }
                break;
            case 3:
                var cr3 = ZoneCode[se1.options[se1.selectedIndex].text].items[se2.options[se2.selectedIndex].text].items;
                for (var z in cr3) {
                    se3.options.add(new Option(z, cr3[z]));
                }
                break;
            default:
                for (var x in ZoneCode) {
                    se1.options.add(new Option(x, ZoneCode[x].val))
                }
        }
    }
    reform(1);
    reform(2);
    reform(3);

    /* 一级选择 */
    se1.onchange = function () {
        se2.options.length = 0;
        se3.options.length = 0;
        reform(2);
        reform(3);
    };
    /* 二级选择 */
    se2.onchange = function () {
        se3.options.length = 0;
        reform(3);
    };
}