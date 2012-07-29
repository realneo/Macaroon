/*
 * Macaroon Plugin - Simple cookie access
 * @author Ben Plum <benjaminplum@gmail.com>
 * @version 1.0
 *
 * Copyright � 2012 Ben Plum <ben@benjaminplum.com>
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
 
(function($) {
	var options = {
		expires: null,
		path: null,
		domain: null
	};
	var methods = {
		create: function(key, value, options) {
			var expires = "";
			var path = "; path=/";
			var domain = "";
			if (options.expires != null) {
				var date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			if (options.path != null) {
				path = "; path=" + options.path
			}
			if (options.domain != null) {
				domain = "; domain=" + options.domain;
			}
			document.cookie = key + "=" + value + expires + domain + path;
		},
		read: function(key) {
			var keyString = key + "=";
			var cookieArray = document.cookie.split(';');
			for(var i = 0; i < cookieArray.length; i++) {
				var cookie = cookieArray[i];
				while (cookie.charAt(0) == ' ') {
					cookie = cookie.substring(1, cookie.length);
				}
				if (cookie.indexOf(keyString) == 0) return cookie.substring(keyString.length, cookie.length);
			}
			return null;
		},
		erase: function(key) {
			methods.create(key, "", { expires: -1 });
		}
	};
	
	$.macaroon = function(key, value, opts) {
		if (typeof key == "object") {
			options = jQuery.extend(options, key);
			return null;
		} else {
			opts = jQuery.extend(options, opts);
		}
		
		if (typeof key != "undefined") {
			if (typeof value != "undefined") {
				if (value == null) {
					methods.erase(key);
				} else {
					methods.create(key, value, opts);
				}
			} else {
				return methods.read(key);
			}
		}
	};
})(jQuery);