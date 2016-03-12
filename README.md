Async Data Summation
====================

The point of this project is to demonstrate how multiple AJAX URLs can be used to power a single data collection. In the case of this example, 9 similar data sets live in the `/data` directory and are fetched with random timeouts via AJAX. Upon returning each data set, the scripts will automatically parse the results and add new models to the Backbone collection powering the view.

A further implementation could seek to _sort_ the data as it's being inserted into the collection, but the point here is merely to show how multiple APIs (i.e. multiple instances of the same system) can be queried in parallel to build out a single, cohesive interface.

Building
--------

The project uses jQuery and jQuery UI for some components and references those scripts remotely. However, the styling uses [Bourbon](http://bourbon.io/), so you'll need to have Ruby, Sass, and Borubon installed to build the stylesheets.

Assuming Ruby and Sass already work, run the following commands from the root directory:

```
$ gem install bourbon
$ bourbon install
$ sass stylesheets/sass:stylesheets
```

This will install Bourbon and generate the necessary CSS and CSS maps to run the site. Then merely load `index.html` in a browser and enjoy!

**Note:** If you're using PHPStorm, WebStorm, or similar, right-click on `index.html` and select `View in Browser` to ensure scripts function properly. This will launch a temporary webserver so you're not using the `file:///` protocol. Some browsers disable AJAX functionality under that protocol.