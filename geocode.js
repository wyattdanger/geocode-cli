#!/Users/`whoami`/local/bin/node

var  http = require('http'),
     loc = process.argv.slice(2).join(' '),
     formatLoc = function  (place) {
       if ( ! place ) { 
          console.log('Where?');
          process.exit(); 
       }
       return place.replace( /\s/g,'+');
     },
     options = {
        host: 'maps.googleapis.com',
        port: 80,
        path: '/maps/api/geocode/json?address='+ formatLoc(loc) +'&sensor=false',
        headers: {'Content-type': 'aplication/json'}
     };


var req = http.get(options, function(res) {
    var geocodeData = '';

    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));

    res.setEncoding('utf8');

    res.on('data', function (chunk, foo) {
        geocodeData += chunk ;
    });

    res.on('end', function () {
        var data = JSON.parse( geocodeData );

        if (! data.results.length ) {
          console.log("No results for " + loc + ".")
          return;
        }
        console.log (data.results[0].formatted_address );
        console.log( data.results[0].geometry.location );
    });

});

req.end();
