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
	//debugger;
} );