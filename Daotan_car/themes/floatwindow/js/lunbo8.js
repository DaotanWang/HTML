! function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function (a) {
    "use strict";
    var r = window.Slick || {};
    r = function () {
        function i(i, e) {
            var t, o = this;
            o.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(i),
                appendDots: a(i),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (i, e) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text('0'+ (e + 1))
                }, dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, o.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, a.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.focussed = !1, o.interrupted = !1, o.hidden = "hidden", o.paused = !0, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = a(i), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, t = a(i).data("slick") || {}, o.options = a.extend({}, o.defaults, e, t), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, "undefined" != typeof document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = a.proxy(o.autoPlay, o), o.autoPlayClear = a.proxy(o.autoPlayClear, o), o.autoPlayIterator = a.proxy(o.autoPlayIterator, o), o.changeSlide = a.proxy(o.changeSlide, o), o.clickHandler = a.proxy(o.clickHandler, o), o.selectHandler = a.proxy(o.selectHandler, o), o.setPosition = a.proxy(o.setPosition, o), o.swipeHandler = a.proxy(o.swipeHandler, o), o.dragHandler = a.proxy(o.dragHandler, o), o.keyHandler = a.proxy(o.keyHandler, o), o.instanceUid = s++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0)
        }
        var s = 0;
        return i
    }(), r.prototype.activateADA = function () {
        var i = this;
        i.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, r.prototype.addSlide = r.prototype.slickAdd = function (i, e, t) {
        var o = this;
        if ("boolean" == typeof e) t = e, e = null;
        else if (0 > e || e >= o.slideCount) return !1;
        o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? a(i).appendTo(o.$slideTrack) : t ? a(i).insertBefore(o.$slides.eq(e)) : a(i).insertAfter(o.$slides.eq(e)) : t === !0 ? a(i).prependTo(o.$slideTrack) : a(i).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (i, e) {
            a(e).attr("data-slick-index", i)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, r.prototype.animateHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, r.prototype.animateSlide = function (i, e) {
        var t = {},
            o = this;
        o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (i = -i), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
            left: i
        }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
            top: i
        }, o.options.speed, o.options.easing, e) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), a({
            animStart: o.currentLeft
        }).animate({
            animStart: i
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function (i) {
                i = Math.ceil(i), o.options.vertical === !1 ? (t[o.animType] = "translate(" + i + "px, 0px)", o.$slideTrack.css(t)) : (t[o.animType] = "translate(0px," + i + "px)", o.$slideTrack.css(t))
            }, complete: function () {
                e && e.call()
            }
        })) : (o.applyTransition(), i = Math.ceil(i), o.options.vertical === !1 ? t[o.animType] = "translate3d(" + i + "px, 0px, 0px)" : t[o.animType] = "translate3d(0px," + i + "px, 0px)", o.$slideTrack.css(t), e && setTimeout(function () {
            o.disableTransition(), e.call()
        }, o.options.speed))
    }, r.prototype.getNavTarget = function () {
        var i = this,
            e = i.options.asNavFor;
        return e && null !== e && (e = a(e).not(i.$slider)), e
    }, r.prototype.asNavFor = function (e) {
        var i = this,
            t = i.getNavTarget();
        null !== t && "object" == typeof t && t.each(function () {
            var i = a(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, r.prototype.applyTransition = function (i) {
        var e = this,
            t = {};
        e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, r.prototype.autoPlay = function () {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, r.prototype.autoPlayClear = function () {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, r.prototype.autoPlayIterator = function () {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (i.options.infinite === !1 && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 === 0 && (i.direction = 1))), i.slideHandler(e))
    }, r.prototype.buildArrows = function () {
        var i = this;
        i.options.arrows === !0 && (i.$prevArrow = a(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = a(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), i.options.infinite !== !0 && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, r.prototype.buildDots = function () {
        var i, e, t = this;
        if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
            for (t.$slider.addClass("slick-dotted"), e = a("<ul />").addClass(t.options.dotsClass), i = 0; i <= t.getDotCount(); i += 1) e.append(a("<li />").append(t.options.customPaging.call(this, t, i)));
            t.$dots = e.appendTo(t.options.appendDots), t.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, r.prototype.buildOut = function () {
        var i = this;
        i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function (i, e) {
            a(e).attr("data-slick-index", i).data("originalStyling", a(e).attr("style") || "")
        }), i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? a('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), (i.options.centerMode === !0 || i.options.swipeToSlide === !0) && (i.options.slidesToScroll = 1), a("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.options.draggable === !0 && i.$list.addClass("draggable")
    }, r.prototype.buildRows = function () {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; s > i; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, r.prototype.checkResponsive = function (i, e) {
        var t, o, s, n = this,
            r = !1,
            l = n.$slider.width(),
            d = window.innerWidth || a(window).width();
        if ("window" === n.respondTo ? s = d : "slider" === n.respondTo ? s = l : "min" === n.respondTo && (s = Math.min(d, l)), n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
            o = null;
            for (t in n.breakpoints) n.breakpoints.hasOwnProperty(t) && (n.originalSettings.mobileFirst === !1 ? s < n.breakpoints[t] && (o = n.breakpoints[t]) : s > n.breakpoints[t] && (o = n.breakpoints[t]));
            null !== o ? null !== n.activeBreakpoint ? (o !== n.activeBreakpoint || e) && (n.activeBreakpoint = o, "unslick" === n.breakpointSettings[o] ? n.unslick(o) : (n.options = a.extend({}, n.originalSettings, n.breakpointSettings[o]), i === !0 && (n.currentSlide = n.options.initialSlide), n.refresh(i)), r = o) : (n.activeBreakpoint = o, "unslick" === n.breakpointSettings[o] ? n.unslick(o) : (n.options = a.extend({}, n.originalSettings, n.breakpointSettings[o]), i === !0 && (n.currentSlide = n.options.initialSlide), n.refresh(i)), r = o) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, n.options = n.originalSettings, i === !0 && (n.currentSlide = n.options.initialSlide), n.refresh(i), r = o), i || r === !1 || n.$slider.trigger("breakpoint", [n, r])
        }
    }, r.prototype.changeSlide = function (i, e) {
        var t, o, s, n = this,
            r = a(i.currentTarget);
        switch (r.is("a") && i.preventDefault(), r.is("li") || (r = r.closest("li")), s = n.slideCount % n.options.slidesToScroll !== 0, t = s ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, i.data.message) {
        case "previous":
            o = 0 === t ? n.options.slidesToScroll : n.options.slidesToShow - t, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - o, !1, e);
            break;
        case "next":
            o = 0 === t ? n.options.slidesToScroll : t, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + o, !1, e);
            break;
        case "index":
            var l = 0 === i.data.index ? 0 : i.data.index || r.index() * n.options.slidesToScroll;
            n.slideHandler(n.checkNavigable(l), !1, e), r.children().trigger("focus");
            break;
        default:
            return
        }
    }, r.prototype.checkNavigable = function (i) {
        var e, t, o = this;
        if (e = o.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var s in e) {
                if (i < e[s]) {
                    i = t;
                    break
                }
                t = e[s]
            }
        return i
    }, r.prototype.cleanUpEvents = function () {
        var i = this;
        i.options.dots && null !== i.$dots && a("li", i.$dots).off("click.slick", i.changeSlide).off("mouseenter.slick", a.proxy(i.interrupt, i, !0)).off("mouseleave.slick", a.proxy(i.interrupt, i, !1)), i.$slider.off("focus.slick blur.slick"), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), a(document).off(i.visibilityChange, i.visibility), i.cleanUpSlideEvents(), i.options.accessibility === !0 && i.$list.off("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && a(i.$slideTrack).children().off("click.slick", i.selectHandler), a(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), a(window).off("resize.slick.slick-" + i.instanceUid, i.resize), a("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault), a(window).off("load.slick.slick-" + i.instanceUid, i.setPosition), a(document).off("ready.slick.slick-" + i.instanceUid, i.setPosition)
    }, r.prototype.cleanUpSlideEvents = function () {
        var i = this;
        i.$list.off("mouseenter.slick", a.proxy(i.interrupt, i, !0)), i.$list.off("mouseleave.slick", a.proxy(i.interrupt, i, !1))
    }, r.prototype.cleanUpRows = function () {
        var i, e = this;
        e.options.rows > 1 && (i = e.$slides.children().children(), i.removeAttr("style"), e.$slider.empty().append(i))
    }, r.prototype.clickHandler = function (i) {
        var e = this;
        e.shouldClick === !1 && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, r.prototype.destroy = function (i) {
        var e = this;
        e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), a(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            a(this).attr("style", a(this).data("originalStyling"))
        }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$slider.removeClass("slick-dotted"), e.unslicked = !0, i || e.$slider.trigger("destroy", [e])
    }, r.prototype.disableTransition = function (i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, r.prototype.fadeSlide = function (i, e) {
        var t = this;
        t.cssTransitions === !1 ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function () {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, r.prototype.fadeSlideOut = function (i) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, r.prototype.filterSlides = r.prototype.slickFilter = function (i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, r.prototype.focusHandler = function () {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (i) {
            i.stopImmediatePropagation();
            var e = a(this);
            setTimeout(function () {
                t.options.pauseOnFocus && (t.focussed = e.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, r.prototype.getCurrent = r.prototype.slickCurrentSlide = function () {
        var i = this;
        return i.currentSlide
    }, r.prototype.getDotCount = function () {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (i.options.infinite === !0)
            for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (i.options.centerMode === !0) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, r.prototype.getLeft = function (i) {
        var e, t, o, s = this,
            n = 0;
        return s.slideOffset = 0, t = s.$slides.first().outerHeight(!0), s.options.infinite === !0 ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, n = t * s.options.slidesToShow * -1), s.slideCount % s.options.slidesToScroll !== 0 && i + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (i > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (i - s.slideCount)) * s.slideWidth * -1, n = (s.options.slidesToShow - (i - s.slideCount)) * t * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, n = s.slideCount % s.options.slidesToScroll * t * -1))) : i + s.options.slidesToShow > s.slideCount && (s.slideOffset = (i + s.options.slidesToShow - s.slideCount) * s.slideWidth, n = (i + s.options.slidesToShow - s.slideCount) * t), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, n = 0), s.options.centerMode === !0 && s.options.infinite === !0 ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : s.options.centerMode === !0 && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), e = s.options.vertical === !1 ? i * s.slideWidth * -1 + s.slideOffset : i * t * -1 + n, s.options.variableWidth === !0 && (o = s.slideCount <= s.options.slidesToShow || s.options.infinite === !1 ? s.$slideTrack.children(".slick-slide").eq(i) : s.$slideTrack.children(".slick-slide").eq(i + s.options.slidesToShow), e = s.options.rtl === !0 ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, s.options.centerMode === !0 && (o = s.slideCount <= s.options.slidesToShow || s.options.infinite === !1 ? s.$slideTrack.children(".slick-slide").eq(i) : s.$slideTrack.children(".slick-slide").eq(i + s.options.slidesToShow + 1), e = s.options.rtl === !0 ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (s.$list.width() - o.outerWidth()) / 2)), e
    }, r.prototype.getOption = r.prototype.slickGetOption = function (i) {
        var e = this;
        return e.options[i]
    }, r.prototype.getNavigableIndexes = function () {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (e.options.infinite === !1 ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); i > t;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, r.prototype.getSlick = function () {
        return this
    }, r.prototype.getSlideCount = function () {
        var i, t, o, s = this;
        return o = s.options.centerMode === !0 ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, s.options.swipeToSlide === !0 ? (s.$slideTrack.find(".slick-slide").each(function (i, e) {
            return e.offsetLeft - o + a(e).outerWidth() / 2 > -1 * s.swipeLeft ? (t = e, !1) : void 0
        }), i = Math.abs(a(t).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
    }, r.prototype.goTo = r.prototype.slickGoTo = function (i, e) {
        var t = this;
        t.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, r.prototype.init = function (i) {
        var e = this;
        a(e.$slider).hasClass("slick-initialized") || (a(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()), i && e.$slider.trigger("init", [e]), e.options.accessibility === !0 && e.initADA(), e.options.autoplay && (e.paused = !1, e.autoPlay())
    }, r.prototype.initADA = function () {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + e.instanceUid + i
            })
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function (i) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + i,
                id: "slick-slide" + e.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, r.prototype.initArrowEvents = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide))
    }, r.prototype.initDotEvents = function () {
        var i = this;
        i.options.dots === !0 && i.slideCount > i.options.slidesToShow && a("li", i.$dots).on("click.slick", {
            message: "index"
        }, i.changeSlide), i.options.dots === !0 && i.options.pauseOnDotsHover === !0 && a("li", i.$dots).on("mouseenter.slick", a.proxy(i.interrupt, i, !0)).on("mouseleave.slick", a.proxy(i.interrupt, i, !1))
    }, r.prototype.initSlideEvents = function () {
        var i = this;
        i.options.pauseOnHover && (i.$list.on("mouseenter.slick", a.proxy(i.interrupt, i, !0)), i.$list.on("mouseleave.slick", a.proxy(i.interrupt, i, !1)))
    }, r.prototype.initializeEvents = function () {
        var i = this;
        i.initArrowEvents(), i.initDotEvents(), i.initSlideEvents(), i.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), a(document).on(i.visibilityChange, a.proxy(i.visibility, i)), i.options.accessibility === !0 && i.$list.on("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && a(i.$slideTrack).children().on("click.slick", i.selectHandler), a(window).on("orientationchange.slick.slick-" + i.instanceUid, a.proxy(i.orientationChange, i)), a(window).on("resize.slick.slick-" + i.instanceUid, a.proxy(i.resize, i)), a("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), a(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), a(document).on("ready.slick.slick-" + i.instanceUid, i.setPosition)
    }, r.prototype.initUI = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, r.prototype.keyHandler = function (i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && e.options.accessibility === !0 ? e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, r.prototype.lazyLoad = function () {
        function i(i) {
            a("img[data-lazy]", i).each(function () {
                var i = a(this),
                    e = a(this).attr("data-lazy"),
                    t = document.createElement("img");
                t.onload = function () {
                    i.animate({
                        opacity: 0
                    }, 100, function () {
                        i.attr("src", e).animate({
                            opacity: 1
                        }, 200, function () {
                            i.removeAttr("data-lazy").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, i, e])
                    })
                }, t.onerror = function () {
                    i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, i, e])
                }, t.src = e
            })
        }
        var e, t, o, s, n = this;
        n.options.centerMode === !0 ? n.options.infinite === !0 ? (o = n.currentSlide + (n.options.slidesToShow / 2 + 1), s = o + n.options.slidesToShow + 2) : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = 2 + (n.options.slidesToShow / 2 + 1) + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), n.options.fade === !0 && (o > 0 && o--, s <= n.slideCount && s++)), e = n.$slider.find(".slick-slide").slice(o, s), i(e), n.slideCount <= n.options.slidesToShow ? (t = n.$slider.find(".slick-slide"), i(t)) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? (t = n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow), i(t)) : 0 === n.currentSlide && (t = n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow), i(t))
    }, r.prototype.loadSlider = function () {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, r.prototype.next = r.prototype.slickNext = function () {
        var i = this;
        i.changeSlide({
            data: {
                message: "next"
            }
        })
    }, r.prototype.orientationChange = function () {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, r.prototype.pause = r.prototype.slickPause = function () {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, r.prototype.play = r.prototype.slickPlay = function () {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, r.prototype.postSlide = function (i) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, i]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), e.options.accessibility === !0 && e.initADA())
    }, r.prototype.prev = r.prototype.slickPrev = function () {
        var i = this;
        i.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, r.prototype.preventDefault = function (i) {
        i.preventDefault()
    }, r.prototype.progressiveLazyLoad = function (i) {
        i = i || 1;
        var e, t, o, s = this,
            n = a("img[data-lazy]", s.$slider);
        n.length ? (e = n.first(), t = e.attr("data-lazy"), o = document.createElement("img"), o.onload = function () {
            e.attr("src", t).removeAttr("data-lazy").removeClass("slick-loading"), s.options.adaptiveHeight === !0 && s.setPosition(), s.$slider.trigger("lazyLoaded", [s, e, t]), s.progressiveLazyLoad()
        }, o.onerror = function () {
            3 > i ? setTimeout(function () {
                s.progressiveLazyLoad(i + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, t]), s.progressiveLazyLoad())
        }, o.src = t) : s.$slider.trigger("allImagesLoaded", [s])
    }, r.prototype.refresh = function (i) {
        var e, t, o = this;
        t = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > t && (o.currentSlide = t), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), e = o.currentSlide, o.destroy(!0), a.extend(o, o.initials, {
            currentSlide: e
        }), o.init(), i || o.changeSlide({
            data: {
                message: "index",
                index: e
            }
        }, !1)
    }, r.prototype.registerBreakpoints = function () {
        var i, e, t, o = this,
            s = o.options.responsive || null;
        if ("array" === a.type(s) && s.length) {
            o.respondTo = o.options.respondTo || "window";
            for (i in s)
                if (t = o.breakpoints.length - 1, e = s[i].breakpoint, s.hasOwnProperty(i)) {
                    for (; t >= 0;) o.breakpoints[t] && o.breakpoints[t] === e && o.breakpoints.splice(t, 1), t--;
                    o.breakpoints.push(e), o.breakpointSettings[e] = s[i].settings
                }
            o.breakpoints.sort(function (i, e) {
                return o.options.mobileFirst ? i - e : e - i
            })
        }
    }, r.prototype.reinit = function () {
        var i = this;
        i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.cleanUpSlideEvents(), i.initSlideEvents(), i.checkResponsive(!1, !0), i.options.focusOnSelect === !0 && a(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.setPosition(), i.focusHandler(), i.paused = !i.options.autoplay, i.autoPlay(), i.$slider.trigger("reInit", [i])
    }, r.prototype.resize = function () {
        var i = this;
        a(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function () {
            i.windowWidth = a(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
        }, 50))
    }, r.prototype.removeSlide = r.prototype.slickRemove = function (i, e, t) {
        var o = this;
        return "boolean" == typeof i ? (e = i, i = e === !0 ? 0 : o.slideCount - 1) : i = e === !0 ? --i : i, o.slideCount < 1 || 0 > i || i > o.slideCount - 1 ? !1 : (o.unload(), t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, r.prototype.setCSS = function (i) {
        var e, t, o = this,
            s = {};
        o.options.rtl === !0 && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, r.prototype.setDimensions = function () {
        var i = this;
        i.options.vertical === !1 ? i.options.centerMode === !0 && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), i.options.centerMode === !0 && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), i.options.vertical === !1 && i.options.variableWidth === !1 ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : i.options.variableWidth === !0 ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, r.prototype.setFade = function () {
        var t, o = this;
        o.$slides.each(function (i, e) {
            t = o.slideWidth * i * -1, o.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            })
        }), o.$slides.eq(o.currentSlide).css({
            zIndex: o.options.zIndex - 1,
            opacity: 1
        })
    }, r.prototype.setHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, r.prototype.setOption = r.prototype.slickSetOption = function () {
        var i, e, t, o, s, n = this,
            r = !1;
        if ("object" === a.type(arguments[0]) ? (t = arguments[0], r = arguments[1], s = "multiple") : "string" === a.type(arguments[0]) && (t = arguments[0], o = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? s = "responsive" : "undefined" != typeof arguments[1] && (s = "single")), "single" === s) n.options[t] = o;
        else if ("multiple" === s) a.each(t, function (i, e) {
            n.options[i] = e
        });
        else if ("responsive" === s)
            for (e in o)
                if ("array" !== a.type(n.options.responsive)) n.options.responsive = [o[e]];
                else {
                    for (i = n.options.responsive.length - 1; i >= 0;) n.options.responsive[i].breakpoint === o[e].breakpoint && n.options.responsive.splice(i, 1), i--;
                    n.options.responsive.push(o[e])
                }
        r && (n.unload(), n.reinit())
    }, r.prototype.setPosition = function () {
        var i = this;
        i.setDimensions(), i.setHeight(), i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, r.prototype.setProps = function () {
        var i = this,
            e = document.body.style;
        i.positionProp = i.options.vertical === !0 ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && i.options.useCSS === !0 && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && i.animType !== !1 && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1
    }, r.prototype.setSlideClasses = function (i) {
        var e, t, o, s, n = this;
        t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), n.options.centerMode === !0 ? (e = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")) : i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
    }, r.prototype.setupInfinite = function () {
        var i, e, t, o = this;
        if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (e = null, o.slideCount > o.options.slidesToShow)) {
            for (t = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, i = o.slideCount; i > o.slideCount - t; i -= 1) e = i - 1, a(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (i = 0; t > i; i += 1) e = i, a(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                a(this).attr("id", "")
            })
        }
    }, r.prototype.interrupt = function (i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, r.prototype.selectHandler = function (i) {
        var e = this,
            t = a(i.target).is(".slick-slide") ? a(i.target) : a(i.target).parents(".slick-slide"),
            o = parseInt(t.attr("data-slick-index"));
        return o || (o = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(o), void e.asNavFor(o)) : void e.slideHandler(o)
    }, r.prototype.slideHandler = function (i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        return e = e || !1, a.animating === !0 && a.options.waitForAnimate === !0 || a.options.fade === !0 && a.currentSlide === i || a.slideCount <= a.options.slidesToShow ? void 0 : (e === !1 && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, a.options.infinite === !1 && a.options.centerMode === !1 && (0 > i || i > a.getDotCount() * a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide, t !== !0 ? a.animateSlide(r, function () {
            a.postSlide(o)
        }) : a.postSlide(o))) : a.options.infinite === !1 && a.options.centerMode === !0 && (0 > i || i > a.slideCount - a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide, t !== !0 ? a.animateSlide(r, function () {
            a.postSlide(o)
        }) : a.postSlide(o))) : (a.options.autoplay && clearInterval(a.autoPlayTimer), s = 0 > o ? a.slideCount % a.options.slidesToScroll !== 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll !== 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = a.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide)), a.updateDots(), a.updateArrows(), a.options.fade === !0 ? (t !== !0 ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
            a.postSlide(s)
        })) : a.postSlide(s), void a.animateHeight()) : void(t !== !0 ? a.animateSlide(d, function () {
            a.postSlide(s)
        }) : a.postSlide(s))))
    }, r.prototype.startLoad = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, r.prototype.swipeDirection = function () {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), o = Math.round(180 * t / Math.PI), 0 > o && (o = 360 - Math.abs(o)), 45 >= o && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : 360 >= o && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && 225 >= o ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && 135 >= o ? "down" : "up" : "vertical"
    }, r.prototype.swipeEnd = function (i) {
        var e, t, o = this;
        if (o.dragging = !1, o.interrupted = !1, o.shouldClick = o.touchObject.swipeLength > 10 ? !1 : !0, void 0 === o.touchObject.curX) return !1;
        if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, r.prototype.swipeHandler = function (i) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
        case "start":
            e.swipeStart(i);
            break;
        case "move":
            e.swipeMove(i);
            break;
        case "end":
            e.swipeEnd(i)
        }
    }, r.prototype.swipeMove = function (i) {
        var e, t, o, s, n, r = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !r.dragging || n && 1 !== n.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), t = r.swipeDirection(), "vertical" !== t ? (void 0 !== i.originalEvent && r.touchObject.swipeLength > 4 && i.preventDefault(), s = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (s = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === t || r.currentSlide >= r.getDotCount() && "left" === t) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = e + o * s : r.swipeLeft = e + o * (r.$list.height() / r.listWidth) * s, r.options.verticalSwiping === !0 && (r.swipeLeft = e + o * s), r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
    }, r.prototype.swipeStart = function (i) {
        var e, t = this;
        return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, void(t.dragging = !0))
    }, r.prototype.unfilterSlides = r.prototype.slickUnfilter = function () {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, r.prototype.unload = function () {
        var i = this;
        a(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(), i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, r.prototype.unslick = function (i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, r.prototype.updateArrows = function () {
        var i, e = this;
        i = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, r.prototype.updateDots = function () {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, r.prototype.visibility = function () {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, a.fn.slick = function () {
        var i, e, t = this,
            o = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            n = t.length;
        for (i = 0; n > i; i++)
            if ("object" == typeof o || "undefined" == typeof o ? t[i].slick = new r(t[i], o) : e = t[i].slick[o].apply(t[i].slick, s), "undefined" != typeof e) return e;
        return t
    }
});

(function (b) {
    b.fn.slide1 = function (e) {
        var t = {
            zs_lunLock: true,
            autoplay: true,
            autoTime: 4e3,
            curentImg: 0,
            height: 0,
            clickLunTime: 500
        };
        var o = b.extend(t, e);
        var c = b(this).find(".slideItem");
        var u = b(this).find(".slideItem").width();
        var i;
        var n = false;
        var v = this;
        var a = "<ul>";
        var g;
        var s = 0;
        var d = 0;
        if (o.height == 0) {
            i = setInterval(function () {
                b(v).find(".slideItem img").each(function () {
                    if (this.height === 0 && b(this).is(":visible")) {
                        n = false;
                        return false
                    } else {
                        s = s > b(this).height() ? s : b(this).height();
                        n = true
                    }
                });
                if (n) {
                    s = s > b(v).height() ? s : b(v).height();
                    clearInterval(i);
                    if (b(v).find(".slideItem").find("video").length > 0 && d == 0) {
                        d = 1
                    }
                    if (d > 0) {
                        b(v).find(".carouse").height(s - 5)
                    } else {
                        b(v).find(".carouse").height(s)
                    }
                    b(v).find(".playBtn").css("top", (s - 50) / 2);
                    r()
                }
            }, 100)
        }

        function r() {
            u = b(v).find(".slideItem").width();
            if (o.height == 0) {
                if (d > 0) {
                    b(v).find(".carouse").height(b(v).find(".slideItem").height() - 5)
                } else {
                    b(v).find(".carouse").height(b(v).find(".slideItem").height())
                }
                b(v).find(".playBtn").css("top", (b(v).find(".slideItem").height() - 50) / 2)
            } else {
                b(v).find(".carouse").height(o.height)
            }
            for (var e = 0; e < c.length; e++) {
                b(v).find(".itemIndex" + e).css("left", u * e)
            }
        }
        b(window).resize(function () {
            r()
        });
        for (var l = 0; l < c.length; l++) {
            var f = u * l;
            b(this).find(c[l]).css("left", f);
            b(this).find(c[l]).addClass("itemIndex" + l);
            a += '<li class="dot" dotIndex=' + l + "></li>";
            if (l == c.length - 1) {
                a += "</ul>";
                var h = "<p class='showLunWord'></p>";
                b(this).find(".dotList").html(a);
                b(this).find(".arti-content").html(h);
                b(this).find(".dotList ul li").first().addClass("active");
                b(v).find(".arti-content .showLunWord").html(b(v).find(c[0]).find(".slidedetail").html());
                g = b(this).find(".dot")
            }
        }
        var m = function () {
            r();
            if (o.zs_lunLock) {
                o.zs_lunLock = false;
                var e = 0;
                var t = c.length - 1;
                b(v).find(".itemIndex" + t).css("left", -u);
                for (var i = 0; i < c.length; i++) {
                    e = parseFloat(b(v).find(".itemIndex" + i).css("left")) + parseFloat(b(v).find(".slideItem").width());
                    b(v).find(".itemIndex" + i).animate({
                        left: e
                    }, 500)
                }
                for (var n = 0; n < c.length; n++) {
                    var a = b(v).find(c[n]).attr("class") + "";
                    var s = a.indexOf("itemIndex");
                    var d = a.substring(s, a.length);
                    var l = d.indexOf(" ");
                    if (l > 0) {
                        d = d.substring(9, l)
                    } else {
                        d = d.substring(9, d.length)
                    }
                    b(v).find(c[n]).removeClass("itemIndex" + d);
                    var f = parseInt(d) + 1;
                    if (f == c.length) {
                        f = 0
                    }
                    b(v).find(g[n]).removeClass("active");
                    if (f == 0) {
                        b(v).find(g[n]).addClass("active");
                        b(v).find(".arti-content .showLunWord").html(b(v).find(c[n]).find(".slidedetail").html())
                    }
                    b(v).find(c[n]).addClass("itemIndex" + f)
                }
                setTimeout(function () {
                    o.zs_lunLock = true
                }, 500)
            }
        };
        var I = function () {
            r();
            if (o.zs_lunLock) {
                o.zs_lunLock = false;
                var e = 0;
                for (var t = 0; t < c.length; t++) {
                    e = parseFloat(b(v).find(".itemIndex" + t).css("left")) - parseFloat(b(v).find(".slideItem").width());
                    b(v).find(" .itemIndex" + t).animate({
                        left: e
                    }, 500)
                }
                for (var i = 0; i < c.length; i++) {
                    var n = b(v).find(c[i]).attr("class") + "";
                    var a = n.indexOf("itemIndex");
                    var s = n.substring(a, n.length);
                    var d = s.indexOf(" ");
                    if (d > 0) {
                        s = s.substring(9, d)
                    } else {
                        s = s.substring(9, s.length)
                    }
                    b(v).find(c[i]).removeClass("itemIndex" + s);
                    var l = parseInt(s) - 1;
                    if (l == -1) {
                        l = c.length - 1
                    }
                    b(v).find(g[i]).removeClass("active");
                    if (l == 0) {
                        b(v).find(g[i]).addClass("active");
                        b(v).find(".arti-content .showLunWord").html(b(v).find(c[i]).find(".slidedetail").html())
                    }
                    b(v).find(c[i]).addClass("itemIndex" + l)
                }
                setTimeout(function () {
                    var e = parseFloat(u) * (c.length - 1);
                    b(v).find(".itemIndex" + (c.length - 1)).animate({
                        left: e
                    }, .01);
                    o.zs_lunLock = true
                }, 500)
            }
        };
        b(this).find(".Next").click(function () {
            m()
        });
        b(this).find(".Previous").click(function () {
            I()
        });
        b(this).find(".dot").click(function () {
            r();
            var e = b(this).attr("dotIndex");
            var t = "";
            for (var i = 0; i < c.length; i++) {
                var n = b(v).find(c[i]).attr("class") + "";
                if (n.indexOf("itemIndex0") > 0) {
                    t = i
                }
            }
            var a = e - t;
            if (a > 0) {
                x(a)
            } else {
                p(-a)
            }
        });
        var x = function (e) {
            if (o.zs_lunLock) {
                o.zs_lunLock = false;
                var t = 0;
                for (var i = 0; i < c.length; i++) {
                    t = parseFloat(b(v).find(".itemIndex" + i).css("left")) - e * parseFloat(b(v).find(".slideItem").width());
                    b(v).find(" .itemIndex" + i).animate({
                        left: t
                    }, o.clickLunTime)
                }
                for (var n = 0; n < c.length; n++) {
                    var a = b(v).find(c[n]).attr("class") + "";
                    var s = a.indexOf("itemIndex");
                    var d = a.substring(s, a.length);
                    var l = d.indexOf(" ");
                    if (l > 0) {
                        d = d.substring(9, l)
                    } else {
                        d = d.substring(9, d.length)
                    }
                    b(v).find(c[n]).removeClass("itemIndex" + d);
                    var f = parseInt(d) - e;
                    if (f < 0) {
                        f = c.length + f
                    }
                    b(v).find(g[n]).removeClass("active");
                    if (f == 0) {
                        b(v).find(g[n]).addClass("active");
                        b(v).find(".arti-content .showLunWord").html(b(v).find(c[n]).find(".slidedetail").html())
                    }
                    b(v).find(c[n]).addClass("itemIndex" + f)
                }
                setTimeout(function () {
                    for (var e = 0; e < c.length; e++) {
                        var t = parseFloat(u) * (c.length - 1 - e);
                        b(v).find(".itemIndex" + (c.length - 1 - e)).animate({
                            left: t
                        }, .01)
                    }
                    o.zs_lunLock = true
                }, 500)
            }
        };
        var p = function (e) {
            if (o.zs_lunLock) {
                o.zs_lunLock = false;
                var t = 0;
                var i = c.length - 1;
                for (var n = 0; n < e; n++) {
                    b(v).find(".itemIndex" + i).css("left", -u - n * u);
                    i--
                }
                for (var a = 0; a < c.length; a++) {
                    t = parseFloat(b(v).find(".itemIndex" + a).css("left")) + e * parseFloat(b(v).find(".slideItem").width());
                    b(v).find(" .itemIndex" + a).animate({
                        left: t
                    }, o.clickLunTime)
                }
                for (var s = 0; s < c.length; s++) {
                    var d = b(v).find(c[s]).attr("class") + "";
                    var l = d.indexOf("itemIndex");
                    var f = d.substring(l, d.length);
                    var r = f.indexOf(" ");
                    if (r > 0) {
                        f = f.substring(9, r)
                    } else {
                        f = f.substring(9, f.length)
                    }
                    b(v).find(c[s]).removeClass("itemIndex" + f);
                    var h = parseInt(f) + e;
                    if (h >= c.length) {
                        h = h - c.length
                    }
                    b(v).find(g[s]).removeClass("active");
                    if (h == 0) {
                        b(v).find(g[s]).addClass("active");
                        b(v).find(".arti-content .showLunWord").html(b(v).find(c[s]).find(".slidedetail").html())
                    }
                    b(v).find(c[s]).addClass("itemIndex" + h)
                }
                setTimeout(function () {
                    o.zs_lunLock = true
                }, 500)
            }
        };
        b(this).bind("touchstart", function (e) {
            startX = e.originalEvent.changedTouches[0].pageX, startY = e.originalEvent.changedTouches[0].pageY
        });
        b(this).bind("touchend", function (e) {
            endX = e.originalEvent.changedTouches[0].pageX, endY = e.originalEvent.changedTouches[0].pageY;
            distanceX = endX - startX;
            distanceY = endY - startY;
            if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
                m()
            } else {
                if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
                    I()
                }
            }
        });
        var L = setInterval(function () {
            if (o.autoplay) {
                I()
            }
        }, o.autoTime);
        if (!o.autoplay) {
            clearInterval(L)
        }
        c.hover(function () {
            o.autoplay = false
        }, function () {
            o.autoplay = true
        })
    }
})(jQuery);

$(".slider").slick({
    autoplay: true,
    autoplaySpeed: 5e3,
    draggable: true,
    arrows: true,
    dots: true,
    fade: true,
    speed: 900,
    infinite: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    touchThreshold: 100
});
$(".slideshow .item_one").addClass("on");
setTimeout(function () {
    $(".slideshow .item_one").removeClass("item_one")
}, 5e3);