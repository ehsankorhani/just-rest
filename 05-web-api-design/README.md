# Web API Design

API design is important because consumers should know how to use them in a simple way. APIs should be self-describing and self documenting.

A well designed web API is:
- **Platform independent**: Any client should be able to call the API. This requires using standard protocols and a format of the data to exchange.
- **Service evolution**: The web API should be able to evolve and add functionality independently from client applications.

<br>

## What is a Web API?

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

### REST
- Separation of client and server
- Server requests are stateless
    - highly scalable - any server can handle any request from any client
- Cacheable requests
- Uniform interface
    - includes using standard HTTP verbs to perform operations on resources

<br>

### Resource based architecture
REST APIs are designed around resources, which are any kind of object, data, or service that can be accessed by the client.

- URIs are paths to resources
    - Query strings for non data (format, sort, ...)
- Resources are entities
- Relationships are nested (as hierarchy not relational model)
- A resource has an *identifier*
    ```
    https://.../api/orders/1
    ```
- Clients interact with a service by exchanging representations of resources (usually JSON)
    ```js
    {"orderId":1,"orderValue":99.90,"productId":1,"quantity":1}
    ```
- REST APIs are driven by hypermedia links that are contained in the representation.
    ```js
    {
        "orderID":3,
        "productID":2,
        "quantity":4,
        "orderValue":16.60,
        "links": [
            {"rel":"product","href":"https://.../api/customers/3", "action":"GET" },
            {"rel":"product","href":"https://.../api/customers/3", "action":"PUT" }
        ]
    }
    ```

<br>

## Designing the API

> Organize the API around resources

URI should contain *Nouns*, not *Verbs*
- GetCustomer -> incorrect
- https://.../api/customers
    * Note: prefer plural

User identifiers to locate individual items in URIs (does not have to be internal key)
- https://.../customers/123
- https://.../games/halo-3
- https://.../invoices/2020-11-03

<br>

A resource doesn't have to be based on a single physical data item. A resource might be implemented internally as several tables in a relational database, but presented to the client as a single entity.

> Avoid requiring resource URIs more complex than `collection/item/collection`.

<br>

### Define operations in terms of HTTP methods
- GET --> read
- POST --> create
- PUT --> update
- DELETE --> delete
- PATCH --> partial update

| Resource | GET | POST | PUT | DELETE |
| -------- | --- | ---- | --- | ------ |
| `/customers` | List | New Item | Bulk Update / Status Code | Status Code (Error) / Remove all customers|
| `/customers/123` | Item | Status Code (error) | Update Item | Status Code |

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

| Resource | GET | POST | PUT | DELETE |
| -------- | --- | ---- | --- | ------ |
| `/customers/123/orders` | Orders of customer 123 | New order | Bulk Update / Status Code | Status Code (Error) / Remove all orders for customer 123 |

<br>

## Conform to HTTP semantics

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

**GET method**
- A successful `GET` method typically returns HTTP status code `200 (OK)`.
- If the resource cannot be found, the method should return `404 (Not Found)`.

<br>

**POST method**
- If a `POST` method creates a new resource, it returns HTTP status code `201 (Created)`.
    - The response body contains a representation of the resource.
- If it does not create a resource return `200 (OK)` and return content.
- If there is no result return HTTP status code `204 (No Content)`.
- For invalid data return `400 (Bad Request)`.

<br>

**PUT method**
- If a `PUT` method creates a new resource, it returns HTTP status code `201 (Created)`.
- If it updates an existing resource, return either `200 (OK)` or `204 (No Content)`.
- If update is not possible return `409 (Conflict)`.

*Consider implementing bulk HTTP PUT operations.

<br>

**PATCH methods**
The media type for JSON merge patch is `application/merge-patch+json`.

- If format isn't supported return `415 (Unsupported Media Type)`.
- For malformed patch document return `400 (Bad Request)`.
- If patch document is valid, but the changes can't be applied to the resource in its current state return `409 (Conflict)`.

<br>

**DELETE method**
- For successful delete return `204 (No Content)`
- If the resource doesn't exist, return `404 (Not Found)`.

<br>

### Media types

Formats are specified through the use of *media types*, also called `MIME types`.

he `Content-Type` header in a request or response specifies the format of the representation.

```
POST https://.../api/orders HTTP/1.1
Content-Type: application/json; charset=utf-8

{"Id":1,"Name":"Gizmo","Category":"Widgets","Price":1.99}
```

The server should return HTTP status code `415 (Unsupported Media Type)` If it doesn't support the media type.

<br>

### Content negotiation

