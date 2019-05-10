function search(group, keywords) {
    keywords = keywords.trim().toLowerCase();
    var fb = $('#favoritebox');
    fb.find('a').each(function () {
        if (keywords != "") {
            if (this.innerHTML.toLowerCase().indexOf(keywords) >= 0 || this.title.toLowerCase().indexOf(keywords) >= 0 || this.href.toLowerCase().indexOf(keywords) >= 0) {
                $(this).parent().removeClass('d-none');
            } else {
                $(this).parent().addClass('d-none');
            }
        } else {
            $(this).parent().removeClass('d-none');
        }
    });
    fb.children().each(function () {
        if (group != "") {
            if ($(this).attr('data-group') == group) {
                $(this).removeClass('d-none');
            } else {
                $(this).addClass('d-none');
            }
        } else {
            $(this).removeClass('d-none');
        }
        var ga = $(this).find('div.mba');
        if (ga.length == ga.filter('.d-none').length) {
            $(this).addClass('d-none');
        }
    });
}
$('#seGroup').change(function () {
    localStorage["favorite-group"] = this.value;
    search($('#seGroup').val(), $('#txtSearch').val())
});
$('#btnSearch').click(function () {
    localStorage["favorite-group"] = this.value;
    search($('#seGroup').val(), localStorage["favorite-search"] = $('#txtSearch').val())
});
$('#txtSearch').on('input', function () {
    search($('#seGroup').val(), localStorage["favorite-search"] = $('#txtSearch').val())
});

setTimeout(function () {
    $('#favoritebox').find('a').each(function () {
        var hs = this.href.split('/');
        hs.length = 3;
        var img = $(this).find('img');
        img[0].onerror = function () { this.src = '/images/net.svg'; this.onerror = null; }
        var imgsrc = '/images/net.svg';
        if (img.attr('data-icon') != "") {
            imgsrc = img.attr('data-icon');
        } else {
            if (this.href.indexOf('http://') == -1) {
                imgsrc = hs.join('/') + "/favicon.ico";
            }
        }
        var ci = new Image();
        ci.src = imgsrc;
        ci.onload = function () {
            img[0].src = imgsrc;
        }
    });
}, 1000);

$(document).dblclick(function () {
    $('#txtSearch').val('');
    $('#seGroup').val('');
    $('#btnSearch')[0].click();
});

$('#txtSearch').val(localStorage["favorite-search"] || "");
var defaultGroup = localStorage["favorite-group"] || "";
$('#seGroup').find('option').each(function () {
    if (this.value == defaultGroup) {
        $('#seGroup').val(this.value);
        $('#btnSearch')[0].click();
        return false;
    }
});
$('#txtSearch')[0].focus();