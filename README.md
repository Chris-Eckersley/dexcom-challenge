# Dependencies
 Node version 13.5.0 or greater.

# Set up
From the project root run:

 ```npm i```

# Test command
From the project root run:

```npm run test -- --userName <user_name> --password <password>```

Example: `npm run test -- --userName fredrick01 --password mysecretPassword@1`

# Notes
If the design of the test was to test the api directly, I would find a way to get access to the JWT and call the analysis_session endpoint directly. 

Otherwise, the test becomes brittle and starts to test things like session management, cookie, and login logic and gets messy. In that case, rather than try to mimic or manage session like a web browser, I would use a headless browser or browser simulating library and just test against the network traffic directly.

# Dexcom code challenge instructions
## Test Steps:
1. Login with username and password xxxxxxx/xxxxxx
2. make HTTP request call to "/api/subject/1594950620847472640/analysis_session"
3. Assert analysisSessionId should not be None

## Some Requirements and hints:
* DO NOT use selenium and webdriver for this test.
* Create a test for API, not WEB.
* Use sessions obj from python requests library to easily maintain a "session"
* (Optional) Use a python automation framework. e.g. robot framework (Keyword Driven), unittest (like JUnit), cucumber (BDD) or any other test framework. 
* (Optional) Centralize configuration for host, username and password (Do not hard code)
* Upload code in GitHub is highly recommended.  
* Code completion in python is not mandatory. Explain the understanding of the login process in details or complete code in a different language as an alternative.
