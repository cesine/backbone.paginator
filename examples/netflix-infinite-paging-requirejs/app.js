// Set the RequireJS configuration
require.config({
  paths : {
    "use" : "libs/use",
    "jquery" : "http://code.jquery.com/jquery-1.7.1.min",
    "underscore" : "../libs/underscore",
    "backbone" : "../libs/backbone-min",
    "paginator" : "../../lib/backbone.paginator"
  },
  use : {
    "underscore" : {
      attach : "_"
    },

    "backbone" : {
      deps : [ "use!underscore", "jquery" ],
      attach : function(_, $) {
        return Backbone;
      }
    },

    "paginator" : {
      deps : [ "use!underscore", "use!backbone", "jquery" ],
      attach : "paginator"
    }
  }
});

// Initialization
require([ "use!backbone", 
          "collections/Movies", 
          "views/MoviesView", 
          "views/NetflixMovieListView" ]
, function(
              Backbone, 
              Movies, 
              MoviesView, 
              NetflixMovieListView
    ) {

  // Top-level namespaces for our code
  window.app = {};
  app.collections = {};
  app.models = {};
  app.views = {};
  app.mixins = {};

  // Defer initialization until doc ready.
  $(function() {
    app.collections.paginatedMovies = new Movies();
    app.views.app = new NetflixMovieListView({
      collection : app.collections.paginatedMovies
    });
    app.views.pagination = new MoviesView({
      collection : app.collections.paginatedMovies
    });
  });

});
