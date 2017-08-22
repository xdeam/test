define("arale/widget/1.0.3/templatable", ["$", "gallery/handlebars/1.0.0/handlebars"], function(a, b, c) {
	function h(a) {
		return l(a) ? null : d(j(a))
	}

	function i(a, b) {
		if (a) {
			var c = a.find(b);
			if (0 === c.length) throw new Error("Invalid template selector: " + b);
			return k(c.html())
		}
	}

	function j(a) {
		return a.replace(/({[^}]+}})/g, "<!--$1-->").replace(/\s(src|href)\s*=\s*(['"])(.*?\{.+?)\2/g, " data-templatable-$1=$2$3$2")
	}

	function k(a) {
		return a.replace(/(?:<|&lt;)!--({{[^}]+}})--(?:>|&gt;)/g, "$1").replace(/data-templatable-/gi, "")
	}

	function l(a) {
		return "function" == typeof a
	}
	var d = a("$"),
		e = a("gallery/handlebars/1.0.0/handlebars"),
		f = {};
	c.exports = {
		templateHelpers: null,
		templateObject: null,
		parseElementFromTemplate: function() {
			this.templateObject = h(this.template), this.element = d(this.compile())
		},
		compile: function(a, b) {
			a || (a = this.template), b || (b = this.model), b.toJSON && (b = b.toJSON());
			var c = this.templateHelpers;
			if (c)
				for (var d in c) c.hasOwnProperty(d) && e.registerHelper(d, c[d]);
			var g = "function" == typeof a ? a : f[a];
			g || (g = f[a] = e.compile(a));
			var h = g(b);
			if (c)
				for (d in c) c.hasOwnProperty(d) && delete e.helpers[d];
			return h
		},
		renderPartial: function(a) {
			var b = i(this.templateObject, a);
			return b ? this.$(a).html(this.compile(b)) : this.element.html(this.compile()), this
		}
	};
	var g = e.compile;
	e.compile = function(a) {
		return l(a) ? a : g.call(e, a)
	}
});