COMPONENT('modificator', function(self) {

	var reg_search = /\+|\s/;
	var keys, keys_unique;
	var db = {};

	self.readonly();
	self.blind();

	self.make = function() {
		self.watch('*', self.autobind);
		self.scan();

		self.on('component', function() {
			setTimeout2(self.id, self.scan, 200);
		});

		self.on('destroy', function() {
			setTimeout2(self.id, self.scan, 200);
		});

		$(document).on('click', '.modify', function() {
			var el = $(this);
			self.click(el.attrd('m'), el.attrd('m-schema'));
		});
	};

	self.autobind = function(path, value, type) {

		var mapper = keys[path];
		if (!mapper)
			return;

		for (var i = 0, length = mapper.length; i < length; i++) {
			var item = mapper[i];
			var schema = db[item.schema];
			item.event.type = 'bind';
			item.event.bindtype = type;
			schema && schema(GET(item.path), item.selector ? item.element.find(item.selector) : item.element, item.event);
		}
	};

	self.click = function(path, schema) {

		if (path.substring(0, 1) === '%')
			path = 'jctmp.' + path.substring(1);

		var fn = db[schema];
		if (fn) {
			var arr = keys[path];
			if (arr) {
				var val = GET(path);
				for (var i = 0, length = arr.length; i < length; i++) {
					var obj = arr[i];
					if (obj.schema === schema) {
						obj.event.type = 'click';
						obj.event.bindtype = -1;
						fn(val, obj.selector ? obj.element.find(obj.selector) : obj.element, obj.event);
					}
				}
			}
		}
		return self;
	};

	self.reinit = function(path) {
		var arr = keys[path];
		for (var i = 0, length = arr.length; i < length; i++) {
			var obj = arr[i];
			obj.event.type = 'init';
			obj.event.bindtype = -1;
			var schema = db[obj.schema];
			schema && schema(GET(obj.path), obj.selector ? obj.element.find(obj.selector) : obj.element, obj.event);
		}
		return self;
	};

	self.register = function(name, fn) {
		db[name] = fn;
		var paths = Object.keys(keys);
		for (var i = 0, length = paths.length; i < length; i++) {
			var arr = keys[paths[i]];
			for (var j = 0, jl = arr.length; j < jl; j++) {
				var obj = arr[j];
				if (obj.init || obj.schema !== name)
					continue;
				obj.init = true;
				obj.event.type = 'init';
				obj.event.bindtype = -1;
				fn(GET(obj.path), obj.selector ? obj.element.find(obj.selector) : obj.element, obj.event);
			}
		}
		return self;
	};

	self.scan = function() {
		keys = {};
		keys_unique = {};
		self.find('[data-m]').each(function() {

			var el = $(this);
			var path = (el.attrd('m') || '').replace('%', 'jctmp.');
			var p = '';
			var schema = '';

			if (reg_search.test(path)) {
				var arr = path.split(reg_search);
				path = arr[0];
				schema = arr[1];
			}

			arr = path.split('.');

			var obj = el.data('data-m');
			keys_unique[path] = true;

			if (!obj) {
				obj = {};
				obj.path = path;
				obj.schema = schema || el.attrd('m-schema');
				obj.selector = el.attrd('m-selector');
				obj.element = el;
				obj.event = { type: 'init' };
				obj.init = false;
				el.data('data-m', obj);
				if (db[obj.schema]) {
					obj.init = true;
					db[obj.schema](GET(obj.path), obj.selector ? obj.element.find(obj.selector) : obj.element, obj.event);
				}
			}

			for (var i = 0, length = arr.length; i < length; i++) {
				p += (p ? '.' : '') + arr[i];
				if (keys[p])
					keys[p].push(obj);
				else
					keys[p] = [obj];
			}
		});

		Object.keys(keys_unique).forEach(function(key) {
			self.autobind(key, GET(key));
		});

		return self;
	};
});