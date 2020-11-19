# Caching
Being **cacheable** is one of architectural constraints of REST.

Caching is the ability to store copies of frequently accessed data.

By using HTTP headers, an origin server indicates whether a response can be cached and, if so, by whom, and for how long. 

- `GET` requests should be cachable by default - unless specified otherwise.
- `POST` requests are not cacheable by default. They can be made cacheable if either an `Expires` header or a `Cache-Control` header is added to the response.
- Responses to `PUT` and `DELETE` requests are not cacheable at all.

<br>

### Expires
Specifies an absolute expiry time for a cached representation.

```
Expires: Fri, 20 May 2016 19:20:49 IST
```

Beyond that time, a cached representation is considered stale and must be re-validated with the origin server.

<br>

### ETag
Is an opaque string token that a server associates with a resource to uniquely identify the state of the resource

```
ETag: "abcd1234567n34jv"
```

When the resource changes, the ETag changes accordingly.

<br>

### Last-Modified
Indicates when the response was generated.

```
Last-Modified: Fri, 10 May 2016 09:17:49 IST
```

<br>

### Cache-Control
Comprises one or more comma-separated *directives*. These directives determine whether a response is cacheable, and if so, by whom, and for how long.

```
Cache-Control: max-age=3600
```

Cacheable responses should include a validator — either an `ETag` or a `Last-Modified` header.

<br><br>

---
### References
- [Caching REST API Response](https://restfulapi.net/caching/)