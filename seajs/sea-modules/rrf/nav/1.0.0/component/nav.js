define("alipay/nav/1.2.12/nav-global", ["$", "./widget/abtest", "alipay/request/0.9.1/request", "arale/cookie/1.0.2/cookie", "./component/top", "arale/popup/1.1.5/popup", "arale/overlay/1.1.3/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "./widget/component", "arale/templatable/0.9.2/templatable", "gallery/handlebars/1.0.2/handlebars", "alipay/message-panel/1.0.2/message-panel", "gallery/handlebars/1.0.2/runtime", "./widget/account", "./tpl/component-top.tpl", "./tpl/widget-help.tpl", "./tpl/widget-more.tpl", "./tpl/widget-account.tpl", "./component/common", "./tpl/component-common.tpl", "./widget/cmstpl"], function(a, b) {
	var c = a("$"),
		d = a("./widget/abtest"),
		e = a("./component/top"),
		f = a("./component/common"),
		g = a("./widget/cmstpl");
	b.init = function(a) {
		c.extend(a, g), d(a, function(b) {
			e[b](a).appendTo(a.container), f[b](a).appendTo(a.container), window.Tracker && Tracker.calc("TTI-global-nav", new Date - window._to.start)
		})
	}
}), define("alipay/nav/1.2.12/widget/abtest", ["alipay/request/0.9.1/request", "$", "arale/cookie/1.0.2/cookie"], function(b, c, d) {
	var e = b("alipay/request/0.9.1/request"),
		f = b("$"),
		g = window.location.href;
	d.exports = function(b, c) {
		var d = "_ABTEST_TARGET_=([AB])",
			h = window.location.search.match(d) || document.cookie.match(d);
		if (h instanceof Array) return c("A" === h[1] ? "a" : "b"), void 0;
		if (!b.abtestEnabled || "" === b.userName) return c("a"), void 0;
		if (g = (b.pageAbsUrl || g).split("?").shift(), b.abtest && b.abtest.length > 0) {
			var i = "a";
			return f(b.abtest.split(",")).each(function(a, b) {
				return g.indexOf(b) > -1 ? (i = "b", void 0) : void 0
			}), c(i), void 0
		}
		e.ajax({
			url: b.uninavServer + "/nav/getNavData.json",
			dataType: "jsonp",
			jsonp: "_callback",
			timeout: 3e3,
			data: {
				navType: b.abtestType,
				referer: g,
				abtest: !0,
				loadData: !1
			},
			success: function(a) {
				return a.stat && "fail" === a.stat && Tracker && Tracker.click ? (Tracker.click("uninav-abtest-json-fail"), c("a"), void 0) : (c(a.abtestInfo && "B" === a.abtestInfo ? "b" : "a"), void 0)
			},
			error: function(b, d) {
				Tracker && Tracker.click && Tracker.click("uninav-abtest-json-" + d), c(a)
			}
		})
	}
}), define("alipay/request/0.9.1/request", ["$", "arale/cookie/1.0.2/cookie"], function(a, b, c) {
	function d(a) {
		if (a) switch (a.stat) {
			case "deny":
				this.iframe ? parent.location.reload() : location.href = a.target;
				break;
			default:
				this.success && this.success(a)
		}
	}

	function e(a, b, c, d, e) {
		return f.isFunction(c) && (e = e || d, d = c, c = void 0), this.ajax({
			url: b,
			type: a,
			dataType: e,
			data: c,
			success: d
		})
	}
	var f = a("$"),
		g = a("arale/cookie/1.0.2/cookie"),
		h = {
			iframe: !1,
			jsonp: "_callback"
		},
		i = {
			setup: function(a) {
				a = f.extend({}, h, a);
				var b = {
						_input_charset: "utf-8"
					},
					c = g.get("ctoken");
				c && (b.ctoken = c), a.data = f.extend(b, a.data || {});
				var e = {
					success: a.success,
					iframe: a.iframe
				};
				return a.success = function(a) {
					d.call(e, a)
				}, a
			},
			ajax: function(a, b) {
				return "object" == typeof a && (b = a, a = void 0), b = this.setup(b || {}), f.ajax(a, b)
			},
			get: function(a, b, c, d) {
				return e.call(this, "get", a, b, c, d)
			},
			post: function(a, b, c, d) {
				return e.call(this, "post", a, b, c, d)
			}
		};
	c.exports = i
}), define("arale/cookie/1.0.2/cookie", [], function(a, b) {
	function c(a, b) {
		var c = {};
		if (d(a) && a.length > 0)
			for (var e, f, h, j = b ? i : g, k = a.split(/;\s/g), l = 0, m = k.length; m > l; l++) {
				if (h = k[l].match(/([^=]+)=/i), h instanceof Array) try {
					e = i(h[1]), f = j(k[l].substring(h[1].length + 1))
				} catch (n) {} else e = i(k[l]), f = "";
				e && (c[e] = f)
			}
		return c
	}

	function d(a) {
		return "string" == typeof a
	}

	function e(a) {
		return d(a) && "" !== a
	}

	function f(a) {
		if (!e(a)) throw new TypeError("Cookie name must be a non-empty string")
	}

	function g(a) {
		return a
	}
	var h = b,
		i = decodeURIComponent,
		j = encodeURIComponent;
	h.get = function(a, b) {
		f(a), b = "function" == typeof b ? {
			converter: b
		} : b || {};
		var d = c(document.cookie, !b.raw);
		return (b.converter || g)(d[a])
	}, h.set = function(a, b, c) {
		f(a), c = c || {};
		var d = c.expires,
			g = c.domain,
			h = c.path;
		c.raw || (b = j(b + ""));
		var i = a + "=" + b,
			k = d;
		return "number" == typeof k && (k = new Date, k.setDate(k.getDate() + d)), k instanceof Date && (i += "; expires=" + k.toUTCString()), e(g) && (i += "; domain=" + g), e(h) && (i += "; path=" + h), c.secure && (i += "; secure"), document.cookie = i, i
	}, h.remove = function(a, b) {
		return b = b || {}, b.expires = new Date(0), this.set(a, "", b)
	}
}), define("alipay/nav/1.2.12/component/top", ["arale/popup/1.1.5/popup", "$", "arale/overlay/1.1.3/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "alipay/nav/1.2.12/widget/component", "arale/templatable/0.9.2/templatable", "gallery/handlebars/1.0.2/handlebars", "alipay/message-panel/1.0.2/message-panel", "gallery/handlebars/1.0.2/runtime", "alipay/nav/1.2.12/widget/account", "alipay/request/0.9.1/request", "arale/cookie/1.0.2/cookie"], function(a, b) {
	var c = a("arale/popup/1.1.5/popup"),
		d = a("alipay/nav/1.2.12/widget/component"),
		e = a("alipay/message-panel/1.0.2/message-panel"),
		f = a("alipay/nav/1.2.12/widget/account"),
		g = a("alipay/nav/1.2.12/tpl/component-top.tpl"),
		h = a("alipay/nav/1.2.12/tpl/widget-help.tpl"),
		i = a("alipay/nav/1.2.12/tpl/widget-more.tpl"),
		j = a("alipay/nav/1.2.12/tpl/widget-account.tpl");
	b.a = function(a) {
		return new k({
			className: "global-top-a",
			model: a
		}).after("appendTo", function() {
			this.initMessage(), this.initHelp(), this.initAccount(), this.initMore()
		}).render()
	}, b.b = function(a) {
		var c = b.a(a);
		return c.element.removeClass("global-top-a").addClass("global-top-b"), c
	};
	var k = d.extend({
		attrs: {
			template: g
		},
		render: function() {
			var a = this.get("model");
			return a.showOtherLogin = a.showTaobaoLogin || a.showAlibabaLogin, a.showSwitch = a.showMerchant || a.showPersonal, a.showOtherLoginLast = a.showOtherLogin && !a.showSwitch, a.showSwitchLast = a.showMerchant || a.showPersonal, a.showMobileLast = !a.showOtherLogin && !a.showSwitch, a.portraitPath = a.portraitPath ? a.tfsImageServer + a.portraitPath : "", this.set("model", a), k.superclass.render.call(this)
		},
		initMessage: function() {
			var a = this,
				b = this.get("model");
			if (b.isLogin && b.msgSwitch && "N" !== b.needLoadMsg && !b.msgHide) {
				var c = new e({
					trigger: a.find("#globalMsg"),
					personalServer: b.personalServer,
					couriercoreServer: b.couriercoreServer,
					align: {
						baseElement: ".global-top-right",
						selfXY: ["100%", 0],
						baseXY: ["100%+10", "100%"]
					}
				});
				c.on("messageChange", function(b) {
					var c;
					c = b.total > 99 ? "99+" : b.total <= 0 ? "" : b.total, a.find("#globalMsg .global-msg-count").html(c), a.find("#globalMsg")[b.unread ? "addClass" : "removeClass"]("global-msg-active"), a.find("#globalMsg a")[b.unread ? "addClass" : "removeClass"]("message-clock-animate")
				})
			}
		},
		initHelp: function() {
			new c({
				trigger: this.find("#globalHelp"),
				parentNode: this.element,
				width: "140px",
				effect: "fade",
				duration: 150,
				beforeShow: function() {
					this.get("trigger").addClass("global-top-item-hover")
				},
				afterHide: function() {
					this.get("trigger").removeClass("global-top-item-hover")
				},
				template: h,
				align: {
					baseXY: ["100%", "100%"],
					selfXY: ["100%", 0]
				}
			})
		},
		initAccount: function() {
			new f({
				trigger: this.find("#globalUser"),
				parentNode: this.element,
				width: "230px",
				effect: "fade",
				duration: 150,
				zIndex: 100,
				beforeShow: function() {
					this.get("trigger").addClass("global-top-item-hover")
				},
				afterHide: function() {
					this.get("trigger").removeClass("global-top-item-hover")
				},
				template: j,
				model: this.get("model"),
				align: {
					baseXY: ["100%", "100%"],
					selfXY: ["100%", 0]
				}
			})
		},
		initMore: function() {
			new c({
				trigger: this.find("#globalMore"),
				parentNode: this.element,
				width: "140px",
				effect: "fade",
				duration: 150,
				beforeShow: function() {
					this.get("trigger").addClass("global-top-item-hover")
				},
				afterHide: function() {
					this.get("trigger").removeClass("global-top-item-hover")
				},
				template: i,
				align: {
					baseXY: ["100%", "100%"],
					selfXY: ["100%", 0]
				}
			})
		}
	})
}), define("arale/popup/1.1.5/popup", ["$", "arale/overlay/1.1.3/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events"], function(a, b, c) {
	function d(a, b, c, d, e) {
		var f = d && d[0];
		e.delegateEvents(f ? d : b, f ? a + " " + b.selector : a, function(a) {
			c.call(a.currentTarget, a)
		})
	}
	var e = a("$"),
		f = a("arale/overlay/1.1.3/overlay"),
		g = f.extend({
			attrs: {
				trigger: {
					value: null,
					getter: function(a) {
						return e(a)
					}
				},
				triggerType: "hover",
				delegateNode: {
					value: null,
					getter: function(a) {
						return e(a)
					}
				},
				align: {
					value: {
						baseXY: [0, "100%"],
						selfXY: [0, 0]
					},
					setter: function(a) {
						return a ? (a.baseElement ? this._specifiedBaseElement = !0 : this.activeTrigger && (a.baseElement = this.activeTrigger), a) : void 0
					},
					getter: function(a) {
						return e.extend({}, a, this._specifiedBaseElement ? {} : {
							baseElement: this.activeTrigger
						})
					}
				},
				delay: 70,
				disabled: !1,
				effect: "",
				duration: 250
			},
			setup: function() {
				g.superclass.setup.call(this), this._bindTrigger(), this._blurHide(this.get("trigger")), this.activeTrigger = this.get("trigger").eq(0);
				var a = this;
				this.get("delegateNode") && this.before("show", function() {
					a._relativeElements = a.get("trigger"), a._relativeElements.push(a.element)
				})
			},
			render: function() {
				return g.superclass.render.call(this), this.element.hide(), this
			},
			show: function() {
				return this.get("disabled") ? void 0 : g.superclass.show.call(this)
			},
			hide: function(a) {
				return a ? this : g.superclass.hide.call(this)
			},
			_bindTrigger: function() {
				var a = this.get("triggerType");
				"click" === a ? this._bindClick() : "focus" === a ? this._bindFocus() : this._bindHover()
			},
			_bindClick: function() {
				function a(a) {
					b.get("disabled") || b.get("trigger").each(function(c, d) {
						a == d ? (d._active = !0, b.activeTrigger = e(d)) : d._active = !1
					})
				}
				var b = this;
				d("click", this.get("trigger"), function() {
					this._active === !0 ? b.hide() : (a(this), b.show())
				}, this.get("delegateNode"), this), this.before("hide", function() {
					a()
				})
			},
			_bindFocus: function() {
				var a = this;
				d("focus", this.get("trigger"), function() {
					a.activeTrigger = e(this), a.show()
				}, this.get("delegateNode"), this), d("blur", this.get("trigger"), function() {
					setTimeout(function() {
						!a._downOnElement && a.hide(), a._downOnElement = !1
					}, a.get("delay"))
				}, this.get("delegateNode"), this), this.delegateEvents("mousedown", function() {
					this._downOnElement = !0
				})
			},
			_bindHover: function() {
				function a() {
					clearTimeout(b), b = null, i.get("visible") && (c = setTimeout(function() {
						i.hide()
					}, h))
				}
				var b, c, f = this.get("trigger"),
					g = this.get("delegateNode"),
					h = this.get("delay"),
					i = this;
				return 0 > h ? (this._bindTooltip(), void 0) : (d("mouseenter", f, function() {
					clearTimeout(c), c = null, i.activeTrigger = e(this), b = setTimeout(function() {
						i.show()
					}, h)
				}, g, this), d("mouseleave", f, a, g, this), this.delegateEvents("mouseenter", function() {
					clearTimeout(c)
				}), this.delegateEvents("mouseleave", a), void 0)
			},
			_bindTooltip: function() {
				var a = this.get("trigger"),
					b = this.get("delegateNode"),
					c = this;
				d("mouseenter", a, function() {
					c.activeTrigger = e(this), c.show()
				}, b, this), d("mouseleave", a, function() {
					c.hide()
				}, b, this)
			},
			_onRenderVisible: function(a, b) {
				if (a !== !!b) {
					var c = -1 !== this.get("effect").indexOf("fade"),
						d = -1 !== this.get("effect").indexOf("slide"),
						e = {};
					d && (e.height = a ? "show" : "hide"), c && (e.opacity = a ? "show" : "hide");
					var f = this,
						g = a ? function() {
							f.trigger("animated")
						} : function() {
							f.hide(!0), f.trigger("animated")
						};
					c || d ? this.element.stop(!0, !0).animate(e, this.get("duration"), g).css({
						visibility: "visible"
					}) : this.element[a ? "show" : "hide"]()
				}
			}
		});
	c.exports = g
}), define("arale/overlay/1.1.3/overlay", ["$", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events"], function(a, b, c) {
	function d(a) {
		return g.contains(document.documentElement, a)
	}

	function e(a) {
		g(k.blurOverlays).each(function(b, c) {
			if (c && c.get("visible")) {
				for (var d = 0; d < c._relativeElements.length; d++) {
					var e = g(c._relativeElements[d])[0];
					if (e === a.target || g.contains(e, a.target)) return
				}
				c.hide()
			}
		})
	}

	function f(a, b) {
		for (var c = 0; c < b.length; c++)
			if (a === b[c]) return b.splice(c, 1), b
	}
	var g = a("$"),
		h = a("arale/position/1.0.1/position"),
		i = a("arale/iframe-shim/1.0.2/iframe-shim"),
		j = a("arale/widget/1.1.1/widget"),
		k = j.extend({
			attrs: {
				width: null,
				height: null,
				zIndex: 99,
				visible: !1,
				align: {
					selfXY: [0, 0],
					baseElement: h.VIEWPORT,
					baseXY: [0, 0]
				},
				parentNode: document.body
			},
			show: function() {
				return this.rendered || this.render(), this.set("visible", !0), this
			},
			hide: function() {
				return this.set("visible", !1), this
			},
			setup: function() {
				var a = this;
				this._setupShim(), this._setupResize(), this.after("show", function() {
					a._setPosition()
				})
			},
			destroy: function() {
				return f(this, k.allOverlays), f(this, k.blurOverlays), k.superclass.destroy.call(this)
			},
			_setPosition: function(a) {
				if (d(this.element[0]) && (a || (a = this.get("align")), a)) {
					var b = "none" === this.element.css("display");
					return b && this.element.css({
						visibility: "hidden",
						display: "block"
					}), h.pin({
						element: this.element,
						x: a.selfXY[0],
						y: a.selfXY[1]
					}, {
						element: a.baseElement,
						x: a.baseXY[0],
						y: a.baseXY[1]
					}), b && this.element.css({
						visibility: "",
						display: "none"
					}), this
				}
			},
			_setupShim: function() {
				var a = new i(this.element);
				this.after("hide _setPosition", a.sync, a);
				var b = ["width", "height"];
				for (var c in b) b.hasOwnProperty(c) && this.on("change:" + c, a.sync, a);
				this.before("destroy", a.destroy, a)
			},
			_setupResize: function() {
				k.allOverlays.push(this)
			},
			_blurHide: function(a) {
				a = g.makeArray(a), a.push(this.element), this._relativeElements = a, k.blurOverlays.push(this)
			},
			_onRenderWidth: function(a) {
				this.element.css("width", a)
			},
			_onRenderHeight: function(a) {
				this.element.css("height", a)
			},
			_onRenderZIndex: function(a) {
				this.element.css("zIndex", a)
			},
			_onRenderAlign: function(a) {
				this._setPosition(a)
			},
			_onRenderVisible: function(a) {
				this.element[a ? "show" : "hide"]()
			}
		});
	k.blurOverlays = [], g(document).on("click", function(a) {
		e(a)
	});
	var l, m = g(window).width(),
		n = g(window).height();
	k.allOverlays = [], g(window).resize(function() {
		l && clearTimeout(l), l = setTimeout(function() {
			var a = g(window).width(),
				b = g(window).height();
			(m !== a || n !== b) && g(k.allOverlays).each(function(a, b) {
				b && b.get("visible") && b._setPosition()
			}), m = a, n = b
		}, 80)
	}), c.exports = k
}), define("arale/position/1.0.1/position", ["$"], function(a, b) {
	function c(a) {
		a = h(a) || {}, a.nodeType && (a = {
			element: a
		});
		var b = h(a.element) || k;
		if (1 !== b.nodeType) throw new Error("posObject.element is invalid.");
		var c = {
				element: b,
				x: a.x || 0,
				y: a.y || 0
			},
			d = b === k || "VIEWPORT" === b._id;
		return c.offset = function() {
			return m ? {
				left: 0,
				top: 0
			} : d ? {
				left: l(document).scrollLeft(),
				top: l(document).scrollTop()
			} : i(l(b)[0])
		}, c.size = function() {
			var a = d ? l(window) : l(b);
			return {
				width: a.outerWidth(),
				height: a.outerHeight()
			}
		}, c
	}

	function d(a) {
		a.x = e(a.x, a, "width"), a.y = e(a.y, a, "height")
	}

	function e(a, b, c) {
		if (a += "", a = a.replace(/px/gi, ""), /\D/.test(a) && (a = a.replace(/(?:top|left)/gi, "0%").replace(/center/gi, "50%").replace(/(?:bottom|right)/gi, "100%")), -1 !== a.indexOf("%") && (a = a.replace(/(\d+(?:\.\d+)?)%/gi, function(a, d) {
			return b.size()[c] * (d / 100)
		})), /[+\-*\/]/.test(a)) try {
			a = new Function("return " + a)()
		} catch (d) {
			throw new Error("Invalid position value: " + a)
		}
		return g(a)
	}

	function f(a) {
		var b = a.offsetParent();
		b[0] === document.documentElement && (b = l(document.body)), o && b.css("zoom", 1);
		var c;
		return c = b[0] === document.body && "static" === b.css("position") ? {
			top: 0,
			left: 0
		} : i(b[0]), c.top += g(b.css("border-top-width")), c.left += g(b.css("border-left-width")), c
	}

	function g(a) {
		return parseFloat(a, 10) || 0
	}

	function h(a) {
		return l(a)[0]
	}

	function i(a) {
		var b = a.getBoundingClientRect(),
			c = document.documentElement;
		return {
			left: b.left + (window.pageXOffset || c.scrollLeft) - (c.clientLeft || document.body.clientLeft || 0),
			top: b.top + (window.pageYOffset || c.scrollTop) - (c.clientTop || document.body.clientTop || 0)
		}
	}
	var j = b,
		k = {
			_id: "VIEWPORT",
			nodeType: 1
		},
		l = a("$"),
		m = !1,
		n = (window.navigator.userAgent || "").toLowerCase(),
		o = -1 !== n.indexOf("msie 6");
	j.pin = function(a, b) {
		a = c(a), b = c(b);
		var e = l(a.element);
		"fixed" !== e.css("position") || o ? (e.css("position", "absolute"), m = !1) : m = !0, d(a), d(b);
		var g = f(e),
			h = b.offset(),
			i = h.top + b.y - a.y - g.top,
			j = h.left + b.x - a.x - g.left;
		e.css({
			left: j,
			top: i
		})
	}, j.center = function(a, b) {
		j.pin({
			element: a,
			x: "50%",
			y: "50%"
		}, {
			element: b,
			x: "50%",
			y: "50%"
		})
	}, j.VIEWPORT = k
}), define("arale/iframe-shim/1.0.2/iframe-shim", ["$", "arale/position/1.0.1/position"], function(a, b, c) {
	function d(a) {
		this.target = g(a).eq(0)
	}

	function e() {}

	function f(a) {
		var b = {
				display: "none",
				border: "none",
				opacity: 0,
				position: "absolute"
			},
			c = a.css("zIndex");
		return c && c > 0 && (b.zIndex = c - 1), g("<iframe>", {
			src: "javascript:''",
			frameborder: 0,
			css: b
		}).insertBefore(a)
	}
	var g = a("$"),
		h = a("arale/position/1.0.1/position"),
		i = -1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie 6");
	d.prototype.sync = function() {
		var a = this.target,
			b = this.iframe;
		if (!a.length) return this;
		var c = a.outerHeight(),
			d = a.outerWidth();
		return c && d && !a.is(":hidden") ? (b || (b = this.iframe = f(a)), b.css({
			height: c,
			width: d
		}), h.pin(b[0], a[0]), b.show()) : b && b.hide(), this
	}, d.prototype.destroy = function() {
		this.iframe && (this.iframe.remove(), delete this.iframe), delete this.target
	}, i ? c.exports = d : (e.prototype.sync = function() {
		return this
	}, e.prototype.destroy = e, c.exports = e)
}), define("arale/widget/1.1.1/widget", ["arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "$", "./daparser", "./auto-render"], function(a, b, c) {
	function d() {
		return "widget-" + w++
	}

	function e(a) {
		return "[object String]" === v.call(a)
	}

	function f(a) {
		return "[object Function]" === v.call(a)
	}

	function g(a) {
		return x(document.documentElement, a)
	}

	function h(a) {
		return a.charAt(0).toUpperCase() + a.substring(1)
	}

	function i(a) {
		return f(a.events) && (a.events = a.events()), a.events
	}

	function j(a, b) {
		var c = a.match(y),
			d = c[1] + q + b.cid,
			e = c[2] || void 0;
		return e && e.indexOf("{{") > -1 && (e = k(e, b)), {
			type: d,
			selector: e
		}
	}

	function k(a, b) {
		return a.replace(z, function(a, c) {
			for (var d, f = c.split("."), g = b; d = f.shift();) g = g === b.attrs ? b.get(d) : g[d];
			return e(g) ? g : A
		})
	}

	function l(a) {
		return null == a || void 0 === a
	}
	var m = a("arale/base/1.1.1/base"),
		n = a("$"),
		o = a("./daparser"),
		p = a("./auto-render"),
		q = ".delegate-events-",
		r = "_onRender",
		s = "data-widget-cid",
		t = {},
		u = m.extend({
			propsInAttrs: ["initElement", "element", "events"],
			element: null,
			events: null,
			attrs: {
				id: null,
				className: null,
				style: null,
				template: "<div></div>",
				model: null,
				parentNode: document.body
			},
			initialize: function(a) {
				this.cid = d();
				var b = this._parseDataAttrsConfig(a);
				u.superclass.initialize.call(this, a ? n.extend(b, a) : b), this.parseElement(), this.initProps(), this.delegateEvents(), this.setup(), this._stamp(), this._isTemplate = !(a && a.element)
			},
			_parseDataAttrsConfig: function(a) {
				var b, c;
				return a && (b = a.initElement ? n(a.initElement) : n(a.element)), b && b[0] && !p.isDataApiOff(b) && (c = o.parseElement(b)), c
			},
			parseElement: function() {
				var a = this.element;
				if (a ? this.element = n(a) : this.get("template") && this.parseElementFromTemplate(), !this.element || !this.element[0]) throw new Error("element is invalid")
			},
			parseElementFromTemplate: function() {
				this.element = n(this.get("template"))
			},
			initProps: function() {},
			delegateEvents: function(a, b, c) {
				if (0 === arguments.length ? (b = i(this), a = this.element) : 1 === arguments.length ? (b = a, a = this.element) : 2 === arguments.length ? (c = b, b = a, a = this.element) : (a || (a = this.element), this._delegateElements || (this._delegateElements = []), this._delegateElements.push(n(a))), e(b) && f(c)) {
					var d = {};
					d[b] = c, b = d
				}
				for (var g in b)
					if (b.hasOwnProperty(g)) {
						var h = j(g, this),
							k = h.type,
							l = h.selector;
						! function(b, c) {
							var d = function(a) {
								f(b) ? b.call(c, a) : c[b](a)
							};
							l ? n(a).on(k, l, d) : n(a).on(k, d)
						}(b[g], this)
					}
				return this
			},
			undelegateEvents: function(a, b) {
				if (b || (b = a, a = null), 0 === arguments.length) {
					var c = q + this.cid;
					if (this.element && this.element.off(c), this._delegateElements)
						for (var d in this._delegateElements) this._delegateElements.hasOwnProperty(d) && this._delegateElements[d].off(c)
				} else {
					var e = j(b, this);
					a ? n(a).off(e.type, e.selector) : this.element && this.element.off(e.type, e.selector)
				}
				return this
			},
			setup: function() {},
			render: function() {
				this.rendered || (this._renderAndBindAttrs(), this.rendered = !0);
				var a = this.get("parentNode");
				if (a && !g(this.element[0])) {
					var b = this.constructor.outerBoxClass;
					if (b) {
						var c = this._outerBox = n("<div></div>").addClass(b);
						c.append(this.element).appendTo(a)
					} else this.element.appendTo(a)
				}
				return this
			},
			_renderAndBindAttrs: function() {
				var a = this,
					b = a.attrs;
				for (var c in b)
					if (b.hasOwnProperty(c)) {
						var d = r + h(c);
						if (this[d]) {
							var e = this.get(c);
							l(e) || this[d](e, void 0, c),
							function(b) {
								a.on("change:" + c, function(c, d, e) {
									a[b](c, d, e)
								})
							}(d)
						}
					}
			},
			_onRenderId: function(a) {
				this.element.attr("id", a)
			},
			_onRenderClassName: function(a) {
				this.element.addClass(a)
			},
			_onRenderStyle: function(a) {
				this.element.css(a)
			},
			_stamp: function() {
				var a = this.cid;
				(this.initElement || this.element).attr(s, a), t[a] = this
			},
			$: function(a) {
				return this.element.find(a)
			},
			destroy: function() {
				this.undelegateEvents(), delete t[this.cid], this.element && this._isTemplate && (this.element.off(), this._outerBox ? this._outerBox.remove() : this.element.remove()), this.element = null, u.superclass.destroy.call(this)
			}
		});
	n(window).unload(function() {
		for (var a in t) t[a].destroy()
	}), u.query = function(a) {
		var b, c = n(a).eq(0);
		return c && (b = c.attr(s)), t[b]
	}, u.autoRender = p.autoRender, u.autoRenderAll = p.autoRenderAll, u.StaticsWhiteList = ["autoRender"], c.exports = u;
	var v = Object.prototype.toString,
		w = 0,
		x = n.contains || function(a, b) {
			return !!(16 & a.compareDocumentPosition(b))
		},
		y = /^(\S+)\s*(.*)$/,
		z = /{{([^}]+)}}/g,
		A = "INVALID_SELECTOR"
}), define("arale/widget/1.1.1/daparser", ["$"], function(a, b) {
	function c(a) {
		return a.toLowerCase().replace(g, function(a, b) {
			return (b + "").toUpperCase()
		})
	}

	function d(a) {
		for (var b in a)
			if (a.hasOwnProperty(b)) {
				var c = a[b];
				if ("string" != typeof c) continue;
				h.test(c) ? (c = c.replace(/'/g, '"'), a[b] = d(i(c))) : a[b] = e(c)
			}
		return a
	}

	function e(a) {
		if ("false" === a.toLowerCase()) a = !1;
		else if ("true" === a.toLowerCase()) a = !0;
		else if (/\d/.test(a) && /[^a-z]/i.test(a)) {
			var b = parseFloat(a);
			b + "" === a && (a = b)
		}
		return a
	}
	var f = a("$");
	b.parseElement = function(a, b) {
		a = f(a)[0];
		var e = {};
		if (a.dataset) e = f.extend({}, a.dataset);
		else
			for (var g = a.attributes, h = 0, i = g.length; i > h; h++) {
				var j = g[h],
					k = j.name;
				0 === k.indexOf("data-") && (k = c(k.substring(5)), e[k] = j.value)
			}
		return b === !0 ? e : d(e)
	};
	var g = /-([a-z])/g,
		h = /^\s*[\[{].*[\]}]\s*$/,
		i = this.JSON ? JSON.parse : f.parseJSON
}), define("arale/widget/1.1.1/auto-render", ["$"], function(a, b) {
	var c = a("$"),
		d = "data-widget-auto-rendered";
	b.autoRender = function(a) {
		return new this(a).render()
	}, b.autoRenderAll = function(a, e) {
		"function" == typeof a && (e = a, a = null), a = c(a || document.body);
		var f = [],
			g = [];
		a.find("[data-widget]").each(function(a, c) {
			b.isDataApiOff(c) || (f.push(c.getAttribute("data-widget").toLowerCase()), g.push(c))
		}), f.length && seajs.use(f, function() {
			for (var a = 0; a < arguments.length; a++) {
				var b = arguments[a],
					f = c(g[a]);
				if (!f.attr(d)) {
					var h = {
							initElement: f,
							renderType: "auto"
						},
						i = f.attr("data-widget-role");
					h[i ? i : "element"] = f, b.autoRender && b.autoRender(h), f.attr(d, "true")
				}
			}
			e && e()
		})
	};
	var e = "off" === c(document.body).attr("data-api");
	b.isDataApiOff = function(a) {
		var b = c(a).attr("data-api");
		return "off" === b || "on" !== b && e
	}
}), define("arale/base/1.1.1/base", ["arale/class/1.1.0/class", "arale/events/1.1.0/events", "./aspect", "./attribute"], function(a, b, c) {
	function d(a, b) {
		for (var c in b)
			if (b.hasOwnProperty(c)) {
				var d = "_onChange" + e(c);
				a[d] && a.on("change:" + c, a[d])
			}
	}

	function e(a) {
		return a.charAt(0).toUpperCase() + a.substring(1)
	}
	var f = a("arale/class/1.1.0/class"),
		g = a("arale/events/1.1.0/events"),
		h = a("./aspect"),
		i = a("./attribute");
	c.exports = f.create({
		Implements: [g, h, i],
		initialize: function(a) {
			this.initAttrs(a), d(this, this.attrs)
		},
		destroy: function() {
			this.off();
			for (var a in this) this.hasOwnProperty(a) && delete this[a];
			this.destroy = function() {}
		}
	})
}), define("arale/base/1.1.1/aspect", [], function(a, b) {
	function c(a, b, c, g) {
		for (var h, i, j = b.split(f); h = j.shift();) i = d(this, h), i.__isAspected || e.call(this, h), this.on(a + ":" + h, c, g);
		return this
	}

	function d(a, b) {
		var c = a[b];
		if (!c) throw new Error("Invalid method name: " + b);
		return c
	}

	function e(a) {
		var b = this[a];
		this[a] = function() {
			var c = Array.prototype.slice.call(arguments),
				d = ["before:" + a].concat(c);
			if (this.trigger.apply(this, d) !== !1) {
				var e = b.apply(this, arguments),
					f = ["after:" + a, e].concat(c);
				return this.trigger.apply(this, f), e
			}
		}, this[a].__isAspected = !0
	}
	b.before = function(a, b, d) {
		return c.call(this, "before", a, b, d)
	}, b.after = function(a, b, d) {
		return c.call(this, "after", a, b, d)
	};
	var f = /\s+/
}), define("arale/base/1.1.1/attribute", [], function(a, b) {
	function c(a) {
		return "[object String]" === t.call(a)
	}

	function d(a) {
		return "[object Function]" === t.call(a)
	}

	function e(a) {
		return null != a && a == a.window
	}

	function f(a) {
		if (!a || "[object Object]" !== t.call(a) || a.nodeType || e(a)) return !1;
		try {
			if (a.constructor && !u.call(a, "constructor") && !u.call(a.constructor.prototype, "isPrototypeOf")) return !1
		} catch (b) {
			return !1
		}
		var c;
		if (s)
			for (c in a) return u.call(a, c);
		for (c in a);
		return void 0 === c || u.call(a, c)
	}

	function g(a) {
		if (!a || "[object Object]" !== t.call(a) || a.nodeType || e(a) || !a.hasOwnProperty) return !1;
		for (var b in a)
			if (a.hasOwnProperty(b)) return !1;
		return !0
	}

	function h(a, b) {
		var c, d;
		for (c in b)
			if (b.hasOwnProperty(c)) {
				if (d = b[c], v(d)) d = d.slice();
				else if (f(d)) {
					var e = a[c];
					f(e) || (e = {}), d = h(e, d)
				}
				a[c] = d
			}
		return a
	}

	function i(a, b, c) {
		for (var d = [], e = b.constructor.prototype; e;) e.hasOwnProperty("attrs") || (e.attrs = {}), k(c, e.attrs, e), g(e.attrs) || d.unshift(e.attrs), e = e.constructor.superclass;
		for (var f = 0, i = d.length; i > f; f++) h(a, o(d[f]))
	}

	function j(a, b) {
		h(a, o(b, !0))
	}

	function k(a, b, c, d) {
		for (var e = 0, f = a.length; f > e; e++) {
			var g = a[e];
			c.hasOwnProperty(g) && (b[g] = d ? b.get(g) : c[g])
		}
	}

	function l(a, b) {
		for (var c in b)
			if (b.hasOwnProperty(c)) {
				var e, f = b[c].value;
				d(f) && (e = c.match(x)) && (a[e[1]](m(e[2]), f), delete b[c])
			}
	}

	function m(a) {
		var b = a.match(y),
			c = b[1] ? "change:" : "";
		return c += b[2].toLowerCase() + b[3]
	}

	function n(a, b, c) {
		var d = {
			silent: !0
		};
		a.__initializingAttrs = !0;
		for (var e in c) c.hasOwnProperty(e) && b[e].setter && a.set(e, c[e], d);
		delete a.__initializingAttrs
	}

	function o(a, b) {
		var c = {};
		for (var d in a) {
			var e = a[d];
			c[d] = !b && f(e) && p(e, z) ? e : {
				value: e
			}
		}
		return c
	}

	function p(a, b) {
		for (var c = 0, d = b.length; d > c; c++)
			if (a.hasOwnProperty(b[c])) return !0;
		return !1
	}

	function q(a) {
		return null == a || (c(a) || v(a)) && 0 === a.length || g(a)
	}

	function r(a, b) {
		if (a === b) return !0;
		if (q(a) && q(b)) return !0;
		var c = t.call(a);
		if (c != t.call(b)) return !1;
		switch (c) {
			case "[object String]":
				return a == String(b);
			case "[object Number]":
				return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
			case "[object Date]":
			case "[object Boolean]":
				return +a == +b;
			case "[object RegExp]":
				return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
			case "[object Array]":
				var d = a.toString(),
					e = b.toString();
				return -1 === d.indexOf("[object") && -1 === e.indexOf("[object") && d === e
		}
		if ("object" != typeof a || "object" != typeof b) return !1;
		if (f(a) && f(b)) {
			if (!r(w(a), w(b))) return !1;
			for (var g in a)
				if (a[g] !== b[g]) return !1;
			return !0
		}
		return !1
	}
	b.initAttrs = function(a) {
		var b = this.attrs = {},
			c = this.propsInAttrs || [];
		i(b, this, c), a && j(b, a), n(this, b, a), l(this, b), k(c, this, b, !0)
	}, b.get = function(a) {
		var b = this.attrs[a] || {},
			c = b.value;
		return b.getter ? b.getter.call(this, c, a) : c
	}, b.set = function(a, b, d) {
		var e = {};
		c(a) ? e[a] = b : (e = a, d = b), d || (d = {});
		var g = d.silent,
			i = d.override,
			j = this.attrs,
			k = this.__changedAttrs || (this.__changedAttrs = {});
		for (a in e)
			if (e.hasOwnProperty(a)) {
				var l = j[a] || (j[a] = {});
				if (b = e[a], l.readOnly) throw new Error("This attribute is readOnly: " + a);
				l.setter && (b = l.setter.call(this, b, a));
				var m = this.get(a);
				!i && f(m) && f(b) && (b = h(h({}, m), b)), j[a].value = b, this.__initializingAttrs || r(m, b) || (g ? k[a] = [b, m] : this.trigger("change:" + a, b, m, a))
			}
		return this
	}, b.change = function() {
		var a = this.__changedAttrs;
		if (a) {
			for (var b in a)
				if (a.hasOwnProperty(b)) {
					var c = a[b];
					this.trigger("change:" + b, c[0], c[1], b)
				}
			delete this.__changedAttrs
		}
		return this
	}, b._isPlainObject = f;
	var s, t = Object.prototype.toString,
		u = Object.prototype.hasOwnProperty;
	! function() {
		function a() {
			this.x = 1
		}
		var b = [];
		a.prototype = {
			valueOf: 1,
			y: 1
		};
		for (var c in new a) b.push(c);
		s = "x" !== b[0]
	}();
	var v = Array.isArray || function(a) {
			return "[object Array]" === t.call(a)
		},
		w = Object.keys;
	w || (w = function(a) {
		var b = [];
		for (var c in a) a.hasOwnProperty(c) && b.push(c);
		return b
	});
	var x = /^(on|before|after)([A-Z].*)$/,
		y = /^(Change)?([A-Z])(.*)/,
		z = ["value", "getter", "setter", "readOnly"]
}), define("arale/class/1.1.0/class", [], function(a, b, c) {
	function d(a) {
		return this instanceof d || !l(a) ? void 0 : f(a)
	}

	function e(a) {
		var b, c;
		for (b in a) c = a[b], d.Mutators.hasOwnProperty(b) ? d.Mutators[b].call(this, c) : this.prototype[b] = c
	}

	function f(a) {
		return a.extend = d.extend, a.implement = e, a
	}

	function g() {}

	function h(a, b, c) {
		for (var d in b)
			if (b.hasOwnProperty(d)) {
				if (c && -1 === m(c, d)) continue;
				"prototype" !== d && (a[d] = b[d])
			}
	}
	c.exports = d, d.create = function(a, b) {
		function c() {
			a.apply(this, arguments), this.constructor === c && this.initialize && this.initialize.apply(this, arguments)
		}
		return l(a) || (b = a, a = null), b || (b = {}), a || (a = b.Extends || d), b.Extends = a, a !== d && h(c, a, a.StaticsWhiteList), e.call(c, b), f(c)
	}, d.extend = function(a) {
		return a || (a = {}), a.Extends = this, d.create(a)
	}, d.Mutators = {
		Extends: function(a) {
			var b = this.prototype,
				c = i(a.prototype);
			h(c, b), c.constructor = this, this.prototype = c, this.superclass = a.prototype
		},
		Implements: function(a) {
			k(a) || (a = [a]);
			for (var b, c = this.prototype; b = a.shift();) h(c, b.prototype || b)
		},
		Statics: function(a) {
			h(this, a)
		}
	};
	var i = Object.__proto__ ? function(a) {
			return {
				__proto__: a
			}
		} : function(a) {
			return g.prototype = a, new g
		},
		j = Object.prototype.toString,
		k = Array.isArray || function(a) {
			return "[object Array]" === j.call(a)
		},
		l = function(a) {
			return "[object Function]" === j.call(a)
		},
		m = Array.prototype.indexOf ? function(a, b) {
			return a.indexOf(b)
		} : function(a, b) {
			for (var c = 0, d = a.length; d > c; c++)
				if (a[c] === b) return c;
			return -1
		}
}), define("arale/events/1.1.0/events", [], function() {
	function a() {}

	function b(a, b, c, d) {
		var e;
		if (a)
			for (var f = 0, g = a.length; g > f; f += 2) e = a[f].apply(a[f + 1] || c, b), e === !1 && d.status && (d.status = !1)
	}
	var c = /\s+/;
	a.prototype.on = function(a, b, d) {
		var e, f, g;
		if (!b) return this;
		for (e = this.__events || (this.__events = {}), a = a.split(c); f = a.shift();) g = e[f] || (e[f] = []), g.push(b, d);
		return this
	}, a.prototype.off = function(a, b, e) {
		var f, g, h, i;
		if (!(f = this.__events)) return this;
		if (!(a || b || e)) return delete this.__events, this;
		for (a = a ? a.split(c) : d(f); g = a.shift();)
			if (h = f[g])
				if (b || e)
					for (i = h.length - 2; i >= 0; i -= 2) b && h[i] !== b || e && h[i + 1] !== e || h.splice(i, 2);
				else delete f[g];
		return this
	}, a.prototype.trigger = function(a) {
		var d, e, f, g, h, i, j = [],
			k = {
				status: !0
			};
		if (!(d = this.__events)) return this;
		for (a = a.split(c), h = 1, i = arguments.length; i > h; h++) j[h - 1] = arguments[h];
		for (; e = a.shift();)(f = d.all) && (f = f.slice()), (g = d[e]) && (g = g.slice()), b(g, j, this, k), b(f, [e].concat(j), this, k);
		return k.status
	}, a.mixTo = function(b) {
		b = b.prototype || b;
		var c = a.prototype;
		for (var d in c) c.hasOwnProperty(d) && (b[d] = c[d])
	};
	var d = Object.keys;
	return d || (d = function(a) {
		var b = [];
		for (var c in a) a.hasOwnProperty(c) && b.push(c);
		return b
	}), a
}), define("alipay/nav/1.2.12/widget/component", ["$", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/templatable/0.9.2/templatable", "gallery/handlebars/1.0.2/handlebars"], function(a, b, c) {
	var d = a("$"),
		e = a("arale/base/1.1.1/base"),
		f = a("arale/templatable/0.9.2/templatable"),
		g = e.extend({
			Implements: f,
			attrs: {
				data: {}
			},
			render: function() {
				var a = this.compile();
				return this.element = d("<div> " + a + "</div>").addClass(this.get("className")), this
			},
			appendTo: function(a) {
				return this.element.appendTo(a), this
			},
			find: function(a) {
				return this.element.find(a)
			}
		});
	c.exports = g
}), define("arale/templatable/0.9.2/templatable", ["$", "gallery/handlebars/1.0.2/handlebars"], function(a, b, c) {
	function d(a) {
		return h(a) ? null : j(f(a))
	}

	function e(a, b) {
		if (a) {
			var c;
			if (b) {
				if (c = a.find(b), 0 === c.length) throw new Error("Invalid template selector: " + b)
			} else c = a;
			return g(c.html())
		}
	}

	function f(a) {
		return a.replace(/({[^}]+}})/g, "<!--$1-->").replace(/\s(src|href)\s*=\s*(['"])(.*?\{.+?)\2/g, " data-templatable-$1=$2$3$2")
	}

	function g(a) {
		return a.replace(/(?:<|&lt;)!--({{[^}]+}})--(?:>|&gt;)/g, "$1").replace(/data-templatable-/gi, "")
	}

	function h(a) {
		return "function" == typeof a
	}

	function i(a) {
		if (!a) return {};
		var b = {};
		for (var c in a) {
			var d = a[c];
			b[c] = h(d) ? d : k.compile(d)
		}
		return b
	}
	var j = a("$"),
		k = a("gallery/handlebars/1.0.2/handlebars"),
		l = {};
	c.exports = {
		templateHelpers: null,
		templatePartials: null,
		templateObject: null,
		parseElementFromTemplate: function() {
			var a, b = this.get("template");
			/^#/.test(b) && (a = document.getElementById(b.substring(1))) && (b = a.innerHTML, this.set("template", b)), this.templateObject = d(b), this.element = j(this.compile())
		},
		compile: function(a, b) {
			if (a || (a = this.get("template")), b || (b = this.get("model")) || (b = {}), b.toJSON && (b = b.toJSON()), h(a)) return a(b, {
				helpers: this.templateHelpers,
				partials: i(this.templatePartials)
			});
			var c, d, e = this.templateHelpers,
				f = this.templatePartials;
			if (e)
				for (c in e) e.hasOwnProperty(c) && k.registerHelper(c, e[c]);
			if (f)
				for (d in f) f.hasOwnProperty(d) && k.registerPartial(d, f[d]);
			var g = l[a];
			g || (g = l[a] = k.compile(a));
			var j = g(b);
			if (e)
				for (c in e) e.hasOwnProperty(c) && delete k.helpers[c];
			if (f)
				for (d in f) f.hasOwnProperty(d) && delete k.partials[d];
			return j
		},
		renderPartial: function(a) {
			if (this.templateObject) {
				var b = e(this.templateObject, a);
				b ? a ? this.$(a).html(this.compile(b)) : this.element.html(this.compile(b)) : this.element.html(this.compile())
			} else {
				var c = j(this.compile()),
					d = c.find(a);
				d.length ? this.$(a).html(d.html()) : this.element.html(c.html())
			}
			return this
		}
	};
	var m = k.compile;
	k.compile = function(a) {
		return h(a) ? a : m.call(k, a)
	}
}), define("gallery/handlebars/1.0.2/handlebars", [], function(a, b, c) {
	var d = {};
	! function(a, b) {
		a.VERSION = "1.0.0-rc.4", a.COMPILER_REVISION = 3, a.REVISION_CHANGES = {
			1: "<= 1.0.rc.2",
			2: "== 1.0.0-rc.3",
			3: ">= 1.0.0-rc.4"
		}, a.helpers = {}, a.partials = {};
		var c = Object.prototype.toString,
			d = "[object Function]",
			e = "[object Object]";
		a.registerHelper = function(b, d, f) {
			if (c.call(b) === e) {
				if (f || d) throw new a.Exception("Arg not supported with multiple helpers");
				a.Utils.extend(this.helpers, b)
			} else f && (d.not = f), this.helpers[b] = d
		}, a.registerPartial = function(b, d) {
			c.call(b) === e ? a.Utils.extend(this.partials, b) : this.partials[b] = d
		}, a.registerHelper("helperMissing", function(a) {
			if (2 === arguments.length) return b;
			throw Error("Could not find property '" + a + "'")
		}), a.registerHelper("blockHelperMissing", function(b, e) {
			var f = e.inverse || function() {},
				g = e.fn,
				h = c.call(b);
			return h === d && (b = b.call(this)), b === !0 ? g(this) : b === !1 || null == b ? f(this) : "[object Array]" === h ? b.length > 0 ? a.helpers.each(b, e) : f(this) : g(b)
		}), a.K = function() {}, a.createFrame = Object.create || function(b) {
			a.K.prototype = b;
			var c = new a.K;
			return a.K.prototype = null, c
		}, a.logger = {
			DEBUG: 0,
			INFO: 1,
			WARN: 2,
			ERROR: 3,
			level: 3,
			methodMap: {
				0: "debug",
				1: "info",
				2: "warn",
				3: "error"
			},
			log: function(b, c) {
				if (b >= a.logger.level) {
					var d = a.logger.methodMap[b];
					"undefined" != typeof console && console[d] && console[d].call(console, c)
				}
			}
		}, a.log = function(b, c) {
			a.logger.log(b, c)
		}, a.registerHelper("each", function(b, c) {
			var d, e = c.fn,
				f = c.inverse,
				g = 0,
				h = "";
			if (c.data && (d = a.createFrame(c.data)), b && "object" == typeof b)
				if (b instanceof Array)
					for (var i = b.length; i > g; g++) d && (d.index = g), h += e(b[g], {
						data: d
					});
				else
					for (var j in b) b.hasOwnProperty(j) && (d && (d.key = j), h += e(b[j], {
						data: d
					}), g++);
			return 0 === g && (h = f(this)), h
		}), a.registerHelper("if", function(b, e) {
			var f = c.call(b);
			return f === d && (b = b.call(this)), !b || a.Utils.isEmpty(b) ? e.inverse(this) : e.fn(this)
		}), a.registerHelper("unless", function(b, c) {
			return a.helpers["if"].call(this, b, {
				fn: c.inverse,
				inverse: c.fn
			})
		}), a.registerHelper("with", function(c, d) {
			return a.Utils.isEmpty(c) ? b : d.fn(c)
		}), a.registerHelper("log", function(b, c) {
			var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
			a.log(d, b)
		});
		var f = function() {
			function a() {
				this.yy = {}
			}
			var c = {
					trace: function() {},
					yy: {},
					symbols_: {
						error: 2,
						root: 3,
						program: 4,
						EOF: 5,
						simpleInverse: 6,
						statements: 7,
						statement: 8,
						openInverse: 9,
						closeBlock: 10,
						openBlock: 11,
						mustache: 12,
						partial: 13,
						CONTENT: 14,
						COMMENT: 15,
						OPEN_BLOCK: 16,
						inMustache: 17,
						CLOSE: 18,
						OPEN_INVERSE: 19,
						OPEN_ENDBLOCK: 20,
						path: 21,
						OPEN: 22,
						OPEN_UNESCAPED: 23,
						OPEN_PARTIAL: 24,
						partialName: 25,
						params: 26,
						hash: 27,
						DATA: 28,
						param: 29,
						STRING: 30,
						INTEGER: 31,
						BOOLEAN: 32,
						hashSegments: 33,
						hashSegment: 34,
						ID: 35,
						EQUALS: 36,
						PARTIAL_NAME: 37,
						pathSegments: 38,
						SEP: 39,
						$accept: 0,
						$end: 1
					},
					terminals_: {
						2: "error",
						5: "EOF",
						14: "CONTENT",
						15: "COMMENT",
						16: "OPEN_BLOCK",
						18: "CLOSE",
						19: "OPEN_INVERSE",
						20: "OPEN_ENDBLOCK",
						22: "OPEN",
						23: "OPEN_UNESCAPED",
						24: "OPEN_PARTIAL",
						28: "DATA",
						30: "STRING",
						31: "INTEGER",
						32: "BOOLEAN",
						35: "ID",
						36: "EQUALS",
						37: "PARTIAL_NAME",
						39: "SEP"
					},
					productions_: [0, [3, 2],
						[4, 2],
						[4, 3],
						[4, 2],
						[4, 1],
						[4, 1],
						[4, 0],
						[7, 1],
						[7, 2],
						[8, 3],
						[8, 3],
						[8, 1],
						[8, 1],
						[8, 1],
						[8, 1],
						[11, 3],
						[9, 3],
						[10, 3],
						[12, 3],
						[12, 3],
						[13, 3],
						[13, 4],
						[6, 2],
						[17, 3],
						[17, 2],
						[17, 2],
						[17, 1],
						[17, 1],
						[26, 2],
						[26, 1],
						[29, 1],
						[29, 1],
						[29, 1],
						[29, 1],
						[29, 1],
						[27, 1],
						[33, 2],
						[33, 1],
						[34, 3],
						[34, 3],
						[34, 3],
						[34, 3],
						[34, 3],
						[25, 1],
						[21, 1],
						[38, 3],
						[38, 1]
					],
					performAction: function(a, b, c, d, e, f) {
						var g = f.length - 1;
						switch (e) {
							case 1:
								return f[g - 1];
							case 2:
								this.$ = new d.ProgramNode([], f[g]);
								break;
							case 3:
								this.$ = new d.ProgramNode(f[g - 2], f[g]);
								break;
							case 4:
								this.$ = new d.ProgramNode(f[g - 1], []);
								break;
							case 5:
								this.$ = new d.ProgramNode(f[g]);
								break;
							case 6:
								this.$ = new d.ProgramNode([], []);
								break;
							case 7:
								this.$ = new d.ProgramNode([]);
								break;
							case 8:
								this.$ = [f[g]];
								break;
							case 9:
								f[g - 1].push(f[g]), this.$ = f[g - 1];
								break;
							case 10:
								this.$ = new d.BlockNode(f[g - 2], f[g - 1].inverse, f[g - 1], f[g]);
								break;
							case 11:
								this.$ = new d.BlockNode(f[g - 2], f[g - 1], f[g - 1].inverse, f[g]);
								break;
							case 12:
								this.$ = f[g];
								break;
							case 13:
								this.$ = f[g];
								break;
							case 14:
								this.$ = new d.ContentNode(f[g]);
								break;
							case 15:
								this.$ = new d.CommentNode(f[g]);
								break;
							case 16:
								this.$ = new d.MustacheNode(f[g - 1][0], f[g - 1][1]);
								break;
							case 17:
								this.$ = new d.MustacheNode(f[g - 1][0], f[g - 1][1]);
								break;
							case 18:
								this.$ = f[g - 1];
								break;
							case 19:
								this.$ = new d.MustacheNode(f[g - 1][0], f[g - 1][1]);
								break;
							case 20:
								this.$ = new d.MustacheNode(f[g - 1][0], f[g - 1][1], !0);
								break;
							case 21:
								this.$ = new d.PartialNode(f[g - 1]);
								break;
							case 22:
								this.$ = new d.PartialNode(f[g - 2], f[g - 1]);
								break;
							case 23:
								break;
							case 24:
								this.$ = [
									[f[g - 2]].concat(f[g - 1]), f[g]
								];
								break;
							case 25:
								this.$ = [
									[f[g - 1]].concat(f[g]), null
								];
								break;
							case 26:
								this.$ = [
									[f[g - 1]], f[g]
								];
								break;
							case 27:
								this.$ = [
									[f[g]], null
								];
								break;
							case 28:
								this.$ = [
									[new d.DataNode(f[g])], null
								];
								break;
							case 29:
								f[g - 1].push(f[g]), this.$ = f[g - 1];
								break;
							case 30:
								this.$ = [f[g]];
								break;
							case 31:
								this.$ = f[g];
								break;
							case 32:
								this.$ = new d.StringNode(f[g]);
								break;
							case 33:
								this.$ = new d.IntegerNode(f[g]);
								break;
							case 34:
								this.$ = new d.BooleanNode(f[g]);
								break;
							case 35:
								this.$ = new d.DataNode(f[g]);
								break;
							case 36:
								this.$ = new d.HashNode(f[g]);
								break;
							case 37:
								f[g - 1].push(f[g]), this.$ = f[g - 1];
								break;
							case 38:
								this.$ = [f[g]];
								break;
							case 39:
								this.$ = [f[g - 2], f[g]];
								break;
							case 40:
								this.$ = [f[g - 2], new d.StringNode(f[g])];
								break;
							case 41:
								this.$ = [f[g - 2], new d.IntegerNode(f[g])];
								break;
							case 42:
								this.$ = [f[g - 2], new d.BooleanNode(f[g])];
								break;
							case 43:
								this.$ = [f[g - 2], new d.DataNode(f[g])];
								break;
							case 44:
								this.$ = new d.PartialNameNode(f[g]);
								break;
							case 45:
								this.$ = new d.IdNode(f[g]);
								break;
							case 46:
								f[g - 2].push(f[g]), this.$ = f[g - 2];
								break;
							case 47:
								this.$ = [f[g]]
						}
					},
					table: [{
						3: 1,
						4: 2,
						5: [2, 7],
						6: 3,
						7: 4,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 5],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						1: [3]
					}, {
						5: [1, 17]
					}, {
						5: [2, 6],
						7: 18,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 19],
						20: [2, 6],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						5: [2, 5],
						6: 20,
						8: 21,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 5],
						20: [2, 5],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						17: 23,
						18: [1, 22],
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						5: [2, 8],
						14: [2, 8],
						15: [2, 8],
						16: [2, 8],
						19: [2, 8],
						20: [2, 8],
						22: [2, 8],
						23: [2, 8],
						24: [2, 8]
					}, {
						4: 28,
						6: 3,
						7: 4,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 5],
						20: [2, 7],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						4: 29,
						6: 3,
						7: 4,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 5],
						20: [2, 7],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						5: [2, 12],
						14: [2, 12],
						15: [2, 12],
						16: [2, 12],
						19: [2, 12],
						20: [2, 12],
						22: [2, 12],
						23: [2, 12],
						24: [2, 12]
					}, {
						5: [2, 13],
						14: [2, 13],
						15: [2, 13],
						16: [2, 13],
						19: [2, 13],
						20: [2, 13],
						22: [2, 13],
						23: [2, 13],
						24: [2, 13]
					}, {
						5: [2, 14],
						14: [2, 14],
						15: [2, 14],
						16: [2, 14],
						19: [2, 14],
						20: [2, 14],
						22: [2, 14],
						23: [2, 14],
						24: [2, 14]
					}, {
						5: [2, 15],
						14: [2, 15],
						15: [2, 15],
						16: [2, 15],
						19: [2, 15],
						20: [2, 15],
						22: [2, 15],
						23: [2, 15],
						24: [2, 15]
					}, {
						17: 30,
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						17: 31,
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						17: 32,
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						25: 33,
						37: [1, 34]
					}, {
						1: [2, 1]
					}, {
						5: [2, 2],
						8: 21,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 19],
						20: [2, 2],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						17: 23,
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						5: [2, 4],
						7: 35,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 19],
						20: [2, 4],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						5: [2, 9],
						14: [2, 9],
						15: [2, 9],
						16: [2, 9],
						19: [2, 9],
						20: [2, 9],
						22: [2, 9],
						23: [2, 9],
						24: [2, 9]
					}, {
						5: [2, 23],
						14: [2, 23],
						15: [2, 23],
						16: [2, 23],
						19: [2, 23],
						20: [2, 23],
						22: [2, 23],
						23: [2, 23],
						24: [2, 23]
					}, {
						18: [1, 36]
					}, {
						18: [2, 27],
						21: 41,
						26: 37,
						27: 38,
						28: [1, 45],
						29: 39,
						30: [1, 42],
						31: [1, 43],
						32: [1, 44],
						33: 40,
						34: 46,
						35: [1, 47],
						38: 26
					}, {
						18: [2, 28]
					}, {
						18: [2, 45],
						28: [2, 45],
						30: [2, 45],
						31: [2, 45],
						32: [2, 45],
						35: [2, 45],
						39: [1, 48]
					}, {
						18: [2, 47],
						28: [2, 47],
						30: [2, 47],
						31: [2, 47],
						32: [2, 47],
						35: [2, 47],
						39: [2, 47]
					}, {
						10: 49,
						20: [1, 50]
					}, {
						10: 51,
						20: [1, 50]
					}, {
						18: [1, 52]
					}, {
						18: [1, 53]
					}, {
						18: [1, 54]
					}, {
						18: [1, 55],
						21: 56,
						35: [1, 27],
						38: 26
					}, {
						18: [2, 44],
						35: [2, 44]
					}, {
						5: [2, 3],
						8: 21,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 19],
						20: [2, 3],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						14: [2, 17],
						15: [2, 17],
						16: [2, 17],
						19: [2, 17],
						20: [2, 17],
						22: [2, 17],
						23: [2, 17],
						24: [2, 17]
					}, {
						18: [2, 25],
						21: 41,
						27: 57,
						28: [1, 45],
						29: 58,
						30: [1, 42],
						31: [1, 43],
						32: [1, 44],
						33: 40,
						34: 46,
						35: [1, 47],
						38: 26
					}, {
						18: [2, 26]
					}, {
						18: [2, 30],
						28: [2, 30],
						30: [2, 30],
						31: [2, 30],
						32: [2, 30],
						35: [2, 30]
					}, {
						18: [2, 36],
						34: 59,
						35: [1, 60]
					}, {
						18: [2, 31],
						28: [2, 31],
						30: [2, 31],
						31: [2, 31],
						32: [2, 31],
						35: [2, 31]
					}, {
						18: [2, 32],
						28: [2, 32],
						30: [2, 32],
						31: [2, 32],
						32: [2, 32],
						35: [2, 32]
					}, {
						18: [2, 33],
						28: [2, 33],
						30: [2, 33],
						31: [2, 33],
						32: [2, 33],
						35: [2, 33]
					}, {
						18: [2, 34],
						28: [2, 34],
						30: [2, 34],
						31: [2, 34],
						32: [2, 34],
						35: [2, 34]
					}, {
						18: [2, 35],
						28: [2, 35],
						30: [2, 35],
						31: [2, 35],
						32: [2, 35],
						35: [2, 35]
					}, {
						18: [2, 38],
						35: [2, 38]
					}, {
						18: [2, 47],
						28: [2, 47],
						30: [2, 47],
						31: [2, 47],
						32: [2, 47],
						35: [2, 47],
						36: [1, 61],
						39: [2, 47]
					}, {
						35: [1, 62]
					}, {
						5: [2, 10],
						14: [2, 10],
						15: [2, 10],
						16: [2, 10],
						19: [2, 10],
						20: [2, 10],
						22: [2, 10],
						23: [2, 10],
						24: [2, 10]
					}, {
						21: 63,
						35: [1, 27],
						38: 26
					}, {
						5: [2, 11],
						14: [2, 11],
						15: [2, 11],
						16: [2, 11],
						19: [2, 11],
						20: [2, 11],
						22: [2, 11],
						23: [2, 11],
						24: [2, 11]
					}, {
						14: [2, 16],
						15: [2, 16],
						16: [2, 16],
						19: [2, 16],
						20: [2, 16],
						22: [2, 16],
						23: [2, 16],
						24: [2, 16]
					}, {
						5: [2, 19],
						14: [2, 19],
						15: [2, 19],
						16: [2, 19],
						19: [2, 19],
						20: [2, 19],
						22: [2, 19],
						23: [2, 19],
						24: [2, 19]
					}, {
						5: [2, 20],
						14: [2, 20],
						15: [2, 20],
						16: [2, 20],
						19: [2, 20],
						20: [2, 20],
						22: [2, 20],
						23: [2, 20],
						24: [2, 20]
					}, {
						5: [2, 21],
						14: [2, 21],
						15: [2, 21],
						16: [2, 21],
						19: [2, 21],
						20: [2, 21],
						22: [2, 21],
						23: [2, 21],
						24: [2, 21]
					}, {
						18: [1, 64]
					}, {
						18: [2, 24]
					}, {
						18: [2, 29],
						28: [2, 29],
						30: [2, 29],
						31: [2, 29],
						32: [2, 29],
						35: [2, 29]
					}, {
						18: [2, 37],
						35: [2, 37]
					}, {
						36: [1, 61]
					}, {
						21: 65,
						28: [1, 69],
						30: [1, 66],
						31: [1, 67],
						32: [1, 68],
						35: [1, 27],
						38: 26
					}, {
						18: [2, 46],
						28: [2, 46],
						30: [2, 46],
						31: [2, 46],
						32: [2, 46],
						35: [2, 46],
						39: [2, 46]
					}, {
						18: [1, 70]
					}, {
						5: [2, 22],
						14: [2, 22],
						15: [2, 22],
						16: [2, 22],
						19: [2, 22],
						20: [2, 22],
						22: [2, 22],
						23: [2, 22],
						24: [2, 22]
					}, {
						18: [2, 39],
						35: [2, 39]
					}, {
						18: [2, 40],
						35: [2, 40]
					}, {
						18: [2, 41],
						35: [2, 41]
					}, {
						18: [2, 42],
						35: [2, 42]
					}, {
						18: [2, 43],
						35: [2, 43]
					}, {
						5: [2, 18],
						14: [2, 18],
						15: [2, 18],
						16: [2, 18],
						19: [2, 18],
						20: [2, 18],
						22: [2, 18],
						23: [2, 18],
						24: [2, 18]
					}],
					defaultActions: {
						17: [2, 1],
						25: [2, 28],
						38: [2, 26],
						57: [2, 24]
					},
					parseError: function(a) {
						throw Error(a)
					},
					parse: function(a) {
						function c() {
							var a;
							return a = d.lexer.lex() || 1, "number" != typeof a && (a = d.symbols_[a] || a), a
						}
						var d = this,
							e = [0],
							f = [null],
							g = [],
							h = this.table,
							i = "",
							j = 0,
							k = 0,
							l = 0;
						this.lexer.setInput(a), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, this.lexer.yylloc === b && (this.lexer.yylloc = {});
						var m = this.lexer.yylloc;
						g.push(m);
						var n = this.lexer.options && this.lexer.options.ranges;
						"function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
						for (var o, p, q, r, s, t, u, v, w, x = {};;) {
							if (q = e[e.length - 1], this.defaultActions[q] ? r = this.defaultActions[q] : ((null === o || o === b) && (o = c()), r = h[q] && h[q][o]), r === b || !r.length || !r[0]) {
								var y = "";
								if (!l) {
									w = [];
									for (t in h[q]) this.terminals_[t] && t > 2 && w.push("'" + this.terminals_[t] + "'");
									y = this.lexer.showPosition ? "Parse error on line " + (j + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + w.join(", ") + ", got '" + (this.terminals_[o] || o) + "'" : "Parse error on line " + (j + 1) + ": Unexpected " + (1 == o ? "end of input" : "'" + (this.terminals_[o] || o) + "'"), this.parseError(y, {
										text: this.lexer.match,
										token: this.terminals_[o] || o,
										line: this.lexer.yylineno,
										loc: m,
										expected: w
									})
								}
							}
							if (r[0] instanceof Array && r.length > 1) throw Error("Parse Error: multiple actions possible at state: " + q + ", token: " + o);
							switch (r[0]) {
								case 1:
									e.push(o), f.push(this.lexer.yytext), g.push(this.lexer.yylloc), e.push(r[1]), o = null, p ? (o = p, p = null) : (k = this.lexer.yyleng, i = this.lexer.yytext, j = this.lexer.yylineno, m = this.lexer.yylloc, l > 0 && l--);
									break;
								case 2:
									if (u = this.productions_[r[1]][1], x.$ = f[f.length - u], x._$ = {
										first_line: g[g.length - (u || 1)].first_line,
										last_line: g[g.length - 1].last_line,
										first_column: g[g.length - (u || 1)].first_column,
										last_column: g[g.length - 1].last_column
									}, n && (x._$.range = [g[g.length - (u || 1)].range[0], g[g.length - 1].range[1]]), s = this.performAction.call(x, i, k, j, this.yy, r[1], f, g), s !== b) return s;
									u && (e = e.slice(0, -2 * u), f = f.slice(0, -1 * u), g = g.slice(0, -1 * u)), e.push(this.productions_[r[1]][0]), f.push(x.$), g.push(x._$), v = h[e[e.length - 2]][e[e.length - 1]], e.push(v);
									break;
								case 3:
									return !0
							}
						}
						return !0
					}
				},
				d = function() {
					var a = {
						EOF: 1,
						parseError: function(a, b) {
							if (!this.yy.parser) throw Error(a);
							this.yy.parser.parseError(a, b)
						},
						setInput: function(a) {
							return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
								first_line: 1,
								first_column: 0,
								last_line: 1,
								last_column: 0
							}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
						},
						input: function() {
							var a = this._input[0];
							this.yytext += a, this.yyleng++, this.offset++, this.match += a, this.matched += a;
							var b = a.match(/(?:\r\n?|\n).*/g);
							return b ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), a
						},
						unput: function(a) {
							var b = a.length,
								c = a.split(/(?:\r\n?|\n)/g);
							this._input = a + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - b - 1), this.offset -= b;
							var d = this.match.split(/(?:\r\n?|\n)/g);
							this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
							var e = this.yylloc.range;
							return this.yylloc = {
								first_line: this.yylloc.first_line,
								last_line: this.yylineno + 1,
								first_column: this.yylloc.first_column,
								last_column: c ? (c.length === d.length ? this.yylloc.first_column : 0) + d[d.length - c.length].length - c[0].length : this.yylloc.first_column - b
							}, this.options.ranges && (this.yylloc.range = [e[0], e[0] + this.yyleng - b]), this
						},
						more: function() {
							return this._more = !0, this
						},
						less: function(a) {
							this.unput(this.match.slice(a))
						},
						pastInput: function() {
							var a = this.matched.substr(0, this.matched.length - this.match.length);
							return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "")
						},
						upcomingInput: function() {
							var a = this.match;
							return 20 > a.length && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "")
						},
						showPosition: function() {
							var a = this.pastInput(),
								b = Array(a.length + 1).join("-");
							return a + this.upcomingInput() + "\n" + b + "^"
						},
						next: function() {
							if (this.done) return this.EOF;
							this._input || (this.done = !0);
							var a, c, d, e, f;
							this._more || (this.yytext = "", this.match = "");
							for (var g = this._currentRules(), h = 0; g.length > h && (d = this._input.match(this.rules[g[h]]), !d || c && !(d[0].length > c[0].length) || (c = d, e = h, this.options.flex)); h++);
							return c ? (f = c[0].match(/(?:\r\n?|\n).*/g), f && (this.yylineno += f.length), this.yylloc = {
								first_line: this.yylloc.last_line,
								last_line: this.yylineno + 1,
								first_column: this.yylloc.last_column,
								last_column: f ? f[f.length - 1].length - f[f.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + c[0].length
							}, this.yytext += c[0], this.match += c[0], this.matches = c, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(c[0].length), this.matched += c[0], a = this.performAction.call(this, this.yy, this, g[e], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), a ? a : b) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
								text: "",
								token: null,
								line: this.yylineno
							})
						},
						lex: function() {
							var a = this.next();
							return a !== b ? a : this.lex()
						},
						begin: function(a) {
							this.conditionStack.push(a)
						},
						popState: function() {
							return this.conditionStack.pop()
						},
						_currentRules: function() {
							return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
						},
						topState: function() {
							return this.conditionStack[this.conditionStack.length - 2]
						},
						pushState: function(a) {
							this.begin(a)
						}
					};
					return a.options = {}, a.performAction = function(a, b, c) {
						switch (c) {
							case 0:
								return b.yytext = "\\", 14;
							case 1:
								if ("\\" !== b.yytext.slice(-1) && this.begin("mu"), "\\" === b.yytext.slice(-1) && (b.yytext = b.yytext.substr(0, b.yyleng - 1), this.begin("emu")), b.yytext) return 14;
								break;
							case 2:
								return 14;
							case 3:
								return "\\" !== b.yytext.slice(-1) && this.popState(), "\\" === b.yytext.slice(-1) && (b.yytext = b.yytext.substr(0, b.yyleng - 1)), 14;
							case 4:
								return b.yytext = b.yytext.substr(0, b.yyleng - 4), this.popState(), 15;
							case 5:
								return this.begin("par"), 24;
							case 6:
								return 16;
							case 7:
								return 20;
							case 8:
								return 19;
							case 9:
								return 19;
							case 10:
								return 23;
							case 11:
								return 23;
							case 12:
								this.popState(), this.begin("com");
								break;
							case 13:
								return b.yytext = b.yytext.substr(3, b.yyleng - 5), this.popState(), 15;
							case 14:
								return 22;
							case 15:
								return 36;
							case 16:
								return 35;
							case 17:
								return 35;
							case 18:
								return 39;
							case 19:
								break;
							case 20:
								return this.popState(), 18;
							case 21:
								return this.popState(), 18;
							case 22:
								return b.yytext = b.yytext.substr(1, b.yyleng - 2).replace(/\\"/g, '"'), 30;
							case 23:
								return b.yytext = b.yytext.substr(1, b.yyleng - 2).replace(/\\'/g, "'"), 30;
							case 24:
								return b.yytext = b.yytext.substr(1), 28;
							case 25:
								return 32;
							case 26:
								return 32;
							case 27:
								return 31;
							case 28:
								return 35;
							case 29:
								return b.yytext = b.yytext.substr(1, b.yyleng - 2), 35;
							case 30:
								return "INVALID";
							case 31:
								break;
							case 32:
								return this.popState(), 37;
							case 33:
								return 5
						}
					}, a.rules = [/^(?:\\\\(?=(\{\{)))/, /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[}/ ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@[a-zA-Z]+)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:-?[0-9]+(?=[}\s]))/, /^(?:[a-zA-Z0-9_$:\-]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:\s+)/, /^(?:[a-zA-Z0-9_$\-\/]+)/, /^(?:$)/], a.conditions = {
						mu: {
							rules: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33],
							inclusive: !1
						},
						emu: {
							rules: [3],
							inclusive: !1
						},
						com: {
							rules: [4],
							inclusive: !1
						},
						par: {
							rules: [31, 32],
							inclusive: !1
						},
						INITIAL: {
							rules: [0, 1, 2, 33],
							inclusive: !0
						}
					}, a
				}();
			return c.lexer = d, a.prototype = c, c.Parser = a, new a
		}();
		a.Parser = f, a.parse = function(b) {
			return b.constructor === a.AST.ProgramNode ? b : (a.Parser.yy = a.AST, a.Parser.parse(b))
		}, a.AST = {}, a.AST.ProgramNode = function(b, c) {
			this.type = "program", this.statements = b, c && (this.inverse = new a.AST.ProgramNode(c))
		}, a.AST.MustacheNode = function(a, b, c) {
			this.type = "mustache", this.escaped = !c, this.hash = b;
			var d = this.id = a[0],
				e = this.params = a.slice(1),
				f = this.eligibleHelper = d.isSimple;
			this.isHelper = f && (e.length || b)
		}, a.AST.PartialNode = function(a, b) {
			this.type = "partial", this.partialName = a, this.context = b
		}, a.AST.BlockNode = function(b, c, d, e) {
			var f = function(b, c) {
				if (b.original !== c.original) throw new a.Exception(b.original + " doesn't match " + c.original)
			};
			f(b.id, e), this.type = "block", this.mustache = b, this.program = c, this.inverse = d, this.inverse && !this.program && (this.isInverse = !0)
		}, a.AST.ContentNode = function(a) {
			this.type = "content", this.string = a
		}, a.AST.HashNode = function(a) {
			this.type = "hash", this.pairs = a
		}, a.AST.IdNode = function(b) {
			this.type = "ID", this.original = b.join(".");
			for (var c = [], d = 0, e = 0, f = b.length; f > e; e++) {
				var g = b[e];
				if (".." === g || "." === g || "this" === g) {
					if (c.length > 0) throw new a.Exception("Invalid path: " + this.original);
					".." === g ? d++ : this.isScoped = !0
				} else c.push(g)
			}
			this.parts = c, this.string = c.join("."), this.depth = d, this.isSimple = 1 === b.length && !this.isScoped && 0 === d, this.stringModeValue = this.string
		}, a.AST.PartialNameNode = function(a) {
			this.type = "PARTIAL_NAME", this.name = a
		}, a.AST.DataNode = function(a) {
			this.type = "DATA", this.id = a
		}, a.AST.StringNode = function(a) {
			this.type = "STRING", this.string = a, this.stringModeValue = a
		}, a.AST.IntegerNode = function(a) {
			this.type = "INTEGER", this.integer = a, this.stringModeValue = Number(a)
		}, a.AST.BooleanNode = function(a) {
			this.type = "BOOLEAN", this.bool = a, this.stringModeValue = "true" === a
		}, a.AST.CommentNode = function(a) {
			this.type = "comment", this.comment = a
		};
		var g = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
		a.Exception = function() {
			for (var a = Error.prototype.constructor.apply(this, arguments), b = 0; g.length > b; b++) this[g[b]] = a[g[b]]
		}, a.Exception.prototype = Error(), a.SafeString = function(a) {
			this.string = a
		}, a.SafeString.prototype.toString = function() {
			return "" + this.string
		};
		var h = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#x27;",
				"`": "&#x60;"
			},
			i = /[&<>"'`]/g,
			j = /[&<>"'`]/,
			k = function(a) {
				return h[a] || "&amp;"
			};
		a.Utils = {
			extend: function(a, b) {
				for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
			},
			escapeExpression: function(b) {
				return b instanceof a.SafeString ? "" + b : null == b || b === !1 ? "" : (b = "" + b, j.test(b) ? b.replace(i, k) : b)
			},
			isEmpty: function(a) {
				return a || 0 === a ? "[object Array]" === c.call(a) && 0 === a.length ? !0 : !1 : !0
			}
		};
		var l = a.Compiler = function() {},
			m = a.JavaScriptCompiler = function() {};
		l.prototype = {
			compiler: l,
			disassemble: function() {
				for (var a, b, c, d = this.opcodes, e = [], f = 0, g = d.length; g > f; f++)
					if (a = d[f], "DECLARE" === a.opcode) e.push("DECLARE " + a.name + "=" + a.value);
					else {
						b = [];
						for (var h = 0; a.args.length > h; h++) c = a.args[h], "string" == typeof c && (c = '"' + c.replace("\n", "\\n") + '"'), b.push(c);
						e.push(a.opcode + " " + b.join(" "))
					}
				return e.join("\n")
			},
			equals: function(a) {
				var b = this.opcodes.length;
				if (a.opcodes.length !== b) return !1;
				for (var c = 0; b > c; c++) {
					var d = this.opcodes[c],
						e = a.opcodes[c];
					if (d.opcode !== e.opcode || d.args.length !== e.args.length) return !1;
					for (var f = 0; d.args.length > f; f++)
						if (d.args[f] !== e.args[f]) return !1
				}
				if (b = this.children.length, a.children.length !== b) return !1;
				for (c = 0; b > c; c++)
					if (!this.children[c].equals(a.children[c])) return !1;
				return !0
			},
			guid: 0,
			compile: function(a, b) {
				this.children = [], this.depths = {
					list: []
				}, this.options = b;
				var c = this.options.knownHelpers;
				if (this.options.knownHelpers = {
					helperMissing: !0,
					blockHelperMissing: !0,
					each: !0,
					"if": !0,
					unless: !0,
					"with": !0,
					log: !0
				}, c)
					for (var d in c) this.options.knownHelpers[d] = c[d];
				return this.program(a)
			},
			accept: function(a) {
				return this[a.type](a)
			},
			program: function(a) {
				var b, c = a.statements;
				this.opcodes = [];
				for (var d = 0, e = c.length; e > d; d++) b = c[d], this[b.type](b);
				return this.isSimple = 1 === e, this.depths.list = this.depths.list.sort(function(a, b) {
					return a - b
				}), this
			},
			compileProgram: function(a) {
				var b, c = (new this.compiler).compile(a, this.options),
					d = this.guid++;
				this.usePartial = this.usePartial || c.usePartial, this.children[d] = c;
				for (var e = 0, f = c.depths.list.length; f > e; e++) b = c.depths.list[e], 2 > b || this.addDepth(b - 1);
				return d
			},
			block: function(a) {
				var b = a.mustache,
					c = a.program,
					d = a.inverse;
				c && (c = this.compileProgram(c)), d && (d = this.compileProgram(d));
				var e = this.classifyMustache(b);
				"helper" === e ? this.helperMustache(b, c, d) : "simple" === e ? (this.simpleMustache(b), this.opcode("pushProgram", c), this.opcode("pushProgram", d), this.opcode("emptyHash"), this.opcode("blockValue")) : (this.ambiguousMustache(b, c, d), this.opcode("pushProgram", c), this.opcode("pushProgram", d), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
			},
			hash: function(a) {
				var b, c, d = a.pairs;
				this.opcode("pushHash");
				for (var e = 0, f = d.length; f > e; e++) b = d[e], c = b[1], this.options.stringParams ? (c.depth && this.addDepth(c.depth), this.opcode("getContext", c.depth || 0), this.opcode("pushStringParam", c.stringModeValue, c.type)) : this.accept(c), this.opcode("assignToHash", b[0]);
				this.opcode("popHash")
			},
			partial: function(a) {
				var b = a.partialName;
				this.usePartial = !0, a.context ? this.ID(a.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", b.name), this.opcode("append")
			},
			content: function(a) {
				this.opcode("appendContent", a.string)
			},
			mustache: function(a) {
				var b = this.options,
					c = this.classifyMustache(a);
				"simple" === c ? this.simpleMustache(a) : "helper" === c ? this.helperMustache(a) : this.ambiguousMustache(a), a.escaped && !b.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
			},
			ambiguousMustache: function(a, b, c) {
				var d = a.id,
					e = d.parts[0],
					f = null != b || null != c;
				this.opcode("getContext", d.depth), this.opcode("pushProgram", b), this.opcode("pushProgram", c), this.opcode("invokeAmbiguous", e, f)
			},
			simpleMustache: function(a) {
				var b = a.id;
				"DATA" === b.type ? this.DATA(b) : b.parts.length ? this.ID(b) : (this.addDepth(b.depth), this.opcode("getContext", b.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
			},
			helperMustache: function(a, b, c) {
				var d = this.setupFullMustacheParams(a, b, c),
					e = a.id.parts[0];
				if (this.options.knownHelpers[e]) this.opcode("invokeKnownHelper", d.length, e);
				else {
					if (this.options.knownHelpersOnly) throw Error("You specified knownHelpersOnly, but used the unknown helper " + e);
					this.opcode("invokeHelper", d.length, e)
				}
			},
			ID: function(a) {
				this.addDepth(a.depth), this.opcode("getContext", a.depth);
				var b = a.parts[0];
				b ? this.opcode("lookupOnContext", a.parts[0]) : this.opcode("pushContext");
				for (var c = 1, d = a.parts.length; d > c; c++) this.opcode("lookup", a.parts[c])
			},
			DATA: function(a) {
				this.options.data = !0, this.opcode("lookupData", a.id)
			},
			STRING: function(a) {
				this.opcode("pushString", a.string)
			},
			INTEGER: function(a) {
				this.opcode("pushLiteral", a.integer)
			},
			BOOLEAN: function(a) {
				this.opcode("pushLiteral", a.bool)
			},
			comment: function() {},
			opcode: function(a) {
				this.opcodes.push({
					opcode: a,
					args: [].slice.call(arguments, 1)
				})
			},
			declare: function(a, b) {
				this.opcodes.push({
					opcode: "DECLARE",
					name: a,
					value: b
				})
			},
			addDepth: function(a) {
				if (isNaN(a)) throw Error("EWOT");
				0 !== a && (this.depths[a] || (this.depths[a] = !0, this.depths.list.push(a)))
			},
			classifyMustache: function(a) {
				var b = a.isHelper,
					c = a.eligibleHelper,
					d = this.options;
				if (c && !b) {
					var e = a.id.parts[0];
					d.knownHelpers[e] ? b = !0 : d.knownHelpersOnly && (c = !1)
				}
				return b ? "helper" : c ? "ambiguous" : "simple"
			},
			pushParams: function(a) {
				for (var b, c = a.length; c--;) b = a[c], this.options.stringParams ? (b.depth && this.addDepth(b.depth), this.opcode("getContext", b.depth || 0), this.opcode("pushStringParam", b.stringModeValue, b.type)) : this[b.type](b)
			},
			setupMustacheParams: function(a) {
				var b = a.params;
				return this.pushParams(b), a.hash ? this.hash(a.hash) : this.opcode("emptyHash"), b
			},
			setupFullMustacheParams: function(a, b, c) {
				var d = a.params;
				return this.pushParams(d), this.opcode("pushProgram", b), this.opcode("pushProgram", c), a.hash ? this.hash(a.hash) : this.opcode("emptyHash"), d
			}
		};
		var n = function(a) {
			this.value = a
		};
		m.prototype = {
			nameLookup: function(a, b) {
				return /^[0-9]+$/.test(b) ? a + "[" + b + "]" : m.isValidJavaScriptVariableName(b) ? a + "." + b : a + "['" + b + "']"
			},
			appendToBuffer: function(a) {
				return this.environment.isSimple ? "return " + a + ";" : {
					appendToBuffer: !0,
					content: a,
					toString: function() {
						return "buffer += " + a + ";"
					}
				}
			},
			initializeBuffer: function() {
				return this.quotedString("")
			},
			namespace: "Handlebars",
			compile: function(b, c, d, e) {
				this.environment = b, this.options = c || {}, a.log(a.logger.DEBUG, this.environment.disassemble() + "\n\n"), this.name = this.environment.name, this.isChild = !!d, this.context = d || {
					programs: [],
					environments: [],
					aliases: {}
				}, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.registers = {
					list: []
				}, this.compileStack = [], this.inlineStack = [], this.compileChildren(b, c);
				var f, g = b.opcodes;
				for (this.i = 0, r = g.length; r > this.i; this.i++) f = g[this.i], "DECLARE" === f.opcode ? this[f.name] = f.value : this[f.opcode].apply(this, f.args);
				return this.createFunctionContext(e)
			},
			nextOpcode: function() {
				var a = this.environment.opcodes;
				return a[this.i + 1]
			},
			eat: function() {
				this.i = this.i + 1
			},
			preamble: function() {
				var a = [];
				if (this.isChild) a.push("");
				else {
					var b = this.namespace,
						c = "helpers = helpers || " + b + ".helpers;";
					this.environment.usePartial && (c = c + " partials = partials || " + b + ".partials;"), this.options.data && (c += " data = data || {};"), a.push(c)
				}
				this.environment.isSimple ? a.push("") : a.push(", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = a
			},
			createFunctionContext: function(b) {
				var c = this.stackVars.concat(this.registers.list);
				if (c.length > 0 && (this.source[1] = this.source[1] + ", " + c.join(", ")), !this.isChild)
					for (var d in this.context.aliases) this.source[1] = this.source[1] + ", " + d + "=" + this.context.aliases[d];
				this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.source.push("return buffer;");
				for (var e = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"], f = 0, g = this.environment.depths.list.length; g > f; f++) e.push("depth" + this.environment.depths.list[f]);
				var h = this.mergeSource();
				if (!this.isChild) {
					var i = a.COMPILER_REVISION,
						j = a.REVISION_CHANGES[i];
					h = "this.compilerInfo = [" + i + ",'" + j + "'];\n" + h
				}
				if (b) return e.push(h), Function.apply(this, e);
				var k = "function " + (this.name || "") + "(" + e.join(",") + ") {\n  " + h + "}";
				return a.log(a.logger.DEBUG, k + "\n\n"), k
			},
			mergeSource: function() {
				for (var a, c = "", d = 0, e = this.source.length; e > d; d++) {
					var f = this.source[d];
					f.appendToBuffer ? a = a ? a + "\n    + " + f.content : f.content : (a && (c += "buffer += " + a + ";\n  ", a = b), c += f + "\n  ")
				}
				return c
			},
			blockValue: function() {
				this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
				var a = ["depth0"];
				this.setupParams(0, a), this.replaceStack(function(b) {
					return a.splice(1, 0, b), "blockHelperMissing.call(" + a.join(", ") + ")"
				})
			},
			ambiguousBlockValue: function() {
				this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
				var a = ["depth0"];
				this.setupParams(0, a);
				var b = this.topStack();
				a.splice(1, 0, b), a[a.length - 1] = "options", this.source.push("if (!" + this.lastHelper + ") { " + b + " = blockHelperMissing.call(" + a.join(", ") + "); }")
			},
			appendContent: function(a) {
				this.source.push(this.appendToBuffer(this.quotedString(a)))
			},
			append: function() {
				this.flushInline();
				var a = this.popStack();
				this.source.push("if(" + a + " || " + a + " === 0) { " + this.appendToBuffer(a) + " }"), this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }")
			},
			appendEscaped: function() {
				this.context.aliases.escapeExpression = "this.escapeExpression", this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
			},
			getContext: function(a) {
				this.lastContext !== a && (this.lastContext = a)
			},
			lookupOnContext: function(a) {
				this.push(this.nameLookup("depth" + this.lastContext, a, "context"))
			},
			pushContext: function() {
				this.pushStackLiteral("depth" + this.lastContext)
			},
			resolvePossibleLambda: function() {
				this.context.aliases.functionType = '"function"', this.replaceStack(function(a) {
					return "typeof " + a + " === functionType ? " + a + ".apply(depth0) : " + a
				})
			},
			lookup: function(a) {
				this.replaceStack(function(b) {
					return b + " == null || " + b + " === false ? " + b + " : " + this.nameLookup(b, a, "context")
				})
			},
			lookupData: function(a) {
				this.push(this.nameLookup("data", a, "data"))
			},
			pushStringParam: function(a, b) {
				this.pushStackLiteral("depth" + this.lastContext), this.pushString(b), "string" == typeof a ? this.pushString(a) : this.pushStackLiteral(a)
			},
			emptyHash: function() {
				this.pushStackLiteral("{}"), this.options.stringParams && (this.register("hashTypes", "{}"), this.register("hashContexts", "{}"))
			},
			pushHash: function() {
				this.hash = {
					values: [],
					types: [],
					contexts: []
				}
			},
			popHash: function() {
				var a = this.hash;
				this.hash = b, this.options.stringParams && (this.register("hashContexts", "{" + a.contexts.join(",") + "}"), this.register("hashTypes", "{" + a.types.join(",") + "}")), this.push("{\n    " + a.values.join(",\n    ") + "\n  }")
			},
			pushString: function(a) {
				this.pushStackLiteral(this.quotedString(a))
			},
			push: function(a) {
				return this.inlineStack.push(a), a
			},
			pushLiteral: function(a) {
				this.pushStackLiteral(a)
			},
			pushProgram: function(a) {
				null != a ? this.pushStackLiteral(this.programExpression(a)) : this.pushStackLiteral(null)
			},
			invokeHelper: function(a, b) {
				this.context.aliases.helperMissing = "helpers.helperMissing";
				var c = this.lastHelper = this.setupHelper(a, b, !0);
				this.push(c.name), this.replaceStack(function(a) {
					return a + " ? " + a + ".call(" + c.callParams + ") " + ": helperMissing.call(" + c.helperMissingParams + ")"
				})
			},
			invokeKnownHelper: function(a, b) {
				var c = this.setupHelper(a, b);
				this.push(c.name + ".call(" + c.callParams + ")")
			},
			invokeAmbiguous: function(a, b) {
				this.context.aliases.functionType = '"function"', this.pushStackLiteral("{}");
				var c = this.setupHelper(0, a, b),
					d = this.lastHelper = this.nameLookup("helpers", a, "helper"),
					e = this.nameLookup("depth" + this.lastContext, a, "context"),
					f = this.nextStack();
				this.source.push("if (" + f + " = " + d + ") { " + f + " = " + f + ".call(" + c.callParams + "); }"), this.source.push("else { " + f + " = " + e + "; " + f + " = typeof " + f + " === functionType ? " + f + ".apply(depth0) : " + f + "; }")
			},
			invokePartial: function(a) {
				var b = [this.nameLookup("partials", a, "partial"), "'" + a + "'", this.popStack(), "helpers", "partials"];
				this.options.data && b.push("data"), this.context.aliases.self = "this", this.push("self.invokePartial(" + b.join(", ") + ")")
			},
			assignToHash: function(a) {
				var b, c, d = this.popStack();
				this.options.stringParams && (c = this.popStack(), b = this.popStack());
				var e = this.hash;
				b && e.contexts.push("'" + a + "': " + b), c && e.types.push("'" + a + "': " + c), e.values.push("'" + a + "': (" + d + ")")
			},
			compiler: m,
			compileChildren: function(a, b) {
				for (var c, d, e = a.children, f = 0, g = e.length; g > f; f++) {
					c = e[f], d = new this.compiler;
					var h = this.matchExistingProgram(c);
					null == h ? (this.context.programs.push(""), h = this.context.programs.length, c.index = h, c.name = "program" + h, this.context.programs[h] = d.compile(c, b, this.context), this.context.environments[h] = c) : (c.index = h, c.name = "program" + h)
				}
			},
			matchExistingProgram: function(a) {
				for (var b = 0, c = this.context.environments.length; c > b; b++) {
					var d = this.context.environments[b];
					if (d && d.equals(a)) return b
				}
			},
			programExpression: function(a) {
				if (this.context.aliases.self = "this", null == a) return "self.noop";
				for (var b, c = this.environment.children[a], d = c.depths.list, e = [c.index, c.name, "data"], f = 0, g = d.length; g > f; f++) b = d[f], 1 === b ? e.push("depth0") : e.push("depth" + (b - 1));
				return (0 === d.length ? "self.program(" : "self.programWithDepth(") + e.join(", ") + ")"
			},
			register: function(a, b) {
				this.useRegister(a), this.source.push(a + " = " + b + ";")
			},
			useRegister: function(a) {
				this.registers[a] || (this.registers[a] = !0, this.registers.list.push(a))
			},
			pushStackLiteral: function(a) {
				return this.push(new n(a))
			},
			pushStack: function(a) {
				this.flushInline();
				var b = this.incrStack();
				return a && this.source.push(b + " = " + a + ";"), this.compileStack.push(b), b
			},
			replaceStack: function(a) {
				var b, c = "",
					d = this.isInline();
				if (d) {
					var e = this.popStack(!0);
					if (e instanceof n) b = e.value;
					else {
						var f = this.stackSlot ? this.topStackName() : this.incrStack();
						c = "(" + this.push(f) + " = " + e + "),", b = this.topStack()
					}
				} else b = this.topStack();
				var g = a.call(this, b);
				return d ? ((this.inlineStack.length || this.compileStack.length) && this.popStack(), this.push("(" + c + g + ")")) : (/^stack/.test(b) || (b = this.nextStack()), this.source.push(b + " = (" + c + g + ");")), b
			},
			nextStack: function() {
				return this.pushStack()
			},
			incrStack: function() {
				return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
			},
			topStackName: function() {
				return "stack" + this.stackSlot
			},
			flushInline: function() {
				var a = this.inlineStack;
				if (a.length) {
					this.inlineStack = [];
					for (var b = 0, c = a.length; c > b; b++) {
						var d = a[b];
						d instanceof n ? this.compileStack.push(d) : this.pushStack(d)
					}
				}
			},
			isInline: function() {
				return this.inlineStack.length
			},
			popStack: function(a) {
				var b = this.isInline(),
					c = (b ? this.inlineStack : this.compileStack).pop();
				return !a && c instanceof n ? c.value : (b || this.stackSlot--, c)
			},
			topStack: function(a) {
				var b = this.isInline() ? this.inlineStack : this.compileStack,
					c = b[b.length - 1];
				return !a && c instanceof n ? c.value : c
			},
			quotedString: function(a) {
				return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
			},
			setupHelper: function(a, b, c) {
				var d = [];
				this.setupParams(a, d, c);
				var e = this.nameLookup("helpers", b, "helper");
				return {
					params: d,
					name: e,
					callParams: ["depth0"].concat(d).join(", "),
					helperMissingParams: c && ["depth0", this.quotedString(b)].concat(d).join(", ")
				}
			},
			setupParams: function(a, b, c) {
				var d, e, f, g = [],
					h = [],
					i = [];
				g.push("hash:" + this.popStack()), e = this.popStack(), f = this.popStack(), (f || e) && (f || (this.context.aliases.self = "this", f = "self.noop"), e || (this.context.aliases.self = "this", e = "self.noop"), g.push("inverse:" + e), g.push("fn:" + f));
				for (var j = 0; a > j; j++) d = this.popStack(), b.push(d), this.options.stringParams && (i.push(this.popStack()), h.push(this.popStack()));
				return this.options.stringParams && (g.push("contexts:[" + h.join(",") + "]"), g.push("types:[" + i.join(",") + "]"), g.push("hashContexts:hashContexts"), g.push("hashTypes:hashTypes")), this.options.data && g.push("data:data"), g = "{" + g.join(",") + "}", c ? (this.register("options", g), b.push("options")) : b.push(g), b.join(", ")
			}
		};
		for (var o = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), p = m.RESERVED_WORDS = {}, q = 0, r = o.length; r > q; q++) p[o[q]] = !0;
		m.isValidJavaScriptVariableName = function(a) {
			return !m.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(a) ? !0 : !1
		}, a.precompile = function(b, c) {
			if (null == b || "string" != typeof b && b.constructor !== a.AST.ProgramNode) throw new a.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + b);
			c = c || {}, "data" in c || (c.data = !0);
			var d = a.parse(b),
				e = (new l).compile(d, c);
			return (new m).compile(e, c)
		}, a.compile = function(c, d) {
			function e() {
				var e = a.parse(c),
					f = (new l).compile(e, d),
					g = (new m).compile(f, d, b, !0);
				return a.template(g)
			}
			if (null == c || "string" != typeof c && c.constructor !== a.AST.ProgramNode) throw new a.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + c);
			d = d || {}, "data" in d || (d.data = !0);
			var f;
			return function(a, b) {
				return f || (f = e()), f.call(this, a, b)
			}
		}, a.VM = {
			template: function(b) {
				var c = {
					escapeExpression: a.Utils.escapeExpression,
					invokePartial: a.VM.invokePartial,
					programs: [],
					program: function(b, c, d) {
						var e = this.programs[b];
						return d ? e = a.VM.program(b, c, d) : e || (e = this.programs[b] = a.VM.program(b, c)), e
					},
					programWithDepth: a.VM.programWithDepth,
					noop: a.VM.noop,
					compilerInfo: null
				};
				return function(d, e) {
					e = e || {};
					var f = b.call(c, a, d, e.helpers, e.partials, e.data),
						g = c.compilerInfo || [],
						h = g[0] || 1,
						i = a.COMPILER_REVISION;
					if (h !== i) {
						if (i > h) {
							var j = a.REVISION_CHANGES[i],
								k = a.REVISION_CHANGES[h];
							throw "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + j + ") or downgrade your runtime to an older version (" + k + ")."
						}
						throw "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + g[1] + ")."
					}
					return f
				}
			},
			programWithDepth: function(a, b, c) {
				var d = Array.prototype.slice.call(arguments, 3),
					e = function(a, e) {
						return e = e || {}, b.apply(this, [a, e.data || c].concat(d))
					};
				return e.program = a, e.depth = d.length, e
			},
			program: function(a, b, c) {
				var d = function(a, d) {
					return d = d || {}, b(a, d.data || c)
				};
				return d.program = a, d.depth = 0, d
			},
			noop: function() {
				return ""
			},
			invokePartial: function(c, d, e, f, g, h) {
				var i = {
					helpers: f,
					partials: g,
					data: h
				};
				if (c === b) throw new a.Exception("The partial " + d + " could not be found");
				if (c instanceof Function) return c(e, i);
				if (a.compile) return g[d] = a.compile(c, {
					data: h !== b
				}), g[d](e, i);
				throw new a.Exception("The partial " + d + " could not be compiled when running in runtime-only mode")
			}
		}, a.template = a.VM.template
	}(d), c.exports = d
}), define("alipay/message-panel/1.0.2/message-panel", ["arale/popup/1.1.5/popup", "$", "arale/overlay/1.1.3/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/templatable/0.9.2/templatable", "gallery/handlebars/1.0.2/handlebars"], function(a, b, c) {
	a("./message-panel.css"), seajs.importStyle("@-moz-keyframes spaceboots{1%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}2%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}3%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}4%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}5%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}6%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}7%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}8%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@-webkit-keyframes spaceboots{1%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}2%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}3%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}4%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}5%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}6%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}7%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}8%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@-o-keyframes spaceboots{1%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}2%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}3%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}4%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}5%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}6%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}7%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}8%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@-ms-keyframes spaceboots{1%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}2%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}3%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}4%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}5%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}6%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}7%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}8%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@keyframes spaceboots{1%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}2%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}3%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}4%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}5%{-webkit-transform:rotate(8deg);-moz-transform:rotate(8deg);-o-transform:rotate(8deg);-ms-transform:rotate(8deg);transform:rotate(8deg)}6%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}7%{-webkit-transform:rotate(-8deg);-moz-transform:rotate(-8deg);-o-transform:rotate(-8deg);-ms-transform:rotate(-8deg);transform:rotate(-8deg)}8%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}.message-clock-animate{-webkit-animation:spaceboots 5s infinite;-moz-animation:spaceboots 5s infinite;-o-animation:spaceboots 5s infinite;-ms-animation:spaceboots 5s infinite;animation:spaceboots 5s infinite;display:block}.message-clock-animate:hover{-webkit-animation:none;-moz-animation:none;-o-animation:none;-ms-animation:none;animation:none;text-decoration:none}");
	var d = a("arale/popup/1.1.5/popup"),
		e = a("$"),
		f = a("arale/templatable/0.9.2/templatable"),
		g = a("arale/position/1.0.1/position"),
		h = d.extend({
			Implements: f,
			templateHelpers: {
				spec_tag: function(a) {
					return h.tagFilter(a, this.allowTag)
				}
			},
			attrs: {
				personalServer: !!window.GLOBAL && GLOBAL.system && GLOBAL.system.personalServer || "https://lab.alipay.com/",
				couriercoreServer: !!window.GLOBAL && GLOBAL.system && GLOBAL.system.couriercoreServer || "https://xiaoxi.alipay.com/",
				apiCount: "{personalServer}/user/msgcenter/getMsgInfosNew.json",
				apiList: "{couriercoreServer}/messager/getNewMsg.json",
				apiModify: "{couriercoreServer}/messager/modifyMsgStatus.json",
				viewAll: "{couriercoreServer}/messager/new.htm",
				model: {},
				template: a("./message-panel.handlebars"),
				showEmergencyMsg: !1,
				messageSummary: {},
				allowTag: ["br", "a"],
				align: {
					value: {
						baseXY: ["50%", 0],
						selfXY: ["50%", 0]
					}
				},
				duration: 500,
				triggerType: "hover",
				zIndex: 101
			},
			initialize: function(a) {
				h.superclass.initialize.call(this, a), this.on("messageError", function(a, b) {
					"list" == b && ("deny" == a ? this.set("model", {
						denyMsg: !0,
						errorMsg: !0
					}) : "fail" == a && this.set("model", {
						failMsg: !0,
						errorMsg: !0
					}), this.renderPartial(".message-panel"))
				}), this.getMessageCount(), this.before("show", function() {
					var a = this.get("model");
					return "emptyMsg" in a && a.emptyMsg ? !1 : this.get("_visible") ? !1 : (this.set("_visible", !0), void 0)
				}), this.after("show", function() {
					this._getMessageList(), this._adjustUI(), this._processDragDown()
				}), this.before("hide", this._hideAnimated), this.on("animated", this._onAnimated);
				var b = this;
				this.get("trigger").on("click", function(a) {
					b.get("messageSummary").total > 0 && a.preventDefault()
				})
			},
			events: {
				"mouseover .message-panel-list tr": function(a) {
					e("td", a.currentTarget).addClass("message-panel-item-hover")
				},
				"mouseout .message-panel-list tr": function(a) {
					e("td", a.currentTarget).removeClass("message-panel-item-hover")
				},
				"click .message-panel-list .message-panel-delete a": function(a) {
					a.preventDefault()
				},
				"click .message-emergency-delete": function(a) {
					a.preventDefault()
				},
				"click .message-emergency a": function(a) {
					this.setMessageStatus(e(a.currentTarget).data("id"), "2"), this._emergencyMsgDeleted = !0;
					var b = this.get("model");
					b.emergencyMsg = !1, this.set("model", b), this.set("messageSummary", {
						total: this.get("messageSummary").total - 1
					}), this.hide()
				},
				"click .message-panel-list a": "_processDelete",
				"click .message-panel-toggle": function() {
					this.hide()
				},
				"transitionend .message-panel": "_onAnimated",
				"webkitTransitionEnd .message-panel": "_onAnimated"
			},
			_onChangeModel: function(a) {
				var b = 0,
					c = 0;
				return a && "msgList" in a ? (e(a.msgList).each(function(a, d) {
					"0" == d.status && b++, "2" != d.status && c++
				}), this.set("messageSummary", {
					total: c,
					unread: b
				}), 0 == c ? (a.errorMsg = !0, a.emptyMsg = !0, a.msgList = null) : (a.errorMsg = !1, a.emptyMsg = !1), a) : void 0
			},
			_onChangeMessageSummary: function(a) {
				"undefined" == typeof a.total && (a.total = this.get("messageSummary").total), "undefined" == typeof a.unread && (a.unread = this.get("messageSummary").unread);
				var b = {
					total: a.total < 0 ? 0 : a.total,
					unread: a.total > 0 && a.unread
				};
				return this.trigger("messageChange", b), b
			},
			_processRead: function() {
				var a = [],
					b = [],
					c = this.get("model");
				!!c && "msgList" in c && e(c.msgList).each(function(c, d) {
					"status" in d && 0 == 1 * d.status && (a.push(d.id), b.push(d))
				});
				var d = this;
				this.setMessageStatus(a, "1", function() {
					e(b).each(function(a, b) {
						b.status = "1"
					}), d.set("model", c)
				})
			},
			_processDelete: function(a) {
				var b = this;
				e(a.currentTarget).data("delete") && this.setMessageStatus(e(a.currentTarget).data("id"), "2", function(a) {
					this.$("#J-msg-delete-" + a).remove(), this.$("table").height() < 348 && (this.$(".message-panel-list").height(this.$("table").height()), this._setPosition());
					var c = b.get("model");
					e(c.msgList).each(function(b, c) {
						return c.id == a ? (c.status = "2", c.deleted = !0, !1) : void 0
					}), b.set("model", c), 0 == b.get("messageSummary").total && b.renderPartial(".message-panel")
				})
			},
			_transitionEnabled: function(a) {
				var b = a.style;
				return "transition" in b || "webkitTransition" in b || "WebkitTransition" in b || "mozTransition" in b || "MozTransition" in b || "oTransition" in b || "OTransition" in b || "msTransition" in b || "MsTransition" in b
			},
			_processDragDown: function() {
				this.$(".message-panel")[0] && this._transitionEnabled(this.element[0]) && 1 == this.get("_visible") ? (this._transitionAnimate(!0), this.set("visible", !0)) : this._transitionEnabled(this.element[0]) || this.$(".message-panel").css("visibility", "visible")
			},
			_transitionAnimate: function(a) {
				var b = this;
				this.element.css("display", "block");
				var c = this.$(".message-panel").height() + this.$(".message-panel-toggle").height();
				this.$(".message-panel").css({
					top: a ? -1 * c : 0
				}), setTimeout(function() {
					b._cssTransition(b.$(".message-panel").css({
						visibility: "visible",
						top: a ? 0 : -1 * c
					}), "top " + b.get("duration") / 1e3 + "s ease-in-out")
				}, 0)
			},
			_cssTransition: function(a, b) {
				a.css({
					transition: b,
					"-webkit-transition": b,
					"-moz-transition": b,
					"-o-transition": b,
					"-ms-transition": b
				})
			},
			_hideAnimated: function() {
				return this.set("_visible", !1), this.$(".message-panel")[0] && this._transitionEnabled(this.element[0]) && "block" == this.element.css("display") ? (this._transitionAnimate(!1), !1) : void 0
			},
			_onAnimated: function() {
				this.$(".message-panel")[0] && this.$(".message-panel").position().top < 0 && this.set("visible", !1)
			},
			_urlRender: function(a) {
				var b = this;
				return a ? a.replace(/\{(.*?)\}/g, function(a, c) {
					return b.get(c) ? b.get(c) : ""
				}) : a
			},
			show: function() {
				var a = this.get("model");
				return a.viewAll = this._urlRender(this.get("viewAll")), this.element.css({
					padding: "0 10px 25px 10px",
					overflow: "hidden"
				}), 0 == this.get("messageSummary").total ? !1 : (this.renderPartial(), h.superclass.show.call(this))
			},
			_adjustUI: function() {
				this.$(".message-panel-list").height() > 348 && (this.$(".message-panel-list").height(348), this._setPosition()), h.adjustContentTip(this.element)
			},
			getMessageCount: function() {
				var a = this,
					b = this.get("model");
				b && b.msgList || e.ajax({
					url: this._urlRender(this.get("apiCount")),
					jsonpCallback: "callback",
					jsonp: "_callback",
					dataType: "jsonp",
					success: function(b) {
						if ("ok" != b.stat) return a.trigger("messageError", b.stat, "count");
						var c = {
							total: b.totalCount || 0,
							unread: 0 == b.isRead || "false" == b.isRead
						};
						a.set("messageSummary", c), a.get("showEmergencyMsg") && b.popMsg && b.infos.length > 0 && (a.set("showEmergencyMsg", !1), a._showEmergencyMsg(b.infos[0]))
					}
				})
			},
			_getMessageList: function() {
				var a = this.get("model");
				if (0 == this.get("messageSummary").total) return !1;
				if (!this._emergencyMsgDeleted || a && a.msgList) return !0;
				if (a && !a.emergencyMsg || a.errorMsg) {
					var b = this;
					e.ajax({
						url: this._urlRender(this.get("apiList")),
						jsonpCallback: "callback",
						jsonp: "_callback",
						dataType: "jsonp",
						success: function(c) {
							if ("ok" != c.stat) return b.trigger("messageError", c.stat, "list");
							var d = c.info;
							e(d).each(function(a, c) {
								if (1 == c.appearance) {
									var d;
									e(c.stepList).each(function(a, b) {
										return b.stepOrder == c.currentStep ? (b.isCurrentStep = !0, c.correct || (b.isFailStep = !0), d = b, !1) : (b.isHistoryStep = !0, void 0)
									}), d && (c.contentTip = d.content || ""), c.stepLength = c.stepList.length
								}
								c.isEmergency = 9 == 1 * c.priority, c.allowTag = b.get("allowTag")
							}), a.msgList = d, b.set("model", a), b.renderPartial(".message-panel"), b.$(".message-panel").css("visibility", "visible"), b._adjustUI(), b._processRead()
						}
					})
				}
			},
			setMessageStatus: function(a, b, c) {
				if (a && 0 != a.length) {
					var d = {
							status: b,
							ids: a instanceof Array ? a.join(",") : a
						},
						f = this;
					e.ajax({
						url: this._urlRender(this.get("apiModify")),
						data: d,
						jsonpCallback: "callback",
						jsonp: "_callback",
						dataType: "jsonp",
						success: function(b) {
							return "ok" != b.stat ? f.trigger("messageError", b.stat, "modify") : ("function" == typeof c && c.call(f, a), void 0)
						}
					})
				}
			},
			_emergencyMsgDeleted: !0,
			_showEmergencyMsg: function(a) {
				var b = this.get("model") || {};
				"content" in a && 0 == a.content.length || (a.content.length + a.title.length > 42 && (a.content && a.content.length > 144 && (a.content = a.content.substr(0, 143) + "..."), a.multiline = !0), b.emergencyMsg = a, this.set("model", b), this._emergencyMsgDeleted = !1, this.before("hide", function() {
					return this._emergencyMsgDeleted ? void 0 : !1
				}), this.show())
			}
		});
	h.adjustContentTip = function(a) {
		"width" in e(a) && !e(a).width() || e(a).find(".ui-poptip").each(function(a, b) {
			var c = e(".message-step-current .message-step-point", b.parentNode);
			if ("undefined" != typeof c[0]) {
				var d = e(b.parentNode).width() - 93;
				e(b).width() > d && e(b).width(d), e(".message-step-fail-placeholder", b.parentNode).height(e(b).height()), g.pin(b, {
					element: c,
					x: "100%-" + (e(b).width() - 12) + "px",
					y: "100%-" + (e(b).height() + 28) + "px"
				}), e(b).height(), e(b).position().left < -12 && (e(".ui-poptip-arrow", b).removeClass("ui-poptip-arrow-5").addClass("ui-poptip-arrow-7"), d = e(b.parentNode).width() - c.position().left, e(b).width() > d && e(b).width(d), e(".message-step-fail-placeholder", b.parentNode).height(e(b).height()), g.pin(b, {
					element: e(".message-step-current .message-step-point", b.parentNode),
					x: "-10px",
					y: "100%-" + (e(b).height() + 28) + "px"
				}))
			}
		})
	}, h.tagFilter = function(a, b) {
		var b = "(" + b.join("|") + ")";
		return "string" == typeof a ? a.replace(/<[\/]?([a-z]+)[ ]?[^<]*[\/]?>/gi, function(a, c) {
			return c.match(new RegExp(b, "i")) ? a : a.replace("<", "&lt;").replace(">", "&gt;")
		}) : void 0
	}, c.exports = h, c.exports.outerBoxClass = "alipay-message-panel-1_0_2"
}), define("alipay/message-panel/1.0.2/message-panel.css", [], function() {
	seajs.importStyle(".alipay-message-panel-1_0_2 table,.alipay-message-panel-1_0_2 tr,.alipay-message-panel-1_0_2 td,.alipay-message-panel-1_0_2 h3,.alipay-message-panel-1_0_2 h4,.alipay-message-panel-1_0_2 .message-panel p{margin:0;padding:0;border-spacing:0}.alipay-message-panel-1_0_2 .ui-poptip{float:left}.alipay-message-panel-1_0_2 .ui-poptip-box{margin-left:0;min-height:0;_height:auto}.alipay-message-panel-1_0_2 .message-panel{width:842px;border:1px solid #b4b4b4;border-top:0;background:#fafafa;border-radius:0 0 5px 5px;box-shadow:0 6px 10px #999;font-size:12px;line-height:18px;font-family:tahoma,arial,'Hiragino Sans GB','Microsoft Yahei','\\u5B8B\\u4F53';position:relative;visibility:hidden}.alipay-message-panel-1_0_2 .message-panel-container{zoom:1}.alipay-message-panel-1_0_2 .message-panel-title,.alipay-message-panel-1_0_2 .message-panel-viewall{background:#edf0f7;color:#647892;font-size:13px;font-weight:bolder;padding:8px 20px;margin:0}.alipay-message-panel-1_0_2 .message-panel-toggle{width:90px;height:25px;overflow:hidden;text-align:center;position:absolute;margin-left:376px}.alipay-message-panel-1_0_2 .message-panel-toggle .iconfont-back{display:block;line-height:78px;font-size:76px;margin:0 auto;top:-58px;position:relative;cursor:pointer;color:#fc6621;text-shadow:0 3px 10px #999}.alipay-message-panel-1_0_2 .message-panel-toggle .iconfont-fold{position:relative;display:block;width:100%;text-align:center;float:left;margin-top:-80px;color:#fff;font-size:12px;line-height:16px;cursor:pointer}.alipay-message-panel-1_0_2 .message-panel-list{overflow:auto;overflow-x:hidden;max-height:348px;width:100%;position:relative;border-top:1px solid #e2e2e2;border-bottom:1px solid #e2e2e2}.alipay-message-panel-1_0_2 .message-panel-list table{margin-top:-1px}.alipay-message-panel-1_0_2 .message-panel-list a{color:#4c4c4c;text-decoration:none}.alipay-message-panel-1_0_2 .message-panel-list a:hover{text-decoration:underline}.alipay-message-panel-1_0_2 .message-panel-list td{padding:11px 15px 10px 20px;vertical-align:middle;border-top:1px solid #e2e2e2}.alipay-message-panel-1_0_2 .message-panel-item-content{position:relative;zoom:1}.alipay-message-panel-1_0_2 .message-panel-list .message-panel-item-hover{background:#f2f2f2}.alipay-message-panel-1_0_2 .message-panel-item-title{border-right:1px dotted #c8c8c8;color:#9a9a9a;width:21%}.alipay-message-panel-1_0_2 .message-panel-item-title h4{font-weight:bolder;font-size:14px;color:#353034;line-height:23px}.alipay-message-panel-1_0_2 .message-panel-item-title p{padding-bottom:3px}.alipay-message-panel-1_0_2 .ui-msgpael-warn,.alipay-message-panel-1_0_2 .ui-msgpael-warn a{font-weight:bolder;color:#e10a1f}.alipay-message-panel-1_0_2 .message-panel-viewall{text-align:right;-moz-border-radius:0 0 3px 3px;-webkit-border-radius:0 0 3px 3px;border-radius:0 0 3px 3px}.alipay-message-panel-1_0_2 .message-panel-viewall a{color:#1589cd;font-weight:400;font-size:12px}.alipay-message-panel-1_0_2 table tr td .message-panel-delete{vertical-align:50%;float:right;width:18px;height:18px;line-height:18px;overflow:hidden;display:none;margin-top:-9px;position:absolute;right:3px;top:50%}.alipay-message-panel-1_0_2 a.message-panel-detail{color:#1589ca;float:right;margin:-10px 10px 0 0;top:50%;position:absolute;right:23px;z-index:100}.alipay-message-panel-1_0_2 .message-panel-delete a.iconfont{font-size:18px;color:#ccc;text-decoration:none;cursor:pointer}.alipay-message-panel-1_0_2 .message-panel .message-panel-delete a.iconfont:hover{color:#666;text-decoration:none}.alipay-message-panel-1_0_2 table tr td.message-panel-item-hover .message-panel-delete{display:block}.alipay-message-panel-1_0_2 .message-panel .fn-clear{zoom:1}.alipay-message-panel-1_0_2 .message-panel .fn-clear:before,.alipay-message-panel-1_0_2 .message-panel .fn-clear:after{content:\"\";display:table}.alipay-message-panel-1_0_2 .message-panel .fn-clear:after{clear:both}.alipay-message-panel-1_0_2 .message-step{padding:18px 50px 10px 20px}.alipay-message-panel-1_0_2 .message-step-item{width:250px;border-top:2px solid #999;color:#999;float:left}.alipay-message-panel-1_0_2 .message-step-2{width:476px}.alipay-message-panel-1_0_2 .message-step-3{width:238px}.alipay-message-panel-1_0_2 .message-step-4{width:158px}.alipay-message-panel-1_0_2 .message-step-5{width:119px}.alipay-message-panel-1_0_2 .message-step-point{width:25px;height:30px;overflow:hidden;position:relative;left:10px;text-align:center;margin-top:-19px;font-size:25px;line-height:30px;_line-height:32px;float:right}.alipay-message-panel-1_0_2 .message-step-desc{width:66%;position:relative;left:67%;text-align:center;line-height:14px;padding-top:2px;clear:both}.alipay-message-panel-1_0_2 .message-step-title{display:block}.alipay-message-panel-1_0_2 .message-step-first{width:20px;border-top:0;padding-top:2px;*overflow:hidden}.alipay-message-panel-1_0_2 .message-step-first .message-step-desc{width:100px;left:-35px}.alipay-message-panel-1_0_2 .message-step-current{border-color:#b9d384;color:#b9d384}.alipay-message-panel-1_0_2 .message-step-done{border-color:#b9d384;color:#999}.alipay-message-panel-1_0_2 .message-step-done .message-step-point{color:#b9d384}.alipay-message-panel-1_0_2 .message-step-fail{border-color:#fd985a;color:#fc6521}.alipay-message-panel-1_0_2 .message-step-fail .message-step-point{color:#fd985a}.alipay-message-panel-1_0_2 .message-step-date{color:#999;font-size:11px;line-height:12px}.alipay-message-panel-1_0_2 .message-step-pointmask{font-size:9px;position:relative;top:-19px}.alipay-message-panel-1_0_2 .message-step-fail-placeholder{line-height:30px;height:30px;visibility:hidden;overflow:hidden}.alipay-message-panel-1_0_2 .message-emergency{background:#fb6720;padding:6px 10px;border-top:1px solid #d6561a;color:#fff;font-size:12px;border-radius:0 0 3px 3px;box-shadow:0 2px 6px #666;line-height:20px;width:580px;position:relative}.alipay-message-panel-1_0_2 .message-emergency a,.alipay-message-panel-1_0_2 .message-emergency span{color:#fff;text-decoration:none;float:left}.alipay-message-panel-1_0_2 .message-emergency-multiline a,.alipay-message-panel-1_0_2 .message-emergency-multiline span,.alipay-message-panel-1_0_2 .message-emergency-multiline em{display:block;float:none;clear:both}.alipay-message-panel-1_0_2 .message-emergency-multiline a,.alipay-message-panel-1_0_2 .message-emergency-multiline span{white-space:normal;word-break:break-all;max-width:580px;overflow:hidden}.alipay-message-panel-1_0_2 .message-emergency a:hover{text-decoration:underline}.alipay-message-panel-1_0_2 .message-emergency em{font-size:13px;font-weight:700;font-style:normal;margin-right:16px;float:left}.alipay-message-panel-1_0_2 .message-emergency .message-emergency-delete{font-size:12px;margin-left:10px;float:right}.alipay-message-panel-1_0_2 .message-emergency-multiline .message-emergency-delete{position:absolute;right:10px;top:6px;margin-left:0}.alipay-message-panel-1_0_2 .message-emergency .message-emergency-delete .iconfont{cursor:pointer}.alipay-message-panel-1_0_2 .message-emergency .message-emergency-delete:hover{text-shadow:0 0 3px #fff;text-decoration:none}.alipay-message-panel-1_0_2 .ui-poptip{color:#DB7C22;z-index:101;font-size:12px;line-height:1.5;zoom:1}.alipay-message-panel-1_0_2 .ui-poptip-shadow{background-color:rgba(229,169,107,.15);FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#26e5a96b, endColorstr=#26e5a96b);border-radius:2px;padding:2px;zoom:1;_display:inline}.alipay-message-panel-1_0_2 .ui-poptip-container{position:relative;background-color:#FFFCEF;border:1px solid #ffbb76;border-radius:2px;padding:5px 15px;zoom:1;_display:inline}.alipay-message-panel-1_0_2 .ui-poptip:after,.alipay-message-panel-1_0_2 .ui-poptip-shadow:after,.alipay-message-panel-1_0_2 .ui-poptip-container:after{visibility:hidden;display:block;font-size:0;content:\" \";clear:both;height:0}.alipay-message-panel-1_0_2 a.ui-poptip-close{position:absolute;right:3px;top:3px;border:1px solid #ffc891;text-decoration:none;border-radius:3px;width:12px;height:12px;font-family:tahoma;color:#dd7e00;line-height:10px;*line-height:12px;text-align:center;font-size:14px;background:#ffd7af;background:-webkit-gradient(linear,left top,left bottom,from(#FFF0E1),to(#FFE7CD));background:-moz-linear-gradient(top,#FFF0E1,#FFE7CD);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFF0E1', endColorstr='#FFE7CD');background:-o-linear-gradient(top,#FFF0E1,#FFE7CD);background:linear-gradient(top,#FFF0E1,#FFE7CD);overflow:hidden}.alipay-message-panel-1_0_2 a.ui-poptip-close:hover{border:1px solid #ffb24c;text-decoration:none;color:#dd7e00;background:#ffd7af;background:-webkit-gradient(linear,left top,left bottom,from(#FFE5CA),to(#FFCC98));background:-moz-linear-gradient(top,#FFE5CA,#FFCC98);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFE5CA', endColorstr='#FFCC98');background:-o-linear-gradient(top,#FFE5CA,#FFCC98);background:linear-gradient(top,#FFE5CA,#FFCC98)}.alipay-message-panel-1_0_2 .ui-poptip-arrow{position:absolute;z-index:10;*zoom:1}.alipay-message-panel-1_0_2 .ui-poptip-arrow em,.alipay-message-panel-1_0_2 .ui-poptip-arrow span{position:absolute;*zoom:1;width:0;height:0;border-color:rgba(255,255,255,0);border-color:transparent\\0;*border-color:transparent;_border-color:tomato;_filter:chroma(color=tomato);border-style:solid;overflow:hidden;top:0;left:0}.alipay-message-panel-1_0_2 .ui-poptip-arrow-10{left:-6px;top:10px}.alipay-message-panel-1_0_2 .ui-poptip-arrow-10 em{top:0;left:-1px;border-right-color:#ffbb76;border-width:6px 6px 6px 0}.alipay-message-panel-1_0_2 .ui-poptip-arrow-10 span{border-right-color:#FFFCEF;border-width:6px 6px 6px 0}.alipay-message-panel-1_0_2 .ui-poptip-arrow-2{top:10px;right:0}.alipay-message-panel-1_0_2 .ui-poptip-arrow-2 em{top:0;left:1px;border-left-color:#ffbb76;border-width:6px 0 6px 6px}.alipay-message-panel-1_0_2 .ui-poptip-arrow-2 span{border-left-color:#FFFCEF;border-width:6px 0 6px 6px}.alipay-message-panel-1_0_2 .ui-poptip-arrow-11 em,.alipay-message-panel-1_0_2 .ui-poptip-arrow-1 em{border-width:0 6px 6px;border-bottom-color:#ffbb76;top:-1px;left:0}.alipay-message-panel-1_0_2 .ui-poptip-arrow-11 span,.alipay-message-panel-1_0_2 .ui-poptip-arrow-1 span{border-width:0 6px 6px;border-bottom-color:#FFFCEF}.alipay-message-panel-1_0_2 .ui-poptip-arrow-11{left:14px;top:-6px}.alipay-message-panel-1_0_2 .ui-poptip-arrow-1{right:28px;top:-6px}.alipay-message-panel-1_0_2 .ui-poptip-arrow-5 em,.alipay-message-panel-1_0_2 .ui-poptip-arrow-7 em{border-width:6px 6px 0;border-top-color:#ffbb76;top:1px;left:0}.alipay-message-panel-1_0_2 .ui-poptip-arrow-5 span,.alipay-message-panel-1_0_2 .ui-poptip-arrow-7 span{border-width:6px 6px 0;border-top-color:#FFFCEF}.alipay-message-panel-1_0_2 .ui-poptip-arrow-5{right:28px;bottom:0}.alipay-message-panel-1_0_2 .ui-poptip-arrow-7{left:14px;bottom:0}:root .alipay-message-panel-1_0_2 .ui-poptip-shadow{FILTER:none\\9}.alipay-message-panel-1_0_2 .ui-poptip-blue{color:#4d4d4d}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-shadow{background-color:rgba(0,0,0,.05);FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#0c000000, endColorstr=#0c000000)}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-container{background-color:#F8FCFF;border:1px solid #B9C8D3}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-10 em{border-right-color:#B9C8D3}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-11 em,.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-1 em{border-bottom-color:#B9C8D3}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-2 em,.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-4 em{border-left-color:#B9C8D3}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-5 em,.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-7 em{border-top-color:#B9C8D3}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-10 span{border-right-color:#F8FCFF}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-11 span,.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-1 span{border-bottom-color:#F8FCFF}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-2 span,.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-4 span{border-left-color:#F8FCFF}.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-5 span,.alipay-message-panel-1_0_2 .ui-poptip-blue .ui-poptip-arrow-7 span{border-top-color:#F8FCFF}.alipay-message-panel-1_0_2 .ui-poptip-white{color:#333}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-shadow{background-color:rgba(0,0,0,.05);FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#0c000000, endColorstr=#0c000000)}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-container{background-color:#fff;border:1px solid #b1b1b1}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-10 em{border-right-color:#b1b1b1}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-11 em,.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-1 em{border-bottom-color:#b1b1b1}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-2 em,.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-4 em{border-left-color:#b1b1b1}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-5 em,.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-7 em{border-top-color:#b1b1b1}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-10 span{border-right-color:#fff}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-11 span,.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-1 span{border-bottom-color:#fff}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-2 span,.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-4 span{border-left-color:#fff}.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-5 span,.alipay-message-panel-1_0_2 .ui-poptip-white .ui-poptip-arrow-7 span{border-top-color:#fff}.alipay-message-panel-1_0_2 .ui-loading{width:50px;height:50px;background-repeat:no-repeat;background-image:url('data:image/gif;base64,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');*background-image:url(https://i.alipayobjects.com/e/201305/M9UQl3TuH.gif);text-align:center;line-height:50px;font-size:11px;color:#777}")
}), define("alipay/message-panel/1.0.2/message-panel.handlebars", ["gallery/handlebars/1.0.2/runtime"], function(a, b, c) {
	var d = a("gallery/handlebars/1.0.2/runtime"),
		e = d.template;
	c.exports = e(function(a, b, c, d, e) {
		function f(a, b) {
			var d, e, f = "";
			return f += '\n<div class="message-emergency', e = c["if"].call(a, (d = a.emergencyMsg, null == d || d === !1 ? d : d.multiline), {
				hash: {},
				inverse: L.noop,
				fn: L.program(2, g, b),
				data: b
			}), (e || 0 === e) && (f += e), f += ' fn-clear">\n    <a href="#delete" data-id="' + K((d = a.emergencyMsg, d = null == d || d === !1 ? d : d.id, typeof d === J ? d.apply(a) : d)) + '" class="message-emergency-delete" target="_blank"><i class="iconfont" title="鍏抽棴">&#xF028;</i></a>\n    <em>' + K((d = a.emergencyMsg, d = null == d || d === !1 ? d : d.title, typeof d === J ? d.apply(a) : d)) + "</em> ", e = c.unless.call(a, (d = a.emergencyMsg, null == d || d === !1 ? d : d.url), {
				hash: {},
				inverse: L.noop,
				fn: L.program(4, h, b),
				data: b
			}), (e || 0 === e) && (f += e), f += " ", e = c["if"].call(a, (d = a.emergencyMsg, null == d || d === !1 ? d : d.url), {
				hash: {},
				inverse: L.noop,
				fn: L.program(6, i, b),
				data: b
			}), (e || 0 === e) && (f += e), f += " \n<div>\n"
		}

		function g() {
			return " message-emergency-multiline"
		}

		function h(a) {
			var b, c = "";
			return c += "<span>" + K((b = a.emergencyMsg, b = null == b || b === !1 ? b : b.content, typeof b === J ? b.apply(a) : b)) + "</span>"
		}

		function i(a) {
			var b, c = "";
			return c += '<a href="' + K((b = a.emergencyMsg, b = null == b || b === !1 ? b : b.url, typeof b === J ? b.apply(a) : b)) + '" data-id="' + K((b = a.emergencyMsg, b = null == b || b === !1 ? b : b.id, typeof b === J ? b.apply(a) : b)) + '" target="_blank">' + K((b = a.emergencyMsg, b = null == b || b === !1 ? b : b.content, typeof b === J ? b.apply(a) : b)) + "</a>"
		}

		function j(a, b) {
			var d, e = "";
			return e += '\n<div class="message-panel">\n    <div class="message-panel-container">\n        <h3 class="message-panel-title">娑堟伅</h3>\n        <div class="message-panel-list">\n            <table width="100%">\n                <tbody>\n                    ', d = c.unless.call(a, a.msgList, {
				hash: {},
				inverse: L.noop,
				fn: L.program(9, k, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                    ", d = c.each.call(a, a.msgList, {
				hash: {},
				inverse: L.noop,
				fn: L.program(19, q, b),
				data: b
			}), (d || 0 === d) && (e += d), e += '\n                </tbody>\n            </table>\n        </div>\n        <div class="message-panel-viewall">\n            <a href="', (d = c.viewAll) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.viewAll, d = typeof d === J ? d.apply(a) : d), e += K(d) + '" target="_blank" seed="msg-whole-detail-v1">鏌ョ湅鍏ㄩ儴娑堟伅 <i class="iconfont">&#xF036;</i></a>\n        </div>\n    </div>\n    <div class="message-panel-toggle fn-clear" seed="msg-fold"><i class="iconfont iconfont-back" title="鏀惰捣">&#xF044;</i><i class="iconfont iconfont-fold" title="鏀惰捣">&#xF03B;</i></div>\n</div>\n'
		}

		function k(a, b) {
			var d, e = "";
			return e += '\n                    <tr>\n                        <td align="center">\n                            ', d = c["if"].call(a, a.errorMsg, {
				hash: {},
				inverse: L.noop,
				fn: L.program(10, l, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                            ", d = c.unless.call(a, a.errorMsg, {
				hash: {},
				inverse: L.noop,
				fn: L.program(17, p, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                        </td>\n                    </tr>\n                    "
		}

		function l(a, b) {
			var d, e = "";
			return e += "\n                            ", d = c["if"].call(a, a.denyMsg, {
				hash: {},
				inverse: L.noop,
				fn: L.program(11, m, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                            ", d = c["if"].call(a, a.failMsg, {
				hash: {},
				inverse: L.noop,
				fn: L.program(13, n, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                            ", d = c["if"].call(a, a.emptyMsg, {
				hash: {},
				inverse: L.noop,
				fn: L.program(15, o, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                            "
		}

		function m() {
			return "\n                            <div>鐧诲綍瓒呮椂锛岃鐧诲綍鍚庨噸璇曘€�</div>\n                            "
		}

		function n() {
			return "\n                            <div>鍔犺浇澶辫触锛岃閲嶈瘯銆�</div>\n                            "
		}

		function o() {
			return '\n                            <div>\n                               <img src="https://i.alipayobjects.com/e/201310/1HC4IMqPGJ.png" width="80" height="75" alt="娌℃湁鏂版秷鎭�" align="absmiddle"> &nbsp;&nbsp;&nbsp; 娌℃湁鍙戠幇鏂版秷鎭€俓n                            </div>\n                            '
		}

		function p() {
			return '\n                            <div class="ui-loading">Loading</div>\n                            '
		}

		function q(a, b) {
			var d, e = "";
			return e += "\n                    ", d = c["if"].call(a, a.appearance, {
				hash: {},
				inverse: L.noop,
				fn: L.program(20, r, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                    ", d = c.unless.call(a, a.appearance, {
				hash: {},
				inverse: L.noop,
				fn: L.program(37, B, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                    "
		}

		function r(a, b) {
			var d, e = "";
			return e += "\n                    ", d = c.unless.call(a, a.deleted, {
				hash: {},
				inverse: L.noop,
				fn: L.program(21, s, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                    "
		}

		function s(a, b) {
			var d, e, f, g = "";
			return g += '\n                    <tr id="J-msg-delete-', (d = c.id) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.id, d = typeof d === J ? d.apply(a) : d), g += K(d) + '">\n                        <td class="message-panel-item-title">\n                            <h4>', (d = c.title) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.title, d = typeof d === J ? d.apply(a) : d), g += K(d) + "</h4>\n                            <p>", f = {
				hash: {},
				data: b
			}, d = c.spec_tag, e = d ? d.call(a, a.content, f) : M.call(a, "spec_tag", a.content, f), (e || 0 === e) && (g += e), g += '</p>\n                        </td>\n                        <td>\n                            <div class="message-panel-item-content">\n                                ', e = c["if"].call(a, a.canDeleted, {
				hash: {},
				inverse: L.noop,
				fn: L.program(22, t, b),
				data: b
			}), (e || 0 === e) && (g += e), g += "\n                                ", e = c["if"].call(a, a.url, {
				hash: {},
				inverse: L.noop,
				fn: L.program(24, u, b),
				data: b
			}), (e || 0 === e) && (g += e), g += "\n                                ", e = c["if"].call(a, a.contentTip, {
				hash: {},
				inverse: L.noop,
				fn: L.program(26, v, b),
				data: b
			}), (e || 0 === e) && (g += e), g += '\n                                <div class="message-step fn-clear">\n                                    ', e = c.each.call(a, a.stepList, {
				hash: {},
				inverse: L.noop,
				fn: L.programWithDepth(28, w, b, a),
				data: b
			}), (e || 0 === e) && (g += e), g += "\n                                </div>\n                            </div>\n                        </td>\n                    </tr>\n                    "
		}

		function t(a, b) {
			var d, e = "";
			return e += '\n                                <div class="message-panel-delete">\n                                    <a class="iconfont" data-delete="true" data-id="', (d = c.id) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.id, d = typeof d === J ? d.apply(a) : d), e += K(d) + '" href="#" title="鍒犻櫎娑堟伅">&#xF045;</a>\n                                </div>\n                                '
		}

		function u(a, b) {
			var d, e = "";
			return e += '\n                                <a href="', (d = c.url) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.url, d = typeof d === J ? d.apply(a) : d), e += K(d) + '" data-delete="', (d = c.deleteOnClick) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.deleteOnClick, d = typeof d === J ? d.apply(a) : d), e += K(d) + '" data-id="', (d = c.id) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.id, d = typeof d === J ? d.apply(a) : d), e += K(d) + '" class="message-panel-detail" target="_blank" seed="msg-detail-v1">璇︽儏</a>\n                                '
		}

		function v(a, b) {
			var d, e, f, g = "";
			return g += '\n                                <div class="ui-poptip ui-poptip-yellow">\n                                    <div class="ui-poptip-shadow">\n                                        <div class="ui-poptip-container">\n                                            <div class="ui-poptip-arrow ui-poptip-arrow-5" data-role="arrow">\n                                                <em></em>\n                                                <span></span>\n                                            </div>\n                                            <div class="ui-poptip-box ui-poptip-box-text" data-role="content">\n                                                <div class="ui-poptip-text" data-role="text">', f = {
				hash: {},
				data: b
			}, d = c.spec_tag, e = d ? d.call(a, a.contentTip, f) : M.call(a, "spec_tag", a.contentTip, f), (e || 0 === e) && (g += e), g += '</div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="message-step-fail-placeholder">', f = {
				hash: {},
				data: b
			}, d = c.spec_tag, e = d ? d.call(a, a.contentTip, f) : M.call(a, "spec_tag", a.contentTip, f), (e || 0 === e) && (g += e), g += "</div>\n                                "
		}

		function w(a, b, d) {
			var e, f, g = "";
			return g += '\n                                    <div class="message-step-item message-step-' + K((e = d.stepLength, typeof e === J ? e.apply(a) : e)) + " ", f = c.unless.call(a, b.index, {
				hash: {},
				inverse: L.noop,
				fn: L.program(29, x, b),
				data: b
			}), (f || 0 === f) && (g += f), f = c["if"].call(a, a.isHistoryStep, {
				hash: {},
				inverse: L.noop,
				fn: L.program(31, y, b),
				data: b
			}), (f || 0 === f) && (g += f), f = c["if"].call(a, a.isFailStep, {
				hash: {},
				inverse: L.noop,
				fn: L.program(33, z, b),
				data: b
			}), (f || 0 === f) && (g += f), f = c["if"].call(a, a.isCurrentStep, {
				hash: {},
				inverse: L.noop,
				fn: L.program(35, A, b),
				data: b
			}), (f || 0 === f) && (g += f), g += '">\n                                        <div class="message-step-point">&#9679;</div>\n                                        <div class="message-step-desc">\n                                            <span class="message-step-title">', (f = c.title) ? f = f.call(a, {
				hash: {},
				data: b
			}) : (f = a.title, f = typeof f === J ? f.apply(a) : f), g += K(f) + '</span>\n                                            <span class="message-step-date">', (f = c.stepTime) ? f = f.call(a, {
				hash: {},
				data: b
			}) : (f = a.stepTime, f = typeof f === J ? f.apply(a) : f), g += K(f) + "</span>\n                                        </div>\n                                    </div>\n                                    "
		}

		function x() {
			return " message-step-first"
		}

		function y() {
			return " message-step-done"
		}

		function z() {
			return " message-step-fail"
		}

		function A() {
			return " message-step-current"
		}

		function B(a, b) {
			var d, e = "";
			return e += "\n                    ", d = c.unless.call(a, a.deleted, {
				hash: {},
				inverse: L.noop,
				fn: L.program(38, C, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                    "
		}

		function C(a, b) {
			var d, e = "";
			return e += '\n                    <tr id="J-msg-delete-', (d = c.id) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.id, d = typeof d === J ? d.apply(a) : d), e += K(d) + '">\n                        <td class="message-panel-item-title">\n                            <h4>', (d = c.title) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.title, d = typeof d === J ? d.apply(a) : d), e += K(d) + '</h4>\n                        </td>\n                        <td>\n                            <div class="message-panel-item-content', d = c["if"].call(a, a.isEmergency, {
				hash: {},
				inverse: L.noop,
				fn: L.program(39, D, b),
				data: b
			}), (d || 0 === d) && (e += d), e += '">\n                                ', d = c["if"].call(a, a.canDeleted, {
				hash: {},
				inverse: L.noop,
				fn: L.program(22, t, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                                ", d = c["if"].call(a, a.url, {
				hash: {},
				inverse: L.noop,
				fn: L.program(41, E, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                                ", d = c.unless.call(a, a.url, {
				hash: {},
				inverse: L.noop,
				fn: L.program(43, F, b),
				data: b
			}), (d || 0 === d) && (e += d), e += "\n                            </div>\n                        </td>\n                    </tr>\n                    "
		}

		function D() {
			return " ui-msgpael-warn"
		}

		function E(a, b) {
			var d, e, f = "";
			return f += '\n                                <a href="', (d = c.url) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.url, d = typeof d === J ? d.apply(a) : d), f += K(d) + '" data-delete="', (d = c.deleteOnClick) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.deleteOnClick, d = typeof d === J ? d.apply(a) : d), f += K(d) + '" data-id="', (d = c.id) ? d = d.call(a, {
				hash: {},
				data: b
			}) : (d = a.id, d = typeof d === J ? d.apply(a) : d), f += K(d) + '" target="_blank" seed="msg-detail-v1">', e = {
				hash: {},
				data: b
			}, f += K((d = c.spec_tag, d ? d.call(a, a.content, e) : M.call(a, "spec_tag", a.content, e))) + "</a>\n                                "
		}

		function F(a, b) {
			var d, e, f = "";
			return f += "\n                                <span>", e = {
				hash: {},
				data: b
			}, f += K((d = c.spec_tag, d ? d.call(a, a.content, e) : M.call(a, "spec_tag", a.content, e))) + "</span>\n                                "
		}
		this.compilerInfo = [3, ">= 1.0.0-rc.4"], c = c || {};
		for (var G in a.helpers) c[G] = c[G] || a.helpers[G];
		e = e || {};
		var H, I = "",
			J = "function",
			K = this.escapeExpression,
			L = this,
			M = c.helperMissing;
		return I += '<div class="message-wrapper">\n', H = c["if"].call(b, b.emergencyMsg, {
			hash: {},
			inverse: L.noop,
			fn: L.program(1, f, e),
			data: e
		}), (H || 0 === H) && (I += H), I += "\n", H = c.unless.call(b, b.emergencyMsg, {
			hash: {},
			inverse: L.noop,
			fn: L.program(8, j, e),
			data: e
		}), (H || 0 === H) && (I += H), I += "\n</div>"
	})
}), define("gallery/handlebars/1.0.2/runtime", [], function(a, b, c) {
	var d = {};
	! function(a, b) {
		a.VERSION = "1.0.0-rc.4", a.COMPILER_REVISION = 3, a.REVISION_CHANGES = {
			1: "<= 1.0.rc.2",
			2: "== 1.0.0-rc.3",
			3: ">= 1.0.0-rc.4"
		}, a.helpers = {}, a.partials = {};
		var c = Object.prototype.toString,
			d = "[object Function]",
			e = "[object Object]";
		a.registerHelper = function(b, d, f) {
			if (c.call(b) === e) {
				if (f || d) throw new a.Exception("Arg not supported with multiple helpers");
				a.Utils.extend(this.helpers, b)
			} else f && (d.not = f), this.helpers[b] = d
		}, a.registerPartial = function(b, d) {
			c.call(b) === e ? a.Utils.extend(this.partials, b) : this.partials[b] = d
		}, a.registerHelper("helperMissing", function(a) {
			if (2 === arguments.length) return b;
			throw Error("Could not find property '" + a + "'")
		}), a.registerHelper("blockHelperMissing", function(b, e) {
			var f = e.inverse || function() {},
				g = e.fn,
				h = c.call(b);
			return h === d && (b = b.call(this)), b === !0 ? g(this) : b === !1 || null == b ? f(this) : "[object Array]" === h ? b.length > 0 ? a.helpers.each(b, e) : f(this) : g(b)
		}), a.K = function() {}, a.createFrame = Object.create || function(b) {
			a.K.prototype = b;
			var c = new a.K;
			return a.K.prototype = null, c
		}, a.logger = {
			DEBUG: 0,
			INFO: 1,
			WARN: 2,
			ERROR: 3,
			level: 3,
			methodMap: {
				0: "debug",
				1: "info",
				2: "warn",
				3: "error"
			},
			log: function(b, c) {
				if (b >= a.logger.level) {
					var d = a.logger.methodMap[b];
					"undefined" != typeof console && console[d] && console[d].call(console, c)
				}
			}
		}, a.log = function(b, c) {
			a.logger.log(b, c)
		}, a.registerHelper("each", function(b, c) {
			var d, e = c.fn,
				f = c.inverse,
				g = 0,
				h = "";
			if (c.data && (d = a.createFrame(c.data)), b && "object" == typeof b)
				if (b instanceof Array)
					for (var i = b.length; i > g; g++) d && (d.index = g), h += e(b[g], {
						data: d
					});
				else
					for (var j in b) b.hasOwnProperty(j) && (d && (d.key = j), h += e(b[j], {
						data: d
					}), g++);
			return 0 === g && (h = f(this)), h
		}), a.registerHelper("if", function(b, e) {
			var f = c.call(b);
			return f === d && (b = b.call(this)), !b || a.Utils.isEmpty(b) ? e.inverse(this) : e.fn(this)
		}), a.registerHelper("unless", function(b, c) {
			return a.helpers["if"].call(this, b, {
				fn: c.inverse,
				inverse: c.fn
			})
		}), a.registerHelper("with", function(c, d) {
			return a.Utils.isEmpty(c) ? b : d.fn(c)
		}), a.registerHelper("log", function(b, c) {
			var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
			a.log(d, b)
		});
		var f = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
		a.Exception = function() {
			for (var a = Error.prototype.constructor.apply(this, arguments), b = 0; f.length > b; b++) this[f[b]] = a[f[b]]
		}, a.Exception.prototype = Error(), a.SafeString = function(a) {
			this.string = a
		}, a.SafeString.prototype.toString = function() {
			return "" + this.string
		};
		var g = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#x27;",
				"`": "&#x60;"
			},
			h = /[&<>"'`]/g,
			i = /[&<>"'`]/,
			j = function(a) {
				return g[a] || "&amp;"
			};
		a.Utils = {
			extend: function(a, b) {
				for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
			},
			escapeExpression: function(b) {
				return b instanceof a.SafeString ? "" + b : null == b || b === !1 ? "" : (b = "" + b, i.test(b) ? b.replace(h, j) : b)
			},
			isEmpty: function(a) {
				return a || 0 === a ? "[object Array]" === c.call(a) && 0 === a.length ? !0 : !1 : !0
			}
		}, a.VM = {
			template: function(b) {
				var c = {
					escapeExpression: a.Utils.escapeExpression,
					invokePartial: a.VM.invokePartial,
					programs: [],
					program: function(b, c, d) {
						var e = this.programs[b];
						return d ? e = a.VM.program(b, c, d) : e || (e = this.programs[b] = a.VM.program(b, c)), e
					},
					programWithDepth: a.VM.programWithDepth,
					noop: a.VM.noop,
					compilerInfo: null
				};
				return function(d, e) {
					e = e || {};
					var f = b.call(c, a, d, e.helpers, e.partials, e.data),
						g = c.compilerInfo || [],
						h = g[0] || 1,
						i = a.COMPILER_REVISION;
					if (h !== i) {
						if (i > h) {
							var j = a.REVISION_CHANGES[i],
								k = a.REVISION_CHANGES[h];
							throw "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + j + ") or downgrade your runtime to an older version (" + k + ")."
						}
						throw "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + g[1] + ")."
					}
					return f
				}
			},
			programWithDepth: function(a, b, c) {
				var d = Array.prototype.slice.call(arguments, 3),
					e = function(a, e) {
						return e = e || {}, b.apply(this, [a, e.data || c].concat(d))
					};
				return e.program = a, e.depth = d.length, e
			},
			program: function(a, b, c) {
				var d = function(a, d) {
					return d = d || {}, b(a, d.data || c)
				};
				return d.program = a, d.depth = 0, d
			},
			noop: function() {
				return ""
			},
			invokePartial: function(c, d, e, f, g, h) {
				var i = {
					helpers: f,
					partials: g,
					data: h
				};
				if (c === b) throw new a.Exception("The partial " + d + " could not be found");
				if (c instanceof Function) return c(e, i);
				if (a.compile) return g[d] = a.compile(c, {
					data: h !== b
				}), g[d](e, i);
				throw new a.Exception("The partial " + d + " could not be compiled when running in runtime-only mode")
			}
		}, a.template = a.VM.template
	}(d), c.exports = d
}), define("alipay/nav/1.2.12/widget/account", ["arale/popup/1.1.5/popup", "$", "arale/overlay/1.1.3/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/templatable/0.9.2/templatable", "gallery/handlebars/1.0.2/handlebars", "alipay/request/0.9.1/request", "arale/cookie/1.0.2/cookie"], function(a, b, c) {
	function d(a) {
		a = a.replace(/^\s*(.*?)\s*$/g, "$1");
		var b = {
				regxp: /(^.*)(.{3}$)/g,
				placeholder: "$1...",
				leftLimit: 11,
				rightLimit: 7,
				totalLimit: 19
			},
			c = a.split("@"),
			d = c[0],
			e = c[1];
		return c.length > 1 && a.length > b.totalLimit ? (d.length > b.leftLimit && (d = d.slice(0, b.leftLimit).replace(b.regxp, b.placeholder)), e.length > b.rightLimit && (e = e.slice(0, b.rightLimit).replace(b.regxp, b.placeholder)), [d, "@", e].join("").toLowerCase()) : a.toLowerCase()
	}

	function e(a) {
		return a.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
	}

	function f(a) {
		return a.balance ? '<span class="global-account-balance">' + a.balance + "</span>鍏�" : '<a href="#" class="global-account-showbalance" seed="global-showbalance' + a.clickCount + '" data-role="showbalance">鏄剧ず浣欓</a>'
	}
	var g = a("arale/popup/1.1.5/popup"),
		h = a("arale/templatable/0.9.2/templatable"),
		i = a("alipay/request/0.9.1/request"),
		j = 0,
		k = g.extend({
			Implements: h,
			events: {
				"click [data-role=showbalance]": "showBalance"
			},
			parseElement: function() {
				this.set("model", {
					showEmail: e(d(this.get("model").email))
				}), k.superclass.parseElement.call(this)
			},
			show: function() {
				var a = this.get("model");
				!this.get("visible") && a.isLogin && (a.balance = "", a.clickCount = j, this.set("model", a), this.$("[data-role=balance]").html(f(a))), k.superclass.show.call(this)
			},
			showBalance: function(a) {
				a.preventDefault();
				var b = this,
					c = this.get("model"),
					d = c.personalServer + "/user/assets/queryBalance.json?_callback=?";
				j++, i.ajax(d, {
					dataType: "jsonp"
				}).success(function(a) {
					"ok" === a.stat && (c.balance = a.availableAmount, b.set(c, c), b.$("[data-role=balance]").html(f(c)))
				}).error(function() {
					c.balance = "", b.set(c, c), b.$("[data-role=balance]").html(f(c))
				})
			}
		});
	c.exports = k
}), define("alipay/nav/1.2.12/tpl/component-top.tpl", [], '<div class="global-top">\n<div class="global-top-container">\n  <ul class="global-top-right">\n    <li class="global-top-item global-top-item-last">\n      <a id="globalBirthIcon" href="http://abc.alipay.com/jiniance/index.htm" class="global-icon global-icon-birth global-hide" target="_blank"></a>\n      {{#if isLogin}}\n    <li class="global-top-item">浣犲ソ,</li>\n    <li id="globalUser" class="global-top-item">\n      <span class="global-top-text">\n        {{{userName}}}\n        <i class="iconfont global-top-angle">&#xF03C;</i>\n      </span>\n    </li>\n      {{else}}\n      <span class="global-top-text">娆㈣繋浣跨敤鏀粯瀹濓紒</span>\n      {{/if}}\n    </li>\n    {{#if isLogin }}\n    {{#unless msgHide }}\n    <li id="globalMsg" class="global-top-item">\n      <a href="{{couriercoreServer}}/messager/new.htm" seed="global-msg" target="_blank">\n        <i class="iconfont" title="鎻愰啋">&#xF056;</i>\n        <span class="global-msg-count"></span>\n      </a>\n    </li>\n    <em class="global-top-item global-top-seperator">|</em>\n    {{/unless}}\n    {{/if}}\n    <li class="global-top-item">\n      {{#if isLogin}}\n      <a href="{{authCenterServer}}/login/logout.htm?goto={{authCenterServer}}" class="global-top-link" seed="global-exit-v1">閫€鍑�</a>\n      {{else}}\n      <a href="{{authCenterServer}}/login/index.htm?needTransfer=true&goto={{pageAbsUrl}}" class="global-top-link" seed="global-header-login">鐧诲綍</a>\n      <span class="global-top-seperator">-</span>\n      <a href="{{personalServer}}/user/reg/index.htm" class="global-top-link" seed="global-header-register">娉ㄥ唽</a>\n      {{/if}}\n    </li>\n    <em class="global-top-item global-top-seperator">|</em>\n    <li  class="global-top-item">\n      <a class="global-top-link" href="{{personalportalServer}}" seed="global-portal-v1" target="_blank">鎴戠殑鏀粯瀹�</a>\n    </li>\n    <em class="global-top-item global-top-seperator">|</em>\n    <li id="globalSecurity" class="global-top-item">\n      <a class="global-top-link" href="{{securityServer}}/sc/index.htm" seed="global-security-v1" target="_blank">瀹夊叏涓績</a>\n    </li>\n    <em class="global-top-item global-top-seperator">|</em>\n    <li id="globalHelp" class="global-top-item">\n      <a class="global-top-link" href="http://help.alipay.com/lab/index.htm" seed="global-help" target="_blank">甯姪涓績</a>\n      <i class="iconfont global-top-angle">&#xF03C;</i>\n    </li>\n    <li id="globalMore" class="global-top-item global-top-item-last">\n        <i class="iconfont" title="璁板綍">&#xF055;</i>\n    </li>\n  </ul>\n  <ul class="global-top-left">\n    <li class="global-top-item global-top-item-first {{#if showMobileLast}}global-top-item-last{{/if}}">\n      <i class="iconfont" title="鎵嬫満">&#xF033;</i>\n      <a class="global-top-link" seed="global-mobile-v1" href="https://mobile.alipay.com/index.htm" target="_blank">鏀粯瀹濋挶鍖�</a>\n    </li>\n    {{#if showOtherLogin}}\n    <em class="global-top-item global-top-seperator">|</em>\n    <li class="global-top-item {{#if showOtherLoginLast}}global-top-item-last{{/if}}">\n      <i class="iconfont" title="杩斿洖">&#xF040;</i>\n      {{#if showTaobaoLogin}}\n      <a href="http://i.taobao.com/my_taobao.htm?r={{timestamp}}&userid={{userId}}" target="_blank" seed="global-return-taobao-v1" class="global-top-link">杩斿洖娣樺疂缃�</a>\n      {{/if}}\n      {{#if showAlibabaLogin}}\n      <a href="http://china.alibaba.com/member/myalibaba.htm" class="global-top-link" target="_blank" seed="global-return-alibaba-v1">杩斿洖闃块噷鍔╂墜</a>\n      {{/if}}\n    </li>\n    {{/if}}\n    {{#if showSwitch}}\n    <em class="global-top-item global-top-seperator">|</em>\n    <li class="global-top-item {{#if showSwitchLast}}global-top-item-last{{/if}}">\n      <i class="iconfont" title="鍒囨崲">&#xF04D;</i>\n      {{#if showMerchant}}\n      <a href="{{personalServer}}/user/switch2merchant.htm" seed="global-change-shanghu-v1" class="global-top-link">鍒囨崲鍒板晢鎴风増</a>\n      {{/if}}\n      {{#if showPersonal}}\n      <a href="{{merchantwebServer}}/home/switchPersonal.htm" seed="global-change-geren-v1" class="global-top-link">鍒囨崲鍒颁釜浜虹増</a>\n      {{/if}}\n    </li>\n    {{/if}}\n  </ul>\n</div>\n</div>\n'), define("alipay/nav/1.2.12/tpl/widget-help.tpl", [], '<div class="global-top-overlay fn-clear global-widget-help">\n  <ul>\n    <li class="global-top-overlay-item">\n      <i class="iconfont" title="甯歌闂">&#xF00E;</i>\n      <a href="http://help.alipay.com/lab/question.htm" target="_blank" seed="global-help-common-v1">甯歌闂</a>\n    </li>\n    <li class="global-top-overlay-item">\n      <i class="iconfont" title="鑷姪鏈嶅姟">&#xF010;</i>\n      <a href="https://self.alipay.com/index.htm" target="_blank" seed="global-help-selfservice-v1">鑷姪鏈嶅姟</a>\n    </li>\n    <li class="global-top-overlay-item" style="border:none;">\n      <i class="iconfont" title="鐜╄浆鏀粯瀹�">&#xF012;</i>\n      <a href="http://abc.alipay.com/i/index.htm" target="_blank" seed="global-help-abc-v1">鐜╄浆鏀粯瀹�</a>\n    </li>\n  </ul>\n</div>\n'), define("alipay/nav/1.2.12/tpl/widget-more.tpl", [], '<div class="global-top-overlay fn-clear global-widget-help">\n  <ul>\n    <li class="global-top-overlay-item">\n      <i class="iconfont" title="寤鸿/瀵硅瘽">&#xF031;</i>\n      <a class="global-top-link" href="https://egg.alipay.com/" target="_blank" seed="global-advice-v1">鎻愬缓璁�</a>\n    </li>\n    <li class="global-top-overlay-item">\n      <i class="iconfont" title="鍦板浘">&#xF057;</i>\n      <a href="http://fun.alipay.com/sitemap/index.htm" target="_blank" seed="global-sitemap-v1">缃戠珯鍦板浘</a>\n    </li>\n    <li class="global-top-overlay-item" style="border:none;">\n      <i class="iconfont" title="鐩剧墝-闃�">&#xF000;</i>\n      <a href="https://www.alipay.com/" target="_blank" seed="global-homepage-v1">鏀粯瀹濋椤�</a>\n    </li>\n  </ul>\n</div>\n\n'), define("alipay/nav/1.2.12/tpl/widget-account.tpl", [], '<div class="global-top-overlay global-account fn-clear">\n  <div class="global-account-head">\n    <a href="{{personalportalServer}}/portal/account/index.htm" class="global-account-img" target="_blank" seed="global-account-img">\n      {{#if portraitPath}}\n      <img src="{{portraitPath}}" alt="鎴戠殑澶村儚" />\n      {{else}}\n      <i class="iconfont" title="鎴戠殑澶村儚">&#xF03E;</i>\n      {{/if}}\n    </a>\n    <div class="global-account-name" title="{{showEmail}}">{{showEmail}}</div>\n    <a href="{{personalportalServer}}/portal/account/index.htm" seed="global-name-zhanghu-set-v1" target="_blank">璐︽埛璁剧疆</a>\n    <span class="global-top-seperator">|</span>\n    <a href="{{personalServer}}/consume/record/index.htm" seed="global-name-record-v1" target="_blank">浜ゆ槗璁板綍</a>\n  </div>\n  <div class="global-account-body">\n    <p>\n       璐︽埛浣欓锛�<span data-role="balance" seed="global-name-yue-display-v1"></span> \n      <a href="https://shenghuo.alipay.com/transfer/deposit/depositPreprocessGw.htm" seed="global-name-recharge-v1" target="_blank">鍏呭€�</a>\n    </p>\n    <hr>\n    <p>\n      <a href="https://financeprod.alipay.com/fund/asset.htm" seed="global-name-yuebao-v1" target="_blank">浣欓瀹�</a>\n      <span class="global-top-seperator">|</span>\n      <a href="https://zht.alipay.com/asset/iframeDetail.htm?providerType=FINANCING&partnerId=TAOBAOLICAI" seed="global-name-fortune-v1" target="_blank">鐞嗚储</a>\n      <span class="global-top-seperator">|</span>\n      <a href="{{personalportalServer}}/portal/assets/index.htm" seed="global-name-other-property-v1" target="_blank">鍏朵粬璧勪骇</a>\n    </p>\n  </div>\n</div>\n'), define("alipay/nav/1.2.12/component/common", ["$", "arale/cookie/1.0.2/cookie", "alipay/request/0.9.1/request", "alipay/nav/1.2.12/widget/component", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/templatable/0.9.2/templatable", "gallery/handlebars/1.0.2/handlebars"], function(a, b) {
	function c() {
		if (0 !== e(this.get("model").container).length) {
			var a = "global-ad",
				b = this.find("#globalTopAD");
			!f.get(a) && b.length && (b.show(), b.find(".global-top-ad-close").click(function() {
				b.hide(), f.set(a, "true", {
					expires: 1e3,
					path: "/",
					domain: document.domain.split(".").slice(-2).join(".")
				})
			}))
		}
	}

	function d() {
		var a = this,
			b = this.get("model"),
			c = (b.uninavServer || "") + "/nav/getUniData.json?_callback=?";
		"true" === b.merchantSwitch && b.menu.indexOf("s1") > -1 && g.ajax(c, {
			dataType: "jsonp"
		}).success(function(b) {
			"ok" === b.stat && b.isMerchant && a.find("#global-subnav-merchant").show()
		})
	}
	var e = a("$"),
		f = a("arale/cookie/1.0.2/cookie"),
		g = a("alipay/request/0.9.1/request"),
		h = a("alipay/nav/1.2.12/widget/component");
	b.a = function(a) {
		return new i({
			className: "global-common-a",
			model: a
		}).after("appendTo", c).after("appendTo", d).render()
	}, b.b = function(a) {
		return b.a(a)
	};
	var i = h.extend({
		attrs: {
			template: a("alipay/nav/1.2.12/tpl/component-common.tpl")
		},
		templateHelpers: {
			showCurrent: function(a) {
				return this.menu && this.menu.indexOf(a) > -1 ? "global-nav-item-current" : ""
			},
			showSubCurrent: function(a) {
				return this.menu && this.menu.indexOf(a) > -1 ? "global-subnav-item-current" : ""
			}
		},
		render: function() {
			var a = this.get("model");
			(a.appKey || a.catKey) && (a.menu = "s5"), a.showSubNav = a.menu && (a.menu.indexOf("s0") > -1 || a.menu.indexOf("s1") > -1 || a.menu.indexOf("s2") > -1 || a.menu.indexOf("s6") > -1) ? !0 : !1;
			for (var b = 0; 8 > b; b++) a.menu.indexOf("s" + b) > -1 && (a["menu-" + b] = !0);
			return this.set("model", a), i.superclass.render.call(this)
		}
	})
}), define("alipay/nav/1.2.12/tpl/component-common.tpl", [], '<div class="global">\n    {{{cms_alipay_nav_global_ad}}}\n    {{{cms_alipay_notice_headNotice}}}\n    <div class="global-header fn-clear {{#unless showSubNav}}global-nav-nosub{{/unless}}" coor="headarea">\n      <div class="global-header-content">\n        <div class="global-logo">\n            <a href="{{personalportalServer}}/portal/i.htm" seed="global-logo" title="鎴戠殑鏀粯瀹�"></a>\n        </div>\n        <div class="global-logo-neighbor">\n        </div>\n        <ul class="global-nav">\n            <li class="global-nav-item {{#if menu-1}}global-nav-item-current{{/if}}">\n                <i class="iconfont" title="鑿卞舰">&#xF02F;</i>\n                <a href="{{personalportalServer}}/portal/i.htm"  seed="global-user-i">鎴戠殑鏀粯瀹�</a  >\n                <span class="global-nav-item-arrow">鈼�</span>\n                <span class="global-nav-item-arrow global-nav-item-arrow-border">鈼�</span>\n            </li>\n            <li class="global-nav-item {{#if menu-2}}global-nav-item-current{{/if}}">\n                <i class="iconfont" title="鑿卞舰">&#xF02F;</i>\n                <a href="{{consumeprodServer}}/record/index.htm" seed="global-record">浜ゆ槗璁板綍</a>\n                <span class="global-nav-item-arrow">鈼�</span>\n                <span class="global-nav-item-arrow global-nav-item-arrow-border">鈼�</span>\n            </li>\n            <li class="global-nav-item {{#if menu-6}}global-nav-item-current{{/if}}">\n                <i class="iconfont" title="鑿卞舰">&#xF02F;</i>\n                <a href="{{personalportalServer}}/portal/account/safeguard.htm" seed="global-safeguard">浼氬憳淇濋殰</a>\n                <span class="global-nav-item-arrow">鈼�</span>\n                <span class="global-nav-item-arrow global-nav-item-arrow-border">鈼�</span>\n            </li>\n            <li class="global-nav-item {{#if menu-5}}global-nav-item-current{{/if}}">\n                <i class="iconfont" title="鑿卞舰">&#xF02F;</i>\n                <a href="{{appstoreServer}}/container/web/index.htm" seed="global-appstore">搴旂敤涓績</a>\n                <span class="global-nav-item-arrow">鈼�</span>\n                <span class="global-nav-item-arrow global-nav-item-arrow-border">鈼�</span>\n            </li>\n        </ul>\n      </div>\n    </div>\n    {{#if showSubNav}}\n    <div class="global-subheader">\n        <ul class="global-subnav">\n            {{#if menu-1}}\n                <li class="global-subnav-item {{showSubCurrent "s1_index"}}">\n                    <a href="{{personalportalServer}}/portal/i.htm" seed="global-user-i">棣栭〉</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s1_fund"}}">\n                    <a href="{{personalportalServer}}/portal/assets/index.htm" seed="global-account-info">璐︽埛璧勪骇</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s1_myaccount"}}">\n                    <a href="{{personalportalServer}}/portal/account/index.htm" seed="global-account-member">璐︽埛璁剧疆</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s1_zht"}}">\n                    <a href="{{benefitprodServer}}/asset/index.htm" seed="global-account-zht">璐︽埛閫�</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s1_merchant"}} global-hide" id="global-subnav-merchant">\n                    <a href="{{morderprodServer}}/order/products.htm?channel=psl" seed="global-merchant">鍟嗘埛鏈嶅姟</a>\n                </li>\n                <div class="global-subnav-input">\n                    <form action="http://help.alipay.com/lab/search_new_result.htm" method="GET" id="J-my-app-search-form" class="my-app-search-form fn-hide" target="_blank" accept-charset="gb2312">\n                        <input type="text" id="J-my-app-search-input" placeholder="杈撳叆鍏抽敭瀛楋紝濡傗€滃瘑鐮佲€�" seed="my-app-search-input" name="word" autocomplete="off">\n                        <i class="iconfont global-subnav-input-scan" seed="my-app-search-icon" title="鏌ヨ/鎼滅储">&#xF02A;</i>\n                    </form>\n                </div>\n            {{/if}}\n            {{#if menu-2}}\n                <li class="global-subnav-item {{showSubCurrent "s2_traderecord"}}">\n                    <a href="{{consumeprodServer}}/record/index.htm" seed="global-record-detail">浜ゆ槗璁板綍</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s2_tradeflow"}}">\n                    <a href="{{personalServer}}/consume/record/inpour.htm" seed="global-record-deposit">鍏呭€艰褰�</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s2_tradedraw"}}">\n                    <a href="{{personalServer}}/consume/record/draw.htm" seed="global-record-deposit">鎻愮幇璁板綍</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s2_tradereview"}}">\n                    <a href="{{tradecmtServer}}/comment/concumserCriticismManage.htm" seed="global-record-comment">浜ゆ槗璇勪环</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s2_ebill"}}">\n                    <a href="{{zhangdanServer}}/ebill/index.htm" seed="global-record-ebill" id="global-record-ebill">鐢靛瓙瀵硅处鍗�</a>\n                </li>\n                <li class="global-subnav-item {{showSubCurrent "s2_tally"}}">\n                    <a href="{{tallyServer}}/tally/index.htm" seed="global-record-tally">璁拌处</a>\n                </li>\n            {{/if}}\n            {{#if menu-6}}\n                <li class="global-subnav-item {{showSubCurrent "s6_index"}}">\n                    <a href="{{personalportalServer}}/portal/account/safeguard.htm" seed="global-safeguard-index">棣栭〉</a>\n                </li>\n                {{#if isLogin}}\n                <li class="global-subnav-item {{showSubCurrent "s6_compensation"}}">\n                    <a href="{{personalportalServer}}/portal/account/compensation.htm" seed="global-safeguard-compensation">鎴戠殑鐢宠</a>\n                </li>\n                {{/if}}\n            {{/if}}\n        </ul> \n    </div>\n    {{/if}}\n</div>\n'), define("alipay/nav/1.2.12/widget/cmstpl", ["$"], function(a, b, c) {
	var d = a("$"),
		e = {};
	d("script.global-cms-block").each(function(a, b) {
		e[b.id] = b.innerHTML
	}), c.exports = e
});