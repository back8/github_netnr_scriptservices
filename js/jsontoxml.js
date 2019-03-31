function autoformatjson() {
    try {
        $('#chkformat1').is(':checked') && $("#txt1").format({ method: 'json' });
    } catch (e) { }
}
$('#chkformat1').click(autoformatjson);
$('#txt1').on('input', autoformatjson);

function autoformatxml() {
    try {
        $('#chkformat2').is(':checked') && $("#txt2").format({ method: 'xml' });
    } catch (e) { }
}
$('#chkformat2').click(autoformatxml);
$('#txt2').on('input', autoformatxml);


$("#btnToJson").click(function (e) {
    var x2js = new X2JS({
        attributePrefix: "@"
    });
    var xmlText = $("#txt2").val();
    if (xmlText == "") {
        jz.msg('XML 不能为空');
        return false;
    }
    var jsonObj = x2js.xml_str2json(xmlText);
    if (jsonObj == null && $(xmlText).length) {
        xmlText = '<root>' + xmlText + '</root>';
        jsonObj = x2js.xml_str2json(xmlText);
    }
    if (jsonObj == null) {
        jz.msg('转换错误');
        return false;
    }
    $("#txt1").val(JSON.stringify(jsonObj)).format({ method: 'json' });
});

$("#btnToXml").click(function () {
    var x2js = new X2JS({
        attributePrefix: "@"
    });
    var jsonText = $('#txt1').val();
    if (jsonText == "") {
        jz.msg('JSON 不能为空');
        return false;
    }
    var jsonObj = $.parseJSON(jsonText);
    var xmlAsStr = x2js.json2xml_str(jsonObj);
    $("#txt2").val(xmlAsStr).format({ method: 'xml' });
});

$(window).on('load resize', function () {
    var ch = $(this).height(), sh = ch - $('#tobox').offset().top - 100;
    $('#tobox').find('textarea').css('height', Math.max(200, sh));
});