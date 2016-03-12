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
	var ListingView = window.Transfers.ListingView = Backbone.View.extend(
		{
			tagName: 'div',
			className: 'card',
			template: _.template( $( document.getElementById( 'tmpl-card' ) ).html() ),

			render: function() {
				this.$el.html( this.template( this.model.attributes ) );

				return this;
			}
		}
	);
} )( this, jQuery );