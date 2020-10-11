# Richardson REST Maturity Model

* Level 0 - The Swamp of POX
* Level 1 - Resources
* Level 2 - HTTP Methods
* Level 3 - Hypermedia Controls

<br>

## Level 0

These are the most primitive way of building SOA applications with a single POST method and using XML to communicate between services.

In these SOAP based web services, The Request Body contains all information about the operation (DELETE, CREATE, etc.) and data on which the operation is performed.
<br />
All the requests go to a single endpoint and the endpoint knows how to do different operations.

``` bash
POST /api/user # CREATE
POST /api/user # READ
POST /api/user # UPDATE
POST /api/user # DELETE
```

<br>

### Rules:

1. Hyphens (-) should be used to improve the readability of URIs
    - http://api.example.com/blogs/guy-levin/posts/this-is-my-first-post
2. Underscores (_) should not be used in URIs
3. Lowercase letters should be preferred in URI paths
4. File extensions should not be included in URIs
    - Instead, they should rely on the media type, as communicated through the ` ` ` Content-Type ` ` ` header

<br>

## Level 1

Is all about using different URLs to interact with the different resources in your application. The operation information (create, update, delete) is still in the Request body.
<br />
REST’s resources are often correspond to a Models in your application.

``` bash
GET /api/getAllArticles
POST /api/addNewArticle
POST /api/updateArticle
POST /api/deleteArticle
POST /api/deleteAllArticles
POST /api/promoteArticle
```

1. Forward slash separator (/) must be used to indicate a hierarchical relationship
    - http://api.canvas.com/shapes/polygons/quadrilaterals/squares
2. Be consistent about whether the endpoint name is singular or plural
  + /students
  + /student

<br>

## Level 2

Use HTTP verbs to share CRUD operations across resources. Request Body will no longer carry Operation information at this level.

|Method|Scope|Semantics|
|---|---|---|
|GET|collection|Retrieve all resources in a collection|
|GET|resource|Retrieve a single resource|
|HEAD|collection|Retrieve all resources in a collection (header only)|
|HEAD|resource|Retrieve a single resource (header only)|
|POST|collection|Create a new resource in a collection|
|PUT|resource|Update a resource|
|PATCH|resource|Update a resource|
|DELETE|resource|Delete a resource|
|OPTIONS|any|Return available HTTP methods and other options|

<br>

Actions:
<br />
Are basically RPC-like messages to a resource to perform a certain non-RESTful operation.

``` bash
PUT /api/users # CREATE
GET /api/users/42 # READ
POST /api/users/42 # UPDATE
DELETE /api/users/42 # DELETE
GET /api/users?sort=name # SEARCH
```

Example:

``` bash
# Request:
GET api/users/42 HTTP/1.1
Host: developer.example.com
```

``` bash
# Response:
HTTP/1.1 200 OK
 
{
  "login": "Alfie Atkins",
  "id": 42,
  "url": "https://developer.example.com/api/users/42",
  // ...
}
```

<br>

### Level 2.1 - HTTP headers

HTTP headers are required to convey more data and information about the resource, request or response. Mostly meta-data, security, hashes and more.

``` bash
POST /api/users HTTP/1.1
HOST: developer.example.com
Authorization: Bearer AbCdEf123456 # -H
Content-Type: application/json # -H
Accept: application/json # -H

# -d
{
    "firstname": "Alfie",
    "lastname": "Atkins",
    "country": 12
}
```
<br>

### Level 2.2 - Query Parameters
Query parameters are mostly used in order to achieve some sort of searching, filtering, and querying.

``` bash
GET /api/users?age.gt=21&age.lt=40 HTTP/1.1
HOST: developer.example.com
Content-Type: application/json
Accept: application/json
```

<br>

### Level 2.3 - Status Codes
HTTP response messages use Status-Line to inform clients of their request’s result.

|Category|Scope|Description|
|---|---|---|
|2xx |Success: client’s request was accepted successfully|
|3xx |Redirection: client must take some additional action in order to complete their request|
|4xx|Client Error|
|5xx|Server Error|
---

example:
```bash
HTTP/1.1 400 Bad Request
Date: Sun, 18 Oct 2012 10:36:20 GMT
Server: Apache/2.2.14 (Win32)
Content-Length: 230
Content-Type: text/html; charset=iso-8859-1
Connection: Closed
```

<br>

## Level 3
Makes use of Hypermedia (HATEOAS – Hypermedia as Engine of Application state), which drives the interaction for the API Client.
<br />
This way a client doesn’t need to know how to interact with an application for different actions, as all the metadata will be embedded in responses from the server.

example:
```bash
# response body

{
    "name": "Alfie Atkins",
    "links": [{
            "rel": "self",
            "href": "http://developer.example.com/api/users/42"
        },
        {
            "rel": "posts",
            "href": "http://developer.example.com/api/users/42/posts"
        },
        {
            "rel": "address",
            "href": "http://developer.example.com/api/users/42/address"
        }
    ]
}
```

<br>

### Level 3.1 - Versioning
API versioning helps to ensure backward compatibility of a service while adding new features or updating existing functionality for new clients.

Methods:
- **Accept Header** <br />
    using ```Accept``` header <br />
    ```bash
    GET /api/users HTTP/1.1
    HOST: developer.example.com
    Accept: application/vnd.example.v1+json
    # OR
    Accept: application/vnd.example+json;version=1.0
    ```
- **Custom Header** <br />
    using ```X-API-Version``` header:
    ```bash
    GET /api/users HTTP/1.1
    HOST: developer.example.com
    X-API-Version: v1
    ```
- **URL** <br />
    Embed the version in the URL <br />
    ```http://developer.example.com/api/v1/users/42```  <br />
    OR  <br />
    ```http://apiv1.example.com/api/users/42```

<br>
---
### Reference

* [4 Maturity Levels of REST API Design](https://blog.restcase.com/4-maturity-levels-of-rest-api-design/)
* [Know how RESTful your API](https://developers.redhat.com/blog/2017/09/13/know-how-restful-your-api-is-an-overview-of-the-richardson-maturity-model/)
* [REST API Maturity Levels : From 0 to 5](https://damienfremont.com/2017/11/23/rest-api-maturity-levels-from-0-to-5/)
* [REST API Tutorial](https://restfulapi.net/)