A client request can include an `Accept-Header` that contains a list of media types the client will accept from the server 

```
GET /api/games/2 HTTP/1.1
Accept: application/json, text/xml
Host: localhost:3001
```

If the server cannot match any of the media type(s) listed, it should return HTTP status code `406 (Not Acceptable)`.

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
## Versioning

Once you published an API, it's set in stone. Users/Customers are going to code against that API and they rely on the API not changing.

However, the requirements are going to change or you need to provide new enhancements without breaking codes.

API versioning is not Product versioning. Release API version only when the semantics, signature and the shape of data you are dealing are changing.

> They shall not break existing clients.

<br>

### Versioning in the URI path
Using part of the path to version allows you to drastically change the API:

```
https://.../api/v1/customers?type=current&id=123
https://.../api/v2/current-customers/123
```
#### Tumblr
```
https://api.timblr.com/v2/user/
```

**Pros**:
- Simple to segregate old APIs for backward compatibility

**Cons**:
- Requires lots of client changes as you version (version # has to change in every client)
- Increase the size of the URI surface area you have to support

<br>

### Versioning in the URI parameters
With optional query string parameter:
```
https://.../api/customers
https://.../api/customers?v=2
```

#### Netflix
```
http://api.netflix.com/catalog/titles/series/70023?v=1.5
```

**Pros**:
- Without version, users always get latest version of API
- Little client changes as versions mature

**Cons**:
- Can surprise developers with unintended changes

<br>

### Versioning with Content Negotiation
We can use `Accept` header for content negotiation. Use custom value Instead of standard MIME types:
```
GET /api/customers/123
HOST: https://.../
Accept: application/myapp.v1.customer.json
``` 

We can include information in Accept header for format too.

#### Github
```
Content-Type: application/vnd.github.1.param+json
```

**Pros**:
- Versioning is separated from URI surface. Alternatively, we can create our own MIME type: `vendor-name.myapp.v1.customers`
- Package API and Resource versioning in one
- Removes versioning from API so clients don't have to change

**Cons**:
- Adds complexity - adding headers isn't easy on all platforms
- Can encourage increased versioning which causes more code churning

<br>

### Versioning with Custom Header
Using a custom header to version API calls:
```
GET /api/customers/123
HOST: https://...
x-MyApp-version:2.1
```

Most routers will ignore the `x-` headers.

#### Azure
```
x-ms-version: 2011-08-18
```

**Pros**:
- Separate versioning from API call signature
- Not tied to resource versioning

**Cons**:
- Adds complexity - adding headers isn't easy on all platforms
- The resource you return should be versioned too (versioning with custom content type is easier)

<br><br>

---
## Securing APIs
Think about security in the entire process.
- Private, sensitive, credential data
- Protect against overuse

<br>

### Protect your API
Secure In-Transit.
- SSL is almost always appropriate
- Cost of SSL is worth the expense (usually)

<br>

#### Cross Domain Security
What domains are using the API? Is it a private or public API?

Two approaches:
- Support *JSONP* as a format
- Enable cross-origin resource sharing (CORS)

<br>

#### JSONP - JSON with Padding
JSON wrapped in a function.<br>
Packages results as a JavaScript script that is executed. We are getting JavaScript from different domains (CDN).<br>
JavaScript calls back into one of your functions with the data.

```js
function updateUser(data) { /* use data */ }
```
```
GET /api/games?callback=updateUser HTTP/1.1
HOST: localhost:8863
Accept: application/JavaScript # not JSON
```
```js
updateUser({totalResults=1, results=[...]});
```

<br>

#### Implementing CORS

Allow cross site support from browser, but requires some handshaking.
Implementing is difficult, but many platforms support it.

1. Cross-Origin request is made
2. Server asked is CORS allowed
3. Server responds with rules
4. Request is made with CORS header

<br>

#### Who is calling the API?

1. Server-to-Server authentication
    - API keys and shared secrets
2. User proxy authentication
    - OAuth or similar
3. Direct user authentication
    - Cookies or Token

<br>

#### How API Key and Signing works:
1. Developer signs up for API
2. API Issues API Key and shared secret

Then;
1. Developer creates request Action + API Key + Timestamp
2. Developer signs request with shared secret
3. Developer sends request + signature to service
4. Service looks up shared secret via API Key
5. Service signs request with shared secret
6. Service verifies some signature and within timeout

<br><br>

---
### References

* [Shawn Wildermuth - Web API Design](https://www.pluralsight.com/courses/web-api-design)
* [Best practices for REST API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
* [Web API design](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)