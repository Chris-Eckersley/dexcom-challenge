const request = require('superagent');
const assert = require('assert');

describe('Subject analysis_session endpoint', function() {
  //
  // Create a cookie jar
  //
  const agent = request.agent();
  const testUser = getLoginCredsFromArgs(process.argv);

  before('Set up session and authenticate', function(done) {
    let redirects = [];
    const AUTHURL = 'https://clarity.dexcom.com/users/auth/dexcom_sts'

    //
    // Get a url with a unique signin query param 
    //
    agent.post(AUTHURL)
      .set({
        'Connection': 'keep-alive',
        'DNT': '1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        'Sec-Fetch-Dest': 'document',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'clarity.dexcom.com',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Mode': 'navigate',
        'Accept-Language': 'en-US,en;q=0.9'
      })
      .then(res => {
        console.log({
          url: AUTHURL,
          status: res.status,
          body: res.body,
          redirects: res.redirects
        });

      redirects = res.redirects;

      //
      // Post to the login url with the custom signin query param 
      //
      return agent.get(redirects[0]) // should be a post
        .set({
          'authority': 'uam1.dexcom.com',
          'cache-control': 'max-age=0',
          'origin': 'https://uam1.dexcom.com',
          'upgrade-insecure-requests': '1',
          'dnt': '1',
          'content-type': 'application/x-www-form-urlencoded',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
          'sec-fetch-dest': 'document',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'referer': 'https://uam1.dexcom.com/identity/login?signin=ccdb2d964a1f3314e8202741c9cccef6',
          'accept-language': 'en-US,en;q=0.9',
          'Content-Type': 'application/x-www-form-urlencoded'
        })
        .send(`username=${testUser.userName}`)
        .send(`password=${testUser.password}`);
      })
      .then(res => {
        console.log({url: redirects[0], status: res.status, body: res.body});
        done();
      })
      .catch(err => {
        console.log({
          status: err.status,
          text: err.response.text,
          headers: err.response.headers,
          header: err.response.header
        });
        done();
      });
  });

  it('analysisSessionId should not be "None"', (done) => {
    const analysisSession = 'https://clarity.dexcom.com/api/subject/1594950620847472640/analysis_session';
    
    agent.post(analysisSession)
      .set({
        'Connection': 'keep-alive',
        'Content-Length': '0',
        'DNT': '1',
        'X-CSRF-Token': 'wF3GbWLhN9xqv8Vg72McAsIpSGnMQPGUaeaxWS+A9VvU3G91sWbfHVGCokbgQAB5Fk+E2ZLAoIq3AI3UAo6+kw==',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Sec-Fetch-Dest': 'empty',
        'X-Requested-With': 'XMLHttpRequest',
        //
        // I'm not sure how this access token is geting injected into this header.
        // It seems to be set as a secure httponly cookie but here it is...
        'Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3N3ZWV0c3BvdGRpYWJldGVzLmNvbSIsInN1YiI6IlN3ZWV0c3BvdCIsImlhdCI6MTU4NTIzODgwNSwiY29uc2VudFBlcm1pc3Npb24iOiJsaW5rZWRTdWJqZWN0cyIsImRleGNvbUlkIjoiNWQ0ZWZkZTEtNzg4NC00Y2YzLWJlYjctMzllNTM4OGFjNDBkIiwiZXhwIjoxNTg1MzI1MjA1LCJyb2xlIjoiT3duZXIiLCJzdWJqZWN0SWQiOiIxNTk0OTUwNjIwODQ3NDcyNjQwIn0.LXW3yTiL_tu29GPO8fTGsr5rZhQJNWAUiEsFViv-JH5489XFxlz2zjcxfDuN5_g7kWLNvlyPc4sWVGV-98_10pVirgIpQ2RbA5qM-DoiHa93bFMWrasjJe92WxllM1WqtuxOqdoOzj-ZJRl5Ph6oc0fkHURAYXSPAvrr9QEQimTsPqKOtMHqUErKlAjEbXsXfgAAaXbCPQ1Jt1inDzN271zuDzjqwu4G8J8_7bwCm86mh1UZELtR3RXTBl7Dk2nulmskw7W7AMquGhxLbVtLsWvseDOm-tE4ONcmvb9uF1hFJjpay-F21YD64fbBrtdGCpwny67SQuqwq_uYwMixDA',
        'Origin': 'https://clarity.dexcom.com',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Referer': 'https://clarity.dexcom.com/',
        'Accept-Language': 'en-US,en;q=0.9',
      })
      .then(res => {
        console.log({
          url: analysisSession,
          status: res.status,
          body: res.body
        });

        assert(res.body.analysisSessionId !== 'None', 'analysisSessionId is set to "None"');
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

function getLoginCredsFromArgs(args = []) {
  const userNameIdx = args.findIndex((arg, idx) => {
    return arg === '--userName';
  });

  const passwordIdx = args.findIndex((arg, idx) => {
    return arg === '--password';
  });

  return {
    userName: args[userNameIdx + 1],
    password: args[passwordIdx + 1]
  };
}