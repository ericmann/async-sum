// Start up the progress bar
jQuery( "#spinner" ).progressbar(
	{
		value: false
	}
);
var modal = jQuery( '#spinner-wrap' ).dialog(
	{
		modal: true,
		resizable: false,
		draggable: false,
		buttons: [],
		height: 70
	}
);

// Set up "localized" data
window.ASYNC = window.ASYNC || {};
window.ASYNC.api_base = window.location.href.replace( '/index.html', '' );

// Fetch collection
var listings = new window.ASYNC.ListingCollection();
listings.fetch().done( function() {
	modal.dialog( 'close' );
} );