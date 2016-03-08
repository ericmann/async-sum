(function( window, $, undefined ) {
	// Ensure wrapper object is available
	window.Transfers = window.Transfers || {};

	var _ = window._,
		Transfers = window.Transfers,
		Backbone = window.Backbone,
		document = window.document;

	/**
	 * Model that represents a single listing
	 */
	var Listing = window.Transfers.Listing = Backbone.Model.extend(
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