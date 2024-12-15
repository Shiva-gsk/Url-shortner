Live at :- https://url-shortner-1to6.onrender.com

Api Endpoints:-

1. POST /shorten/
   - Shortens longUrl sent through request body and returns shortUrl in response body

2. GET /redirect/:shortUrl
   - Gives the corresponding longUrl for give shortUrl
   - The shortUrl consists of only last part of the url path
   - For example if shortUrl is http://localhost:3000/abc123 then GET request should be make to /redirect/abc123 to get corresponding longUrl

3. GET /details?url=<url>
   - needs a query paramater representing url
   - returns corresponding short or long url with hitCount

4. GET /top/:number
   - returns top Urls based on hitCount limited to dynamic parameter number
