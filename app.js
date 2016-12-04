'use strict';

var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var OAuth2 = require('oauth').OAuth2;

var dispatcher = new HttpDispatcher();

const PORT=3000;

function handleRequest(request, response){
  try{
    console.log(request.url);
    dispatcher.dispatch(request, response);
  } catch(err){
    console.log(err);
  }
}

var server = http.createServer(handleRequest);

dispatcher.onGet('/auth/linkedin/callback', function(request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Success!');
});

server.listen(PORT, function(){
  console.log('Example app listening to port %s', PORT)
});
