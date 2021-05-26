# REST_API_Example
There are only one file server.js to test on localhost
# Prerequisites
  1. Node js installed on the system
  2. redis installed on the system
  3. git CLI installed on the system
  4. PostMan for better experience of this API

# Libraries that I used
  1. Express js - for creating server and handling request and response of API endpoints
  2. Axios- sending async http request to external APIs
  3. Redis- for storing cache values remotely for fast performance
# Steps to start locally on windows
  1. Clone this repo using git clone https://github.com/manthanpandey23/REST_API_Example.git 
  2. Run redis-server --port 6380 --slaveof 127.0.0.1 6379
  3. Go to REST_API_Example folder and run 'npm i' on cmd.
  4. Go to http://localhost:3000/activity/search?text='test' text value could be any string that you want to search.
  5. Go to response tab at the bottom and check for message if the API response is come from cache it will display 'data retrieved from the cache' otherwise 'cache miss'.
  6. For every new search the message will display cache miss but if the user search again than it will display from the cache.
