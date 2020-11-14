# API Design

API design is important because consumers should know how to use them in a simple way. APIs should be self-describing and self documenting.

### What is a Web API?

*HTTP/RPC*: remote procedure call
- have state or session.
- the **Verb** is included in the endpoint (i.e GetCustomer).
- have **URI Endpoint**, which is a address to get the functionality.  

*Restful API*:
- stateless.
- resource URIs **HTTP verbs** ([HTTP GET] Customer)
- content negotiation 
- **HATEOAS** link relations (Hypermedia) - included in payload of data from the services link to other operations.

<br>

### Resource based architecture
- URIs are paths to resources
    - Query strings for non data (format, sort, ...)
- Resources are entities
- Relationships are nested (as hierarchy not relational model)

### REST
- Separation of client and server
- Server requests are stateless
- Cacheable requests
- Uniform interface

<br>

## Designing the API

URI should contain *Nouns*, not *Verbs*
- GetCustomer -> incorrect
- https://.../api/customers -> prefer plural

User identifiers to locate individual items in URIs (does not have to be internal key)
- https://.../customers/123
- https://.../games/halo-3
- https://.../invoices/2020-11-03

<br>

### Verb to Action map
- GET -> read
- POST -> create
- PUT -> update
- DELETE -> delete

| Resource | GET | POST | PUT | DELETE |
| -------- | --- | ---- | --- | ------ |
| `/customers` | List | New Item | Status Code | Status Code (Error) |
| `/customers/123` | Item | Status Code (error) | Update Item | Status Code |

<br>

### Status Code

Normally we need between 8 to 10 status codes:

The most basic ones are:

- 200 OK
- 400 Bad Request
- 500 Internal Server Error

In addition we can provide:
- 201 Created
- 304 Not Modified
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

<br>

### Association

For sub-objects:
- Use URI navigation
    ```
    https://.../api/customers/123/invoices
    https://.../api/games/halo3/ratings
    https://.../api/invoices/2020-11-03/payments
    ```

- Should return list of related objects
    ```
    https://.../api/customers/123/invoices
    https://.../api/invoices
    ```
    Both the above endpoints should return same shape.


Anything more complex should use query strings:
```
https://.../api/customers?state=GA&salesperson=144
```

<br>

### Formatting results

Content negotiation is a best practice.
- Use ```Accept-Header``` to determine how to format:
    ```
    GET /api/games/2 HTTP/1.1
    Accept: application/json, text/xml
    Host: localhost:3001
    ```
- Not necessary to support all and have sane default

<br>

Common content types are:
- JSON: application/json
- XML: text/xml
- JSONP: application/javascript
    <br>Can return a JavaScript function
    ```
    https://.../api/customers?callback=foo
    ```
- RSS: application/xml+rss
- ATOM: application/xml+atom

<br>

We can use URI components to format:
```
https://.../api/customers?format=json
https://.../api/customers.json
https://.../api/customers?format=jsonp&callback=foo
```

<br>

### Designing results

- Naming should not express server details.
- Single result should be simple objects.
- Collections should be wrapped in a single object.
    ```json
    "result": [
        {...},
        ...
    ]
    ```

<br>

### Entity tags (ETags)

Is a header to support smart server caching.
- Support both strong and weak caching
- Return in the response:
    ```
    ETag: "4895508718998" # strong: byte by byte identical
    Etag: w/"4895508718998" # weal cache
    ```

Client should send `ETag` back to see if new version is available.
- Request with `If-None-Match`:
    ```
    If-None-Match: "4895508718998"
    ```
- Use `304 Not Modified` to indicate that the data has not changed.
- For optimistic concurrency in `PUT` request, use `If-Match`: if client-server match, then update the data.
- Use status code if it doesn't match:
    ```
    HTTP/1.1 412 Precondition Failed
    ```

<br>

### Paging

List should always support paging.
- Query string parameters should be used to request paging information.
- Object wrapper to indicate `next/prev` link.
    ```json
    {
        "totalResults": 1598,
        "nextPage": "https://.../api/games?page=3",
        "prevPage": "https://.../api/games?page=1",
        "results": [...]
    }
    ```
- We can use different page size as well - but limit size of page to limit server load:
    ```
    https://.../api/games?page=5&pageSize=50
    ```

<br>

### Partial Items
User request what it needs.

- Allow for request of partial items. Query string is a common pattern for requesting parts:
    ```
    https://.../api/games/123?fields=id,name,price,imageUrl
    ```
- Updating of partial items. We can use `PATCH` HTTP verb.
- Update of partial is possible with `ETag` support:
    ```
    PATCH /api/games/2 HTTP/1.1

<br>

### Non-resource APIs

What about those parts not related to domain models and entities?

Fundamental parts of your API:
- Be pragmatic and make sure that these parts of your API are documented.
- Be sure that the user can tell different type of operation:
    ```
    https://.../api/calculateTax?state=GA&total=149.99
    https://.../api/restartServer?isColdBoot=true
    ```

<br><br>

---
### References

* [Shawn Wildermuth - Web API Design](https://www.pluralsight.com/courses/web-api-design)
* [Best practices for REST API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
* [Web API design](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)