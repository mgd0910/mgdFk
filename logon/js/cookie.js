function getCookie(b) {
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
}

function setCookie(a, b, d) {
	var e = "";
	var c = 1;
	if (d != null) {
		c = d
	}
	e = new Date((new Date()).getTime() + c * 86400000);
	e = "; expires=" + e.toGMTString();
	document.cookie = a + "=" + escape(b) + ";path=/" + e
}

function delCookie(a) {
	var b = "";
	b = new Date((new Date()).getTime() - 1);
	b = "; expires=" + b.toGMTString();
	document.cookie = a + "=" + escape("") + ";path=/" + b
};