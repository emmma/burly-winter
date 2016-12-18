'use strict';

var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var OAuth2 = require('oauth').OAuth2;
var queryString = require('querystring');
var util = require('util');

const PORT = 3000;
const CONSUMERKEY = '';
const CONSUMERSECRET = '';

var redirectURI = 'http://localhost:3000/auth/linkedin/callback';
var baseSite = 'https://www.linkedin.com/oauth/v2';
var authorizePath = '/authorization';
var accessTokenPath = '/accessToken';

var oauth2 = new OAuth2(CONSUMERKEY, CONSUMERSECRET, baseSite, authorizePath, accessTokenPath, null);

var server = http.createServer(function(request, response){
  var path = request.url.split('/');

  var authURL = oauth2.getAuthorizeUrl({
    response_type: 'code',
    redirect_uri: redirectURI,
    scope: ['r_basicprofile rw_ad_campaigns'],
    state: 'some string for CSRF prevention'
  });

  var body = '<a href="' + authURL + '">Click here get authorization code</a>';
  response.writeHead(200, {
    'Content-Type':'text/html'
  });
  response.end(body);

  var queryStringObj = {};
  if (path[3] != null && path.length !== 0 && path != 'undefined') {
    queryStringObj = queryString.parse(path[3].split('?')[1]);

    oauth2.getOAuthAccessToken(queryStringObj.code, {
      grant_type: 'authorization_code',
      redirect_uri: redirectURI
    }, function(error, access_token, results){
      if (error){
        console.log(error);
        response.end(error);
      }
      else {
        console.log('Obtained access_token', access_token);
        response.end(access_token);
      }
    });
  };

}).listen(3000);
