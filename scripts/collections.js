(function( window, $, undefined ) {
	// Ensure wrapper object is available
	window.Transfers = window.Transfers || {};

	var _ = window._,
		Transfers = window.Transfers,
		Backbone = window.Backbone,
		document = window.document;

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

				options = options || {};
				options.type = 'get';
				options.dataType = 'json';
				options.contentType = 'application/json; charset=utf-8';
				//options.url = Transfers.api_base + 'group/' + Transfers.application.condition();
				//options.data = Transfers.application.queryData();

				return $.ajax( options );
			}
		}
	);
} )( this, jQuery );