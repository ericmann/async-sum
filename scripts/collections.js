(function( window, $, undefined ) {
	// Ensure wrapper object is available
	window.Transfers = window.Transfers || {};

	var _ = window._,
		Transfers = window.Transfers,
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
	var ListingCollection = window.Transfers.ListingCollection = Backbone.Collection.extend(
		{
			model: Transfers.Listing,

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
					Transfers.api_base + '/data/1.json',
					Transfers.api_base + '/data/2.json',
					Transfers.api_base + '/data/3.json',
					Transfers.api_base + '/data/4.json',
					Transfers.api_base + '/data/5.json',
					Transfers.api_base + '/data/6.json',
					Transfers.api_base + '/data/7.json',
					Transfers.api_base + '/data/8.json',
					Transfers.api_base + '/data/9.json'
				];

				//options = options || {};
				//options.type = 'get';
				//options.dataType = 'json';
				//options.contentType = 'application/json; charset=utf-8';

				var promises = [];
				_.each( sources, function( url ) {
					var options = {
						type: 'get',
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						url: url,
						success: function( data ) {
							// Add the data objects to the collection
							if ( data.success ) {
								_.each( data.data.items, function( dataItem ) {
									SELF.add( new window.Transfers.Listing( dataItem ) );
								} );
							}
						}
					};

					promises.push( $.ajax( options ) );
				} );

				return $.when.apply( null, promises ).then( function() {
					options.success();
				} );

				//options.url = Transfers.api_base + 'group/' + Transfers.application.condition();
				//options.data = Transfers.application.queryData();

				//return $.ajax( options );
			}
		}
	);
} )( this, jQuery );