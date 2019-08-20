/*
 * netnrnav v1.1.0
 * 
 * https://github.com/netnr/nav
 * 
 * Fork: https://github.com/zhoufengjob/SuiNav
 * 
 * Date: 2019-08-18
 * 
 */

(function (window) {

    var netnrnav = function (se) { return new netnrnav.fn.init(se); };

    netnrnav.fn = netnrnav.prototype = {
        init: function (se) {
            var that = this;
            this.ele = $(se);
            this.eventCount = 0;
            this.isHiding = false;

            if (that.ele.hasClass('horizontal')) {
                that.ele.find('li').hover(function () {
                    $(this).children('ul').show();
                }, function () {
                    $(this).children('ul').hide();
                });
            } else {
                that.ele.find('li').click(function () {
                    if (that.eventCount != 0) {
                        if ($(this).parent().parent().parent().hasClass('netnrnav')) {
                            that.eventCount = 0;
                        }
                        return;
                    }
                    if ($(this).children('ul').is(":hidden"))
                        $(this).children('ul').show();
                    else {
                        $(this).find('ul').hide();
                    }
                    that.eventCount++;
                    if ($(this).parent().parent().parent().hasClass('netnrnav')) {
                        that.eventCount = 0;
                    }
                });
            }
            return this;
        }
    };

    netnrnav.show = function (that) {
        if (!that.isHiding) {
            $(document.body).append('<div class="netnrnav slide-netnrnav"></div><div class="netnrnav netnrnav-mask"></div>');
            $('.slide-netnrnav').html(that.ele.html()).find('li').click(function () {
                if (that.eventCount != 0) {
                    if ($(this).parent().parent().parent().hasClass('netnrnav')) {
                        that.eventCount = 0;
                    }
                    return;
                }
                if ($(this).children('ul').is(":hidden"))
                    $(this).children('ul').show();
                else {
                    $(this).find('ul').hide();
                }
                that.eventCount++;
                if ($(this).parent().parent().parent().hasClass('netnrnav')) {
                    that.eventCount = 0;
                }
            });
            $('.netnrnav-mask').click(function () {
                netnrnav.hide(that);
            });
            setTimeout(function () {
                $('.slide-netnrnav').toggleClass('active');
                $('.netnrnav-mask').toggleClass('active');
            }, 20);
        }
    };

    netnrnav.hide = function (that) {
        if (!that.isHiding) {
            that.isHiding = true;
            $('.slide-netnrnav').find('li').unbind();
            $('.slide-netnrnav').removeClass('active');
            $('.netnrnav-mask').removeClass('active');
            setTimeout(function () {
                $('.slide-netnrnav').remove();
                $('.netnrnav-mask').remove();
                that.isHiding = false;
            }, 600);
        }
    };

    netnrnav.toggle = function (that) {
        $('.slide-netnrnav').length > 0 ? netnrnav.hide(that) : netnrnav.show(that)
    }

    netnrnav.fn.init.prototype = netnrnav.fn;

    window.netnrnav = netnrnav;

})(window);

$(function () {
    $.nrnav = netnrnav(".netnrnav");
    $('.MenuToggle').click(function () {
        netnrnav.toggle($.nrnav);
    });
});

var ss = {
    ajax: function (obj) {
        var hosts=["proxy.zme.ink/","bird.ioliu.cn/v2?url="];
        upstream(hosts, function (fast, ok, bad) {
            obj.url = fast + obj.url;
            $.ajax(obj);
        },1);
    },
    datalocation: function (data) {
        return data || {};
        loading(0);
    },
    csqm: function (q) {
        return q.replace(/\'/g, "\\'");
    },
    bmob: {
        init: function () {
            Bmob&&Bmob.initialize("59a522843b951532546934352166df80", "97fcbeae1457621def948aba1db01821");
        }
    }
}

function loading(close) {
    if (close === 0 || close === false) {
        if (window.loading) {
            clearTimeout(window.loadingdefer);
            window.loadingdom.hide();
        }
    } else {
        if (!window.loadingdom) {
            window.loadingdom = $('<div class="loading"></div>').appendTo(document.body);
        }
        window.loadingdom.hide();
        window.loadingdefer = setTimeout(function () {
            window.loadingdom.show();
        }, 1000);
    }
}

function totop() {
    $('html,body').animate({ scrollTop: 0 }, 400)
};

function htmlEncode(html) {
    return document.createElement('a').appendChild(document.createTextNode(html)).parentNode.innerHTML;
}; 