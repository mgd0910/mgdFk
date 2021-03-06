var VA_GLOBAL = {};
VA_GLOBAL.shopid = "";
VA_GLOBAL.pagetype = "";
VA_GLOBAL.namespace = function(c) {
	var a = c.split("."),
		b = VA_GLOBAL;
	for (i = (a[0] == "VA_GLOBAL") ? 1 : 0; i < a.length; i++) {
		b[a[i]] = b[a[i]] || {};
		b = b[a[i]]
	}
};
VA_GLOBAL.namespace("Lang");
VA_GLOBAL.Lang.trim = function(a) {
	return a.replace(/^\s+|\s+$/g, "")
};
VA_GLOBAL.Lang.isEmpty = function(a) {
	return /^\s*$/.test(a)
};
VA_GLOBAL.Lang.isNone = function(a) {
	return ((typeof a == "undefined") || a == null || ((typeof a == "string") && VA_GLOBAL.Lang.trim(a) == "") || a == "undefined")
};
VA_GLOBAL.Lang.isNumber = function(a) {
	return !isNaN(a)
};
VA_GLOBAL.Lang.random = function(b, c) {
	var a = c - b + 1;
	return Math.floor(Math.random() * a + b)
};
VA_GLOBAL.Lang.dateTimeStrWms0 = function(b) {
	try {
		var j = b.getFullYear()
	} catch (c) {
		b = new Date()
	}
	var f = b.getMonth() + 1;
	f = f < 10 ? "0" + f : "" + f;
	var a = b.getDate();
	a = a < 10 ? "0" + a : "" + a;
	var d = b.getHours();
	d = d < 10 ? "0" + d : "" + d;
	var e = b.getMinutes();
	e = e < 10 ? "0" + e : "" + e;
	var h = b.getSeconds();
	h = h < 10 ? "0" + h : "" + h;
	var g = b.getMilliseconds();
	if (g < 10) {
		g = "00" + g
	} else {
		if (g < 100) {
			g = "0" + g
		}
	}
	return b.getFullYear() + f + a + d + e + h + g
};
VA_GLOBAL.Lang.timeSeq32 = function() {
	return VA_GLOBAL.Lang.dateTimeStrWms0() + VA_GLOBAL.Lang.random(100000000000000, 999999999999999)
};
VA_GLOBAL.namespace("Http");
VA_GLOBAL.Http = {
	isIp: function(a) {
		var b = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
		return (b.test(a))
	},
	getQueryStringArgs: function() {
		var g = (location.search.length > 0 ? location.search.substring(1) : "");
		var a = {};
		var e = g.split("&");
		var d = null,
			f = null,
			j = null;
		for (var c = 0; c < e.length; c++) {
			d = e[c].split("=");
			if (d.length > 1) {
				try {
					f = decodeURIComponent(d[0]);
					j = decodeURIComponent(d[1]);
					a[f] = j
				} catch (h) {}
			}
		}
		var b = (window.location.hash.length > 0 ? window.location.hash.substring(1) : "");
		e = b.split("&");
		for (var c = 0; c < e.length; c++) {
			d = e[c].split("=");
			if (d.length > 1) {
				try {
					f = decodeURIComponent(d[0]);
					j = decodeURIComponent(d[1]);
					a[f] = j
				} catch (h) {}
			}
		}
		return a
	}
};
VA_GLOBAL.namespace("Dom");
VA_GLOBAL.Dom.loadScriptURL = function(b) {
	var a = document.createElement("script");
	a.type = "text/javascript";
	a.src = b;
	document.body.appendChild(a)
};
VA_GLOBAL.Dom.loadImageBeacon = function(b) {
	var a = document.createElement("img");
	a.type = "image/png";
	a.src = b;
	a.border = 0;
	a.height = 1;
	a.width = 1;
	document.body.appendChild(a)
};
VA_GLOBAL.namespace("Event");
VA_GLOBAL.Event = {
	getEvent: function(a) {
		return a ? a : window.event
	},
	getTarget: function(a) {
		a = a ? a : window.event;
		return a.target || a.srcElement
	},
	stopPropagation: function(a) {
		a = a ? a : window.event;
		if (a.stopPropagation) {
			a.stopPropagation()
		} else {
			a.cancelBubble = true
		}
	},
	preventDefault: function(a) {
		a = a ? a : window.event;
		if (a.preventDefault) {
			a.preventDefault()
		} else {
			a.returnValue = false
		}
	},
	addHandler: function(a, c, b) {
		a = typeof a == "string" ? document.getElementById(a) : a;
		if (a.addEventListener) {
			a.addEventListener(c, b, false)
		} else {
			if (a.attachEvent) {
				a.attachEvent("on" + c, b)
			} else {
				a["on" + c] = b
			}
		}
	}
};
VA_GLOBAL.namespace("Cookie");
VA_GLOBAL.Cookie = {
	get: function(e) {
		var b = null;
		var a = document.cookie.split("; ");
		for (var c = 0, d = a.length; c < d; c++) {
			var f = a[c].split("=");
			if (f != null && f != "undefined") {
				if (f[0] === e) {
					if (f[1] != null && f[1] != "undefined") {
						b = f[1]
					}
				}
			}
		}
		return b
	},
	set: function(d, g, c, e, b, f) {
		var a = encodeURIComponent(d) + "=" + encodeURIComponent(g);
		if (c instanceof Date) {
			a += "; expires=" + c.toGMTString()
		}
		if (e) {
			a += "; path=" + e
		}
		if (b) {
			a += "; domain=" + b
		}
		if (f) {
			a += "; secure"
		}
		document.cookie = a
	},
	unset: function(b, c, a, d) {
		this.set(b, "", new Date(0), c, a, d)
	}
};
VA_GLOBAL.namespace("SubCookie");
VA_GLOBAL.SubCookie = {
	get: function(a, c) {
		var b = this.getAll(a);
		if (b) {
			return b[c]
		} else {
			return null
		}
	},
	getAll: function(g) {
		var b = encodeURIComponent(g) + "=",
			c = document.cookie.indexOf(b),
			d = null,
			j = {};
		if (c > -1) {
			var a = document.cookie.indexOf(";", c);
			if (a == -1) {
				a = document.cookie.length
			}
			d = document.cookie.substring(c + b.length, a);
			if (d.length > 0) {
				var k = d.split("&");
				for (var e = 0, f = k.length; e < f; e++) {
					var h = k[e].split("=");
					j[decodeURIComponent(h[0])] = decodeURIComponent(h[1])
				}
				return j
			}
		}
		return j
	},
	set: function(c, g, h, b, d, a, e) {
		var f = this.getAll(c) || {};
		f[g] = h;
		this.setAll(c, f, b, d, a, e)
	},
	setAll: function(d, h, c, e, b, f) {
		var a = encodeURIComponent(d) + "=";
		var g = new Array();
		for (var j in h) {
			if (j.length > 0 && h.hasOwnProperty(j)) {
				g.push(encodeURIComponent(j) + "=" + encodeURIComponent(h[j]))
			}
		}
		if (g.length > 0) {
			a += g.join("&");
			if (c instanceof Date) {
				a += "; expires=" + c.toGMTString()
			}
			if (e) {
				a += "; path=" + e
			}
			if (b) {
				a += "; domain=" + b
			}
			if (f) {
				a += "; secure"
			}
		} else {
			a += "; expires=" + (new Date(0)).toGMTString()
		}
		document.cookie = a
	},
	unset: function(b, f, c, a, d) {
		var e = this.getAll(b);
		if (e) {
			delete e[f];
			this.setAll(b, e, null, c, a, d)
		}
	},
	unsetAll: function(b, c, a, d) {
		this.setAll(b, null, new Date(0), c, a, d)
	}
};
VA_GLOBAL.namespace("vanew");
VA_GLOBAL.vanew = {
	prepare: function() {
		var c = new Date().getTime();
		VA_GLOBAL.new_begintime = c;
		VA_GLOBAL.new_requestid = VA_GLOBAL.Lang.timeSeq32();
		var p = window.location.protocol.toLowerCase();
		VA_GLOBAL.new_protocol = p;
		VA_GLOBAL.new_resolution = window.screen.width + "*" + window.screen.height;
		var e = "//vamr.vancl.com:";
		var f = p == "https:" ? 443 : 80;
		VA_GLOBAL.new_server = p + e + f;
		var g = window.location.hostname.toLowerCase();
		VA_GLOBAL.new_domain = g;
		var m = VA_GLOBAL.Http.isIp(g);
		var k = g.lastIndexOf(".");
		if (k > 0) {
			k = g.lastIndexOf(".", k - 1)
		}
		var h = m ? g : (k == -1 ? ("." + g) : g.substring(k));
		VA_GLOBAL.new_domain1 = h;
		var v = window.location.pathname;
		if (VA_GLOBAL.Lang.isEmpty(v)) {
			v = "/"
		}
		VA_GLOBAL.uri = v;
		var q = window.location.search;
		if (q.length > 0) {
			q = q.substring(1)
		}
		VA_GLOBAL.new_query = q;
		var o = VA_GLOBAL.Http.getQueryStringArgs();
		var t = o.source;
		if (VA_GLOBAL.Lang.isNone(t)) {
			t = null
		}
		var j = (window.location.hash.length > 0 ? window.location.hash.substring(1) : "");
		if (VA_GLOBAL.Lang.isNone(j)) {
			j = "-"
		}
		VA_GLOBAL.new_source = t;
		VA_GLOBAL.new_hash = j;
		var r = document.referrer;
		if (r == null || (typeof r == "undefined") || r == "") {
			VA_GLOBAL.Cookie.unset("va_click", "/", VA_GLOBAL.new_domain1, null)
		} else {
			if (r.indexOf(".vancl.com") == -1) {
				VA_GLOBAL.Cookie.unset("va_click", "/", VA_GLOBAL.new_domain1, null)
			}
		}
		VA_GLOBAL.new_referer = r;
		VA_GLOBAL.new_useragent = navigator.userAgent;
		var s = VA_GLOBAL.Cookie.get("sid");
		if ((typeof s == "undefined") || s == null || s == "") {
			s = "-"
		}
		var z = VA_GLOBAL.Cookie.get("va_sid");
		var A = null;
		if (z != null && z == s) {
			A = "g"
		} else {
			if (r == null || (typeof r == "undefined") || r == "") {
				A = "l";
				VA_GLOBAL.Cookie.unset("va_click", "/", VA_GLOBAL.new_domain1, null)
			} else {
				if (r.indexOf(".vancl.com") == -1) {
					A = "l";
					VA_GLOBAL.Cookie.unset("va_click", "/", VA_GLOBAL.new_domain1, null)
				} else {
					A = "g"
				}
			}
			z = s
		}
		VA_GLOBAL.new_sid = z;
		VA_GLOBAL.new_visitsequence = A;
		var b = new Date();
		b.setTime(c + 24 * 60 * 60 * 1000);
		VA_GLOBAL.Cookie.set("va_sid", z, b, "/", VA_GLOBAL.new_domain1, null);
		var d = VA_GLOBAL.SubCookie.getAll("va_click");
		VA_GLOBAL.new_parentrequestid = (typeof d.rid == "undefined") ? "-" : d.rid;
		VA_GLOBAL.new_clickid = (typeof d.cid == "undefined") ? "-" : d.cid;
		VA_GLOBAL.new_trackurl = (typeof d.turl == "undefined") ? "-" : decodeURIComponent(d.turl);
		VA_GLOBAL.new_trackname = (typeof d.tname == "undefined") ? "-" : d.tname;
		VA_GLOBAL.new_tracklabel = VA_GLOBAL.Lang.trim((typeof d.tlabel == "undefined") ? "-" : d.tlabel);
		var w = VA_GLOBAL.SubCookie.getAll("va_visit");
		var u = w.uid;
		var x = w.uvc;
		if (VA_GLOBAL.Lang.isNone(u)) {
			u = VA_GLOBAL.Lang.timeSeq32();
			x = 1;
			w.uid = u;
			w.uvc = x;
			w.ft = c;
			w.lt = c;
			w.tt = c
		} else {
			if (A == "l") {
				try {
					x = Number(x) + 1;
					if (Number(x) > 999) {
						x = 999
					}
				} catch (y) {
					x = 1
				}
				w.uvc = x;
				w.lt = w.tt;
				w.tt = c
			} else {
				try {
					x = Number(x);
					if (Number(x) > 999) {
						x = 999
					}
				} catch (y) {
					x = 1
				}
				w.uvc = x
			}
		}
		VA_GLOBAL.new_uid = w.uid;
		VA_GLOBAL.new_uservisitcount = w.uvc;
		VA_GLOBAL.new_firsttime = w.ft;
		VA_GLOBAL.new_lasttime = w.lt;
		VA_GLOBAL.new_thistime = w.tt;
		var a = new Date();
		a.setTime(c + 365 * 24 * 60 * 60 * 1000);
		VA_GLOBAL.SubCookie.setAll("va_visit", w, a, "/", VA_GLOBAL.new_domain1, null);
		var l = "-";
		if ((typeof track_sinput != "undefined") && track_sinput != null && track_sinput != "") {
			l = track_sinput
		}
		VA_GLOBAL.new_insitesearchway = l;
		var n = getPageLab();
		if (n != "") {
			VA_GLOBAL.new_pagelab = n
		} else {
			VA_GLOBAL.new_pagelab = "-"
		}
	},
	request: function() {
		try {
			if (typeof VA_GLOBAL.new_server != "undefined") {
				var c = VA_GLOBAL.new_referer;
				var b = VA_GLOBAL.new_hash;
				var f = VA_GLOBAL.new_trackname;
				var e = VA_GLOBAL.new_tracklabel;
				var d = VA_GLOBAL.new_server + "/visit.ashx?";
				d += "version=1.2";
				d += "&requestid=" + VA_GLOBAL.new_requestid;
				d += "&parentrequestid=" + VA_GLOBAL.new_parentrequestid;
				d += "&sid=" + VA_GLOBAL.new_sid;
				d += "&uid=" + VA_GLOBAL.new_uid;
				d += "&referer=" + (c == "" ? "-" : encodeURIComponent(c.replace(/[\r\n\t]/g, " ").substring(0, 400)));
				d += "&visitsequence=" + VA_GLOBAL.new_visitsequence;
				d += "&uservisitcount=" + VA_GLOBAL.new_uservisitcount;
				d += "&firsttime=" + VA_GLOBAL.new_firsttime;
				d += "&lasttime=" + VA_GLOBAL.new_lasttime;
				d += "&thistime=" + VA_GLOBAL.new_thistime;
				d += "&insitesearchway=" + VA_GLOBAL.new_insitesearchway;
				d += "&pagelab=" + encodeURIComponent(VA_GLOBAL.new_pagelab);
				d += "&resolution=" + encodeURIComponent(VA_GLOBAL.new_resolution);
				d += "&title=" + encodeURIComponent(document.title);
				d += "&hash=" + (b == "" ? "-" : encodeURIComponent(b));
				d += "&clickid=" + VA_GLOBAL.new_clickid;
				d += "&trackname=" + (f == "" ? "-" : encodeURIComponent(f.replace(/[\r\n\t\'\"]/g, " ")));
				d += "&tracklabel=" + (e == "" ? "-" : encodeURIComponent(e.replace(/[\r\n\t\'\"]/g, " ")));
				d += "&shopid=" + (VA_GLOBAL.shopid == "" ? "-" : VA_GLOBAL.shopid);
				d += "&pagetype=" + (VA_GLOBAL.pagetype == "" ? "-" : VA_GLOBAL.pagetype);
				$.getScript(d)
			}
		} catch (a) {}
	},
	loadtime: function() {
		try {
			if (typeof VA_GLOBAL.new_server != "undefined") {
				var c = new Date().getTime() - VA_GLOBAL.new_begintime;
				var b = VA_GLOBAL.new_referer;
				var d = VA_GLOBAL.new_server + "/render.ashx?";
				d += "version=1.2";
				d += "&requestid=" + VA_GLOBAL.new_requestid;
				d += "&parentrequestid=" + VA_GLOBAL.new_parentrequestid;
				d += "&sid=" + VA_GLOBAL.new_sid;
				d += "&uid=" + VA_GLOBAL.new_uid;
				d += "&rendertime=" + c;
				d += "&referer=" + (b == "" ? "-" : encodeURIComponent(b.replace(/[\r\n\t]/g, " ").substring(0, 400)));
				$.getScript(d)
			}
		} catch (a) {}
	},
	listenclick: function() {
		try {
			VA_GLOBAL.Event.addHandler(document, "mousedown", function(b) {
				var d = VA_GLOBAL.Event.getTarget(b);
				if (d.nodeType == 1) {
					var c = VA_GLOBAL.vanew.elementclicked(d);
					if (c == false) {
						VA_GLOBAL.vanew.elementclicked(d.parentNode)
					}
				}
			})
		} catch (a) {}
	},
	elementclicked: function(h) {
		if (h.nodeType != 1) {
			return false
		}
		var g = false;
		var c = h.className;
		if (c == null || (typeof c == "undefined")) {
			c = ""
		}
		c = c.toLowerCase();
		var b = c.split(" ");
		for (var f = 0; f < b.length; f++) {
			if (b[f] == "track") {
				g = true;
				break
			}
		}
		var l = null;
		if (g) {
			try {
				l = h.name
			} catch (d) {}
		}
		if (g == false || (typeof l == "undefined") || l == null || l == "") {
			l = "-"
		}
		var j = h.nodeName.toLowerCase();
		var k = null;
		var m = null;
		if (j == "a") {
			try {
				k = h.innerHTML;
				var e = h.href;
				if ((typeof e != "undefined") && e != null) {
					if (/^https?:\/\/./i.test(e)) {
						m = e
					} else {
						if (/^\/\/./i.test(e)) {
							m = e
						} else {
							if (/^\/./i.test(e)) {
								m = e
							}
						}
					}
				}
				m = encodeURIComponent(m)
			} catch (d) {}
		} else {
			try {
				k = h.value;
				if ((typeof k == "undefined") || k == null) {
					k = h.title;
					if ((typeof k == "undefined") || k == null) {
						k = h.data
					}
				}
			} catch (d) {}
		}
		if ((typeof k == "undefined") || k == null) {
			k = "-"
		}
		try {
			if (typeof k != "string") {
				k = ""
			} else {
				k = k.replace(/[\r\n\t\'\"]/g, " ")
			}
		} catch (d) {}
		k = VA_GLOBAL.Lang.trim(k);
		if (k.length > 100) {
			k = encodeURIComponent(k.substring(0, 100))
		} else {
			k = encodeURIComponent(k)
		}
		var a = VA_GLOBAL.Lang.timeSeq32();
		if (g) {
			VA_GLOBAL.vanew.recordtrackclick(a, l, m, k)
		}
		if (j == "a") {
			VA_GLOBAL.vanew.recordaclick(a, l, m, k)
		}
		return g || j == "a"
	},
	recordaclick: function(b, e, f, d) {
		if (e == null || (typeof e == "undefined") || e == "") {
			e = "-"
		}
		if (d == null || (typeof d == "undefined") || d == "") {
			d = "-"
		}
		if (f == null || (typeof f == "undefined") || f == "") {
			f = "-"
		}
		var c = {};
		c.rid = VA_GLOBAL.new_requestid;
		c.cid = b;
		c.turl = f;
		c.tname = e;
		c.tlabel = d;
		var a = new Date();
		a.setTime(new Date().getTime() + 60 * 1000);
		VA_GLOBAL.SubCookie.setAll("va_click", c, a, "/", VA_GLOBAL.new_domain1, null)
	},
	recordtrackclick: function(a, e, f, d) {
		if (e == null || (typeof e == "undefined") || e == "") {
			e = "-"
		}
		if (d == null || (typeof d == "undefined") || d == "") {
			d = "-"
		}
		if (f == null || (typeof f == "undefined") || f == "") {
			f = "-"
		}
		if (typeof VA_GLOBAL.new_server != "undefined") {
			var b = VA_GLOBAL.new_referer;
			var c = VA_GLOBAL.new_server + "/click.ashx?";
			c += "version=1.2";
			c += "&clickid=" + a;
			c += "&trackurl=" + (f == "" ? "-" : encodeURIComponent(f.replace(/[\r\n\t]/g, " ").substring(0, 400)));
			c += "&trackname=" + (e == "" ? "-" : encodeURIComponent(e.replace(/[\r\n\t]/g, " ").substring(0, 400)));
			c += "&tracklabel=" + (d == "" ? "-" : encodeURIComponent(d.replace(/[\r\n\t]/g, " ").substring(0, 400)));
			c += "&requestid=" + VA_GLOBAL.new_requestid;
			c += "&sid=" + VA_GLOBAL.new_sid;
			c += "&uid=" + VA_GLOBAL.new_uid;
			c += "&referer=" + (b == "" ? "-" : encodeURIComponent(b.replace(/[\r\n\t]/g, " ").substring(0, 400)));
			c += "&shopid=" + (VA_GLOBAL.shopid == "" ? "-" : VA_GLOBAL.shopid);
			c += "&pagetype=" + (VA_GLOBAL.pagetype == "" ? "-" : VA_GLOBAL.pagetype);
			$.getScript(c)
		}
	},
	send: function() {
		try {
			if (typeof VA_GLOBAL.v4sreadyed != "undefined") {
				return
			}
			VA_GLOBAL.v4sreadyed = "1";
			VA_GLOBAL.vanew.prepare();
			VA_GLOBAL.vanew.request()
		} catch (a) {}
	},
	loaded: function() {
		try {
			if (typeof VA_GLOBAL.v4sloaded != "undefined") {
				return
			}
			VA_GLOBAL.v4sloaded = "1";
			VA_GLOBAL.vanew.loadtime();
			VA_GLOBAL.vanew.listenclick()
		} catch (a) {}
	}
};
var PAGELAB_PATTERN = /^(PageLab_PLE[0-9]{4})=([^;]*)$/;
var weblog_loadtime = new Date();
try {
	$(document).ready(function() {
		VA_GLOBAL.vanew.send()
	})
} catch (err) {}

function getPageLab() {
	var b = "";
	var c = document.cookie.split(";");
	for (var a = 0; a < c.length; a++) {
		if (PAGELAB_PATTERN.test(trim(c[a]))) {
			b += trim(c[a].split("=")[1]) + ","
		}
	}
	b = (b.length > 0) ? b.substr(0, b.length - 1) : "";
	return b
}

function trim(c) {
	for (var a = 0; a < c.length && c.charAt(a) == " "; a++) {}
	for (var b = c.length; b > 0 && c.charAt(b - 1) == " "; b--) {}
	if (a > b) {
		return ""
	}
	return c.substring(a, b)
}
try {
	$(window).load(function() {
		VA_GLOBAL.vanew.loaded()
	})
} catch (err) {};