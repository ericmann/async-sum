(function( window, $, undefined ) {
	// Ensure wrapper object is available
	window.ASYNC = window.ASYNC || {};

	var _ = window._,
		ASYNC = window.ASYNC,
		Backbone = window.Backbone,
		document = window.document;

	/**
	 * Get an AJAX promise.
	 *
	 * Sets a random delay for testing purposes to simulate network latency.
	 *
	 * @param {string} url
	 *
	 * @return {$.Deferred}
	 */
	function get_data( url ) {
		var deferred = $.Deferred();

		var options = {};
		options.type = 'get';
		options.dataType = 'json';
		options.contentType = 'application/json; charset=utf-8';
		options.url = url;

		setTimeout( function() {
			deferred.resolveWith( $.ajax( options ).done );
		}, Math.floor( 400 + Math.random() * 2000 ) );

		return deferred.promise();
	}

	/**
	 * Default collection for listings
	 */
	var ListingCollection = window.ASYNC.ListingCollection = Backbone.Collection.extend(
		{
			model: ASYNC.Listing,

			/**
			 * Parse out the JSON object return so we can keep track of the page number.
			 *
			 * The AJAX handler will return a json object that looks something like:
			 *
			 * {
			 *   "success": true,
			 *   "data"   : {
			 *     "paged": 1,
			 *     "items": [ ... ]
			 *   }
			 * }
			 *
			 * @param {object} data
			 *
			 * @returns {array}
			 */
			parse: function( data ) {
				this.paged  = data.paged;

				return data.items;
			},

			/**
			 * This sync method is more complex than a typical one. Instead of grabbing items from a single site,
			 * it will iterate through a _list_ of sites and grab the listings from each. It uses Promises to
			 * manage this asynchronously and will not be, itself, complete until all if the sites have been fetched.
			 *
			 * @param {string} method
			 * @param {string} collection
			 * @param {object} options
			 *
			 * @returns {*}
			 */
			sync: function( method, collection, options ) {
				var SELF = this;

				if ( 'create' === method || 'update' === method || 'delete' === method ) {
					// This collection is read-only
					return;
				}

				var sources = [
					ASYNC.api_base + '/data/1.json',
					ASYNC.api_base + '/data/2.json',
					ASYNC.api_base + '/data/3.json',
					ASYNC.api_base + '/data/4.json',
					ASYNC.api_base + '/data/5.json',
					ASYNC.api_base + '/data/6.json',
					ASYNC.api_base + '/data/7.json',
					ASYNC.api_base + '/data/8.json',
					ASYNC.api_base + '/data/9.json'
				];

				// As we fetch items, automatically render them into this container
				var container = jQuery( document.getElementById( 'listing_container' ) );

				/**
				 * Fetch a remote URL with a random timeout (to simulate network latency)
				 *
				 * @param {String} url
				 *
				 * @returns {$.promise}
				 */
				function fetcher( url ) {
					var d = $.Deferred();

					var options = {
						type       : 'get',
						dataType   : 'json',
						contentType: 'application/json; charset=utf-8',
						url        : url,
						success    : function ( data ) {
							// Add the data objects to the collection
							if ( data.success ) {
								_.each( data.data.items, function ( dataItem ) {
									// Build out the data model
									var listing = new window.ASYNC.Listing( dataItem );

									// Add a model to the collection
									SELF.add( listing );
									container.append( new window.ASYNC.ListingView( { model: listing } ).render().$el );
									d.resolve( listing );
								} );
							}
						}
					};

					window.setTimeout( function() {
						$.ajax( options );
					}, Math.round( Math.random() * 3000 ) );

					return d.promise();
				}

				var promises = [];
				_.each( sources, function( url ) {
					promises.push( fetcher( url ) );
				} );

				return $.when.apply( null, promises ).then( function() {
					options.success();
				} );
			}
		}
	);
} )( this, jQuery );