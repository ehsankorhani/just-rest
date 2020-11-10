# Consuming APIs

## Read documentation

- Developers should familiarize themselves with the layout of the APIs that the service exposes
- With REST, we have actors and actions

## JSON over XML

- XML is harder to parse 
- JSON is easier to read

## SSL

- Keep sensitive information sent across the internet encrypted

## API Idempotence

- If the API result varies by call, consider using another API (if available) to get the information you need.

## Updates

- To avoid conflicts during updates, it is recommended to GET the state of the resource, modify the response and then update it via a PUT call.

## Concurrency Conflicts
Smart programming practices dictate that you use conditional updates using the eTag feature.

When making a GET call, look for the `eTag` signature that the API returns, and when you make the update, make a reference to that `eTag`.


<br><br>

---
### References 
* [RESTful Services - Best Practices on Consuming APIs](https://www.developer.com/design/restful-services-best-practices-on-consuming-apis.html)