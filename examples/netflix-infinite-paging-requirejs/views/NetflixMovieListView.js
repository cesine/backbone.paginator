define([ "use!backbone" , "views/MovieView"], function(Backbone, MovieView) {

	var NetflixMovieListView = Backbone.View.extend({
		el : '#movies',

		initialize : function () {

			var tags = this.collection;

			tags.on('add', this.addOne, this);
			tags.on('reset', this.addAll, this);
			tags.on('all', this.render, this);

			tags.pager();

		},

		addAll : function () {
			this.collection.each (this.addOne);
		},
		
		addOne : function ( item ) {
			var view = new MovieView({model:item});
			$('#movies').append(view.render().el);
		},

		render: function(){
		}
	});
return NetflixMovieListView;
});