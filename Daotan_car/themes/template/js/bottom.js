/*  xiaodaohang  */
function doAct(s){
    var t = document.getElementById('nav');
    var d = document.getElementById('smdaohang');
    c = s.className;

    if(c != null && c.indexOf(' ') > -1){
        s.className = c.replace(' ', '');
        t.className = t.className.replace('navh', '');
        d.className = d.className.replace(' smdaohangh', '');
    }else{
        s.className = c + ' ';
        t.className = t.className + 'navh';
        d.className = d.className + ' smdaohangh';
    }
}

(function($){
    $.fn.extend({

    accordion: function(options) {

		var defaults = {
			accordion: 'true',
			speed: 300,
			closedSign: '[+]',
			openedSign: '[-]'
		};

		var opts = $.extend(defaults, options);
 		var $this = $(this);

 		$this.find("li").each(function() {
 			if($(this).find("ul").size() != 0){
 				$(this).prepend("<span class='shizi'>"+"</span>");
 			}
 		});

 		$this.find("li.active").each(function() {
 			$(this).parents("ul").slideDown(opts.speed);
 			$(this).parents("ul").parent("li").find("span:first").attr("class","yizi");
 		});

  		$this.find("li span").click(function() {
  			if($(this).parent().find("ul").size() != 0){
  				if(opts.accordion){
  					if(!$(this).parent().find("ul").is(':visible')){
  						parents = $(this).parent().parents("ul");
  						visible = $this.find("ul:visible");
  						visible.each(function(visibleIndex){
  							var close = true;
  							parents.each(function(parentIndex){
  								if(parents[parentIndex] == visible[visibleIndex]){
  									close = false;
  									return false;
  								}
  							});
  							if(close){
  								if($(this).parent().find("ul") != visible[visibleIndex]){
  									$(visible[visibleIndex]).slideUp(opts.speed, function(){
  										$(this).parent("li").find("span:first").attr("class","yizi");
  									});

  								}
  							}
  						});
  					}
  				}
  				if($(this).parent().find("ul:first").is(":visible")){
  					$(this).parent().find("ul:first").slideUp(opts.speed, function(){
  						$(this).parent("li").find("span:first").delay(opts.speed).attr("class","shizi");
  					});


  				}else{
  					$(this).parent().find("ul:first").slideDown(opts.speed, function(){
  						$(this).parent("li").find("span:first").delay(opts.speed).attr("class","yizi");
  					});
  				}
  			}
  		});
    }
});
})(jQuery);


$(document).ready(function() {
	$(".topnav").accordion({
		accordion:false,
		speed: 500,
		closedSign: '[+]',
		openedSign: '[-]'
	});
});


/*  yvzhong  */
$(".yvzhonga").click(function(e){
	e.preventDefault();

	var $tk = $('.yvul');
	if($tk.is(":hidden")){
		$tk.show();
	}else{
		$tk.hide();
	}
});



