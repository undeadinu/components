COMPONENT('search', 'class:hidden;delay:50;attribute:data-search', function(self, config) {
	self.readonly();
	self.setter = function(value) {

		if (!config.selector || !config.attribute || value == null)
			return;

		setTimeout2('search' + self.ID, function() {

			var elements = self.find(config.selector);
			if (!value) {
				elements.rclass(config.class);
				return;
			}

			var search = value.toSearch();

			elements.each(function() {
				var el = $(this);
				var val = (el.attr(config.attribute) || '').toSearch();
				el.tclass(config.class, val.indexOf(search) === -1);
			});

		}, config.delay);
	};
});