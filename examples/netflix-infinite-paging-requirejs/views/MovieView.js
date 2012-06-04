define([ "use!backbone", "use!handlebars", "text!views/movie.handlebars" ], function(Backbone, Handlebars, movieTemplate) {

	var MovieView = Backbone.View.extend({
		tagName : 'li',
		template: Handlebars.compile(movieTemplate),

		initialize: function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render : function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
return MovieView;
});