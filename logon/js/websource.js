function ClickSourceVancl() {}
ClickSourceVancl.prototype.url = location.href;
ClickSourceVancl.prototype.refUrl = document.referrer;
ClickSourceVancl.prototype.clickwwwname = "http://click.vancl.com/";
ClickSourceVancl.prototype.redirect = function(b) {
	var a = document.createElement("script");
	a.src = b;
	var c = document.getElementsByTagName("script")[0];
	c.parentNode.insertBefore(a, c)
};
ClickSourceVancl.prototype.get_param = function(d) {
	var f = location.search.substring(1) || location.hash.substring(1);
	var c = f.split("&");
	for (var b = 0; b < c.length; b++) {
		var e = c[b].indexOf("=");
		if (e == -1) {
			continue
		}
		var a = c[b].substring(0, e);
		if (a.toLowerCase() == d.toLowerCase()) {
			var g = c[b].substring(e + 1);
			g = decodeURIComponent(g);
			return g
		}
	}
	return null
};
ClickSourceVancl.prototype.getHost = function(d) {
	var a = "";
	if (typeof d == "undefined" || d == null) {
		return a
	}
	var c = /.*\:\/\/([^\/]*).*/;
	var b = d.match(c);
	if (typeof b != "undefined" && b != null) {
		a = b[1]
	}
	return a
};
ClickSourceVancl.prototype.getCookie = function(b) {
	var a = "";
	var c = b + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(c);
		if (offset != -1) {
			offset += c.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) {
				end = document.cookie.length
			}
			a = unescape(document.cookie.substring(offset, end))
		}
	}
	return a
};
ClickSourceVancl.prototype.setCookie = function(a, b, d) {
	var e = "";
	var c = 1;
	if (d != null) {
		c = d
	}
	e = new Date((new Date()).getTime() + c * 86400000);
	e = "; expires=" + e.toGMTString();
	document.cookie = a + "=" + escape(b) + ";domain=vancl.com;path=/" + e
};
ClickSourceVancl.prototype.excuteFunction = function(a) {
	try {
		if (window.location.host.indexOf("vancl.com") < 0) {
			return
		}
		try {
			if (window.top == window) {
				a.setCookie("union_frame", "0", 1)
			} else {
				a.setCookie("union_frame", "1", 1)
			}
		} catch (b) {
			a.setCookie("union_frame", "1", 1)
		}
		if (window.document.referrer && window.document.referrer.indexOf("soso.com") >= 0) {
			VanclUnionClick();
			return
		}
		var j = a.get_param("source");
		if (j != null && j != "") {
			var k = a.get_param("sourcesuninfo");
			if (k == null) {
				k = ""
			}
			if (k == "") {
				var g = a.get_param("psId");
				if (g != null && g != "") {
					k = "ad-0-1-" + g + "-0"
				}
				var l = a.get_param("srcId");
				if (l != null && l != "") {
					k = "ad-0-3-0" + l + "-1"
				}
			}
			var n = a.getCookie("union_visited");
			var d;
			if (n == "1") {
				d = 0
			} else {
				a.setCookie("union_visited", "1", 1);
				d = 1
			}
			var c = a.clickwwwname + "websource/websource.aspx?source=" + j + "&sourceInfo=" + k + "&referer=" + encodeURIComponent(a.refUrl) + "&hrefurl=" + encodeURIComponent(a.url) + "&isnew=" + d;
			a.redirect(c)
		} else {
			var h = a.refUrl;
			if (h != null && h != "") {
				if (a.getHost(h).indexOf("vancl.com") < 0 && a.getHost(h).indexOf("vanclimg.com") < 0) {
					var n = a.getCookie("union_visited");
					var d;
					if (n == "1") {
						d = 0
					} else {
						a.setCookie("union_visited", "1", 1);
						d = 1
					}
					var f = a.clickwwwname + "websource/websourceurl.aspx?SourceUrl=" + encodeURIComponent(h) + "&hrefurl=" + encodeURIComponent(a.url) + "&isnew=" + d;
					a.redirect(f)
				} else {
					var m = a.getCookie("WebSourceTemp");
					if (m != "") {
						var i = a.clickwwwname + "websource/websource.aspx";
						a.redirect(i)
					}
				}
			}
		}
	} catch (b) {}
};
var clickSourceVanclObj = new ClickSourceVancl();
clickSourceVanclObj.excuteFunction(clickSourceVanclObj);

function VanclUnionClick() {
	var b = location.href;
	var c = document.referrer;
	var d = document.createElement("script");
	d.src = "http://click.vancl.com/Default.aspx?landingPage=" + encodeURIComponent(b) + "&referrer=" + encodeURIComponent(c);
	d.language = "javascript";
	d.type = "text/javascript";
	var a = document.getElementsByTagName("head")[0];
	a.appendChild(d)
};