(function($){
	$.simplePopupOpts = {
			showOverlay : true,
			closeOnClick : true
	};
	$.fn.simplePopup = function(opts){
		opts = $.extend({},$.simplePopupOpts,opts);
		var hidePopup = function(self,overlay){
			if (arguments.length != 2){
				self = $(".simple_popup_showing");
				overlay = getOverlay();
			}
			self.removeClass("simple_popup_showing").hide();
			if (overlay && overlay.length > 0)
				overlay.hide();
		};
		var showPopup = function(self,overlay){
			var parent = self.parent();
			var w = $(window).width();
			var h = Math.min($(window).height(), parent.height());
			var myW = self.width();
			var myH = self.height();
			var myTop = (h - myH)/2;
			var myLeft = (w - myW)/2;
			self.css({
				position: "absolute",
				top: myTop + "px",
				left: myLeft + "px",
				zIndex: 51
			});
			self.addClass("simple_popup_showing").show();
			if (overlay && overlay.length > 0)
				overlay.show();
		};
		var getOverlay = function(){
			var $overlay = $("#simple_popup_overlay");
			if ($overlay.length == 0){
				$("body").append("<div id='simple_popup_overlay' style='display: none;z-index: 50;'>&nbsp;</div>");
				$overlay = $("#simple_popup_overlay");
			}
			$overlay.unbind("click");
			if (opts.closeOnClick) $overlay.bind("click",hidePopup);
			var h = $("body").height();
			var w = $("body").width();
			$overlay.css({
				position: "absolute",
				top: "0px",
				left: "0px",
				height: h + "px",
				width: w + "px"
			});
			return $overlay;
		};
		var self = $(this);
		var overlay = opts.showOverlay ? getOverlay() : [];
		if (!self.hasClass("simple_popup_showing")){
			showPopup(self,overlay);
		} else {
			hidePopup(self,overlay);
		}
	};
})(jQuery);