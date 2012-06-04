define([ "use!backbone", "use!handlebars","text!views/movies.handlebars" ], function(Backbone, Handlebars, moviesTemplate) {

	var MoviesView = Backbone.View.extend({

		events: {
			'click a.servernext': 'nextResultPage',
			'click a.serverprevious': 'previousResultPage',
			'click a.orderUpdate': 'updateSortBy',
			'click a.serverlast': 'gotoLast',
			'click a.page': 'gotoPage',
			'click a.serverfirst': 'gotoFirst',
			'click a.serverpage': 'gotoPage',
			'click .serverhowmany a': 'changeCount'

		},

		tagName: 'aside',

		template: Handlebars.compile(moviesTemplate),

		initialize: function () {

			this.collection.on('reset', this.render, this);
			this.collection.on('change', this.render, this);

			this.$el.appendTo('#pagination');

		},

		render: function () {
		  var jsonfortemplate  = {morePages: this.collection.info().currentPage < this.collection.info().totalPages};
		  this.$el.html(this.template(jsonfortemplate));
		},

		updateSortBy: function (e) {
			e.preventDefault();
			var currentSort = $('#sortByField').val();
			this.collection.updateOrder(currentSort);
		},

		nextResultPage: function (e) {
			e.preventDefault();
			this.collection.requestNextPage();
		},

		previousResultPage: function (e) {
			e.preventDefault();
			this.collection.requestPreviousPage();
		},

		gotoFirst: function (e) {
			e.preventDefault();
			this.collection.goTo(this.collection.information.firstPage);
		},

		gotoLast: function (e) {
			e.preventDefault();
			this.collection.goTo(this.collection.information.lastPage);
		},

		gotoPage: function (e) {
			e.preventDefault();
			var page = $(e.target).text();
			this.collection.goTo(page);
		},

		changeCount: function (e) {
			e.preventDefault();
			var per = $(e.target).text();
			this.collection.howManyPer(per);
		}

	});

  return MoviesView;
});
