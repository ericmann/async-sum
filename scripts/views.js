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
	var ListingView = window.ASYNC.ListingView = Backbone.View.extend(
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