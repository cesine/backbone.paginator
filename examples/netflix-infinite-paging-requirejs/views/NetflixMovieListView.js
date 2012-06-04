define([ "use!backbone" , "use!handlebars", "views/MovieView", "text!views/netflix_movie_list.handlebars"], function(Backbone, Handlebars, MovieView, netflixPageTemplate) {

	var NetflixMovieListView = Backbone.View.extend({
		el : '#netflix-header',

		initialize : function () {

			var tags = this.collection;

			tags.on('add', this.addOne, this);
			tags.on('reset', this.addAll, this);
			tags.on('all', this.render, this);

			tags.pager();

		},
		template: Handlebars.compile(netflixPageTemplate),
		addAll : function () {
			this.collection.each (this.addOne);
		},
		
		addOne : function ( item ) {
			var view = new MovieView({model:item});
			$('#movies').append(view.render().el);
		},

		render: function(){
		  var jsonfortemplate = {title: "Paginator.requestPager() example", subtitle: "Infinite Pagination"};
		  $(this.el).html(this.template(jsonfortemplate));
      return this;
		}
	});
return NetflixMovieListView;
});