/*  feiru  feichu  */
!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.scrollReveal=e()}(this,function(){return window.scrollReveal=function(a){"use strict";function t(t){this.docElem=a.document.documentElement,this.options=this.extend(this.defaults,t),this.styleBank={},1==this.options.init&&this.init()}var o=1,r=function(){return a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||function(t){a.setTimeout(t,1e3/60)}}();return t.prototype={defaults:{after:"0s",enter:"bottom",move:"24px",over:"0.66s",easing:"ease-in-out",opacity:0,viewportFactor:.33,reset:!1,init:!0},init:function(){this.scrolled=!1;var i=this;this.elems=Array.prototype.slice.call(this.docElem.querySelectorAll("[data-scroll-reveal]")),this.elems.forEach(function(t){var e=t.getAttribute("data-scroll-reveal-id");e||(e=o++,t.setAttribute("data-scroll-reveal-id",e)),i.styleBank[e]||(i.styleBank[e]=t.getAttribute("style")),i.update(t)});var t=function(){i.scrolled||(i.scrolled=!0,r(function(){i._scrollPage()}))},e=function(){function t(){i._scrollPage(),i.resizeTimeout=null}i.resizeTimeout&&clearTimeout(i.resizeTimeout),i.resizeTimeout=setTimeout(t,200)};a.addEventListener("scroll",t,!1),a.addEventListener("resize",e,!1)},_scrollPage:function(){var e=this;this.elems.forEach(function(t){e.update(t)}),this.scrolled=!1},parseLanguage:function(t){function e(t){var e=[],i=["from","the","and","then","but","with"];return t.forEach(function(t){i.indexOf(t)>-1||e.push(t)}),e}var i=t.getAttribute("data-scroll-reveal").split(/[, ]+/),o={};return i=e(i),i.forEach(function(t,e){switch(t){case"enter":return void(o.enter=i[e+1]);case"after":return void(o.after=i[e+1]);case"wait":return void(o.after=i[e+1]);case"move":return void(o.move=i[e+1]);case"ease":return o.move=i[e+1],void(o.ease="ease");case"ease-in":return o.move=i[e+1],void(o.easing="ease-in");case"ease-in-out":return o.move=i[e+1],void(o.easing="ease-in-out");case"ease-out":return o.move=i[e+1],void(o.easing="ease-out");case"over":return void(o.over=i[e+1]);default:return}}),o},update:function(t){var e=this.genCSS(t),i=this.styleBank[t.getAttribute("data-scroll-reveal-id")];return null!=i?i+=";":i="",t.getAttribute("data-scroll-reveal-initialized")||(t.setAttribute("style",i+e.initial),t.setAttribute("data-scroll-reveal-initialized",!0)),this.isElementInViewport(t,this.options.viewportFactor)?t.getAttribute("data-scroll-reveal-complete")?void 0:this.isElementInViewport(t,this.options.viewportFactor)?(t.setAttribute("style",i+e.target+e.transition),void(this.options.reset||setTimeout(function(){""!=i?t.setAttribute("style",i):t.removeAttribute("style"),t.setAttribute("data-scroll-reveal-complete",!0)},e.totalDuration))):void 0:void(this.options.reset&&t.setAttribute("style",i+e.initial+e.reset))},genCSS:function(t){var e,i,o=this.parseLanguage(t);o.enter?(("top"==o.enter||"bottom"==o.enter)&&(e=o.enter,i="y"),("left"==o.enter||"right"==o.enter)&&(e=o.enter,i="x")):(("top"==this.options.enter||"bottom"==this.options.enter)&&(e=this.options.enter,i="y"),("left"==this.options.enter||"right"==this.options.enter)&&(e=this.options.enter,i="x")),("top"==e||"left"==e)&&(o.move=o.move?"-"+o.move:"-"+this.options.move);var r=o.move||this.options.move,n=o.over||this.options.over,s=o.after||this.options.after,a=o.easing||this.options.easing,l=o.opacity||this.options.opacity,u="-webkit-transition: -webkit-transform "+n+" "+a+" "+s+",  opacity "+n+" "+a+" "+s+";transition: transform "+n+" "+a+" "+s+", opacity "+n+" "+a+" "+s+";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;",c="-webkit-transition: -webkit-transform "+n+" "+a+" 0s,  opacity "+n+" "+a+" "+s+";transition: transform "+n+" "+a+" 0s,  opacity "+n+" "+a+" "+s+";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;",f="-webkit-transform: translate"+i+"("+r+");transform: translate"+i+"("+r+");opacity: "+l+";",p="-webkit-transform: translate"+i+"(0);transform: translate"+i+"(0);opacity: 1;";return{transition:u,initial:f,target:p,reset:c,totalDuration:1e3*(parseFloat(n)+parseFloat(s))}},getViewportH:function(){var t=this.docElem.clientHeight,e=a.innerHeight;return e>t?e:t},getOffset:function(t){var e=0,i=0;do{isNaN(t.offsetTop)||(e+=t.offsetTop),isNaN(t.offsetLeft)||(i+=t.offsetLeft)}while(t=t.offsetParent);return{top:e,left:i}},isElementInViewport:function(t,e){var i=a.pageYOffset,o=i+this.getViewportH(),r=t.offsetHeight,n=this.getOffset(t).top,s=n+r,e=e||0;return o>=n+r*e&&s>=i||"fixed"==(t.currentStyle?t.currentStyle:a.getComputedStyle(t,null)).position},extend:function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}},t}(window),scrollReveal});

