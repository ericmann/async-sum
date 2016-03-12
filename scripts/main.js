// Start up the progress bar
jQuery( "#spinner" ).progressbar(
	{
		value: false
	}
);

// Set up "localized" data
window.Transfers = window.Transfers || {};
window.Transfers.api_base = window.location.href.replace( '/index.html', '' );

// Fetch collection
var listings = new window.Transfers.ListingCollection();
listings.fetch().done( function() {
	// Once we've fetched everything, iterate through our collection and render out the associated models
	var container = $( document.getElementById( 'listing_container' ) ),
		spinner = $( document.getElementById( 'spinner' ) );

	_.each( listings.models, function( item ) {
		container.append( new window.Transfers.ListingView( { model: item } ).render().$el );
	} );

	spinner.hide();
} );