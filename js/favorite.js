function search(group, keywords) {
    keywords = keywords.trim().toLowerCase();
    var fb = $('#favoritebox');
    fb.find('a').each(function () {
        if (keywords != "") {
            if (this.innerHTML.toLowerCase().indexOf(keywords) >= 0 || this.title.toLowerCase().indexOf(keywords) >= 0 || this.href.toLowerCase().indexOf(keywords) >= 0) {
                $(this).parent().removeClass('hidden');
            } else {
                $(this).parent().addClass('hidden');
            }
        } else {
            $(this).parent().removeClass('hidden');
        }
    });
    fb.children().each(function () {
        if (group != "") {
            if ($(this).attr('data-group') == group) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        } else {
            $(this).removeClass('hidden');
        }
        var ga = $(this).find('div.mba');
        if (ga.length == ga.filter('.hidden').length) {
            $(this).addClass('hidden');
        }
    });
}
$('#seGroup').change(function () {
    search($('#seGroup').val(), $('#txtSearch').val())
});
$('#btnSearch').click(function () {
    search($('#seGroup').val(), $('#txtSearch').val())
});
$('#txtSearch').on('input', function () {
    search($('#seGroup').val(), $('#txtSearch').val())
});