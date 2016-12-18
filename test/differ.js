'use strict';

var assert = require('assert');

describe('OAuth 2.0 Authorization',function(){
  var OAuth = require('oauth');

   it('should get bearer token for LinkedIn member', function(done){
     var OAuth2 = OAuth.OAuth2;
     var CONSUMERKEY = '';
     var CONSUMERSECRET = '';
     var oauth2 = new OAuth2(
       CONSUMERKEY,
       CONSUMERSECRET,
       'https://www.linkedin.com/oauth/v2/',
       null,
       'oauth2/token',
       null);
     oauth2.getOAuthAccessToken(
       '',
       {'grant_type':'client_credentials'},
       function (e, access_token, refresh_token, results){
       console.log('bearer: ',access_token);
       done();
     });
   });
});

describe('API v1 resource', function(){
  it('should return the results from v1 API');
});

describe('API v2 resource', function(){
  it('should return the results from v2 API');
});

describe('Comparison of v1 and v2 resources', function(){
  it('should return the same results');
});
