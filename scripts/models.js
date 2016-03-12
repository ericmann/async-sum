(function( window, $, undefined ) {
	// Ensure wrapper object is available
	window.ASYNC = window.ASYNC || {};

	var _ = window._,
		ASYNC = window.ASYNC,
		Backbone = window.Backbone,
		document = window.document;

	/**
	 * Model that represents a single listing
	 */
	var Listing = window.ASYNC.Listing = Backbone.Model.extend(
		{
			defaults: function() {
				return {
					meta           : [],
					url            : '',
					images         : {},
					image_count    : 0,
					condition      : '',
					description    : '',
					name           : '',
					type           : '',
					model          : '',
					year           : '',
					msrp           : 0.00,
					customer_price : 0.00,
					hide_price     : 1
				}
			},

			sync: function( method, model, options ) {

			}
		}
	);
} )( this, jQuery );