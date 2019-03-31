//拖拽
$(document).on("dragleave dragenter dragover", function (e) {
    if (e && e.stopPropagation) { e.stopPropagation() } else { window.event.cancelBubble = true }
    if (e && e.preventDefault) { e.preventDefault() } else { window.event.returnValue = false }
}).on("drop", function (e) {
    if (e && e.preventDefault) { e.preventDefault() } else { window.event.returnValue = false }
    e = e || window.event;
    var files = (e.dataTransfer || e.originalEvent.dataTransfer).files;
    if (files && files.length) {
        fileAsBase64(files[0])
    }
});

$('#txtFile').change(function () {
    if (this.files.length) {
        fileAsBase64(this.files[0])
        $('#txtFile').val('')
    }
});

function fileAsBase64(file) {
    if (file.size / 1024 / 1024 > 3) {
        var msgs = [
            "<div style='font-size:1rem'>",
            "正在处理，请稍等，^_^",
            "<hr/>",
            "文件较大，浏览器会出现卡顿的情况",
            "</div>"
        ];
        jz.alert(msgs.join('<br/>'), { time: 5, ok: false })
    }

    var r = new FileReader();
    r.onload = function () {
        $('#txtBase64').val(this.result)
        $('#labSize').html("大小：" + (this.result.length / 1024).toFixed(1) + " K");
    }
    r.readAsDataURL(file);
}

$('#btnBase64ToImage').click(function () {
    if ($('#txtBase64').val().indexOf("data:image") == 0) {
        $('#viewBase64').html('<img src="' + $('#txtBase64').val() + '" style="max-width:100%" />');
    } else {
        jz.msg("非图片文件");
    }
});

$(window).on('load', function () {
    if (typeof (FileReader) === 'undefined') {
        jz.alert("你的浏览器不支持 FileReader <br />请使用现代浏览器操作！");
        $('#txtFile')[0].disabled = true;
    }
})