if (window.screen.width >= 1000) {
		(function($) {
			'use strict';
			window.scrollReveal = new scrollReveal({
				move: '50px'
			});
		})();
		try {
			Typekit.load();
		} catch(e) {}
	}

/*  huidao   dingbu  */
$(window).scroll(function(){if($(this).scrollTop()>=120){$(".top").addClass("bottom")}else{$(".top").removeClass("bottom")}});$(".top").click(function(){$(window).scrollTop(0)});

/*  resize
function hengshuping(){if(window.orientation==180||window.orientation==0){location.reload()}if(window.orientation==90||window.orientation==-90){location.reload()}}window.addEventListener("onorientationchange"in window?"orientationchange":"resize",hengshuping,false);function orient(){if(window.orientation==90||window.orientation==-90){$("body").attr("class","landscape");orientation="landscape";return false}else{if(window.orientation==0||window.orientation==180){$("body").attr("class","portrait");orientation="portrait";return false}}}$(function(){orient()});$(window).bind("orientationchange",function(n){orient()});
*/
/*  placeholder  */
$(function(){if(!placeholderSupport()){$("[placeholder]").focus(function(){var l=$(this);if(l.val()==l.attr("placeholder")){l.val("");l.removeClass("placeholder")}}).blur(function(){var l=$(this);if(l.val()==""||l.val()==l.attr("placeholder")){l.addClass("placeholder");l.val(l.attr("placeholder"))}}).blur()}});function placeholderSupport(){return"placeholder"in document.createElement("input")}

/*  lanjiazai  */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

		$(".nlazy").lazyload({
			effect: "fadeIn"
		});

/*  prl zhankai  */
if (window.screen.width <= 991) {
$(function () {
    $(".j-nextshow").click(function (t) {
        t.preventDefault();
        var e = $(this),
            n = e.next();
        if (n.is(":hidden")) {
                n.slideDown()
            } else {
                n.slideUp()
            }
    });
});
}

/*  table  */
$("table").wrap("<div class='table'></div>");

/*  sousuo  */
$(".sou2").click(function(e){
	e.preventDefault();

	var $tk = $('.sousuo');
if ($tk.is(".sousuof")) {$tk.removeClass("sousuof");} else {
		if($tk.not(".sousuof")){
		$tk.addClass("sousuof");
	};	}
});


$(".pfbd-hd").click(function(e){
	e.preventDefault();

	var $tk = $('.pfbd-bd');
if($tk.hasClass('pfhe')){
	    $tk.removeClass("pfhe");
	}else{
    $tk.addClass("pfhe");
	}
});

function NumAutoPlusAnimation(targetEle, options) {
  options = options || {};
  let $this = targetEle,
    time = options.time || $this.data('time'),
    finalNum = options.num || $this.data('value'),
    regulator = options.regulator || 100,
    step = finalNum / (time / regulator),
    count = 0, //计数器
    initial = 0;

  let timer = setInterval(function () {
    count = count + step;
    if (count >= finalNum) {
      clearInterval(timer);
      count = finalNum;
    }
    let t = Math.floor(count);
    if (t == initial) return;
    initial = t;
    $this.innerHTML = initial;
  }, 30);
}
/*
 val:要增长的元素
 time :增长的总时间
 num: 增长的最终值
 regulator:增长的速度
 */
function addSelf() {
  $(".timer.num").each(function (ind, val) {
	  let number = $(val).data().to;
	  //判断val是不是数字类型的
	  if(typeof number == 'number'){

		  NumAutoPlusAnimation(val, {
			  time: $(val).data().speed,
			  num: $(val).data().to,
			  regulator: 50,
		  })
	  }
  })
}
$(function () {
  addSelf()
});












