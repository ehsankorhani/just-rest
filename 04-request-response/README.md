# Request and Response

Request is an HTTP call which defines what kind of operation to perform. The data which sent back on that request is called the response.

<br>

## Anatomy Of A Request

Request is made up of four parts:

1. Endpoint
2. Method
3. Headers
4. Data (or Body)

<br>

### 1. Endpoint
Or Route is the url you request for.

**Root-endpoint** is the main domain you’re requesting from. For example:
```
https://api.github.com 
```

**Path** determines the resource you’re requesting for. For instance:
```
/users/emails
```

In most cases the API documentation will provide the available resources.


**Path parameters** are the variables that should be replaced by a proper data:

```
/users/:id/emails
```

We denote them with colon (```:```) in documentation.

The **query parameters** are options to modify the request with key-value pairs. They first one begins with a question mark (```?```) and each parameter pair is then separated with an ampersand (```&```):

```
?query1=value1&query2=value2
```

Query parameters are mainly used for filtering or sorting in REST APIs.

<br>

### 2. Method

Is the HTTP method we use to send a request to the server.

There are many different methods but the most widely used ones are:

- GET
- POST
- PUT
- PATCH
- DELETE

By convention we map them to a certain meaning:

| Method Name | Usage | 
|-------------|-------|
| GET         | Performs a `READ` operation and gets a resource from a server |
| POST        | Performs an `CREATE` operation. |
| PUT         | Makes a *full* resource `UPDATE` operation on the server |
| PATCH       | Makes a *partial* `UPDATE` on the server  |
| DELETE      | `DELETE`s a resource on the server |


<br>

### 3. Headers

Headers provide information to both the client and the server.

We use them for many different purposes such as authentication, content types and any extra request parameters.

HTTP Headers are property-value pairs:

```
Content-Type: application/json
Authorization: Bearer <token>
```

<br>

### 4. Data (or Body)

Body contains information we want to be sent to the server, normally to ```Update``` or ```Create``` resources.

We can use it with ```Delete``` but often does not add any value and many end-points ignore it.

We cannot use Body with `Get`.

<br><br>

## Status Codes

Bu convention we use HTTP Status Code to convey a meaning in the response message.

Below is the list of categorized families of status codes:

| Status Code | Meaning | 
|-------------|---------|
| 2xx         | Success operation |
| 3xx         | Redirects |
| 4xx         | Client error |
| 5xx         | Server error |

<br><br>

## API Versions

In order to provide a consistent way to communicate with the server, an API versioning mechanism will be used. This ensures that the future changes in API backend will not affect the previously bound communications.

There are multiple ways to apply this. Two most common ones are:

- Directly in the endpoint URL
    ```
    https://api.twitter.com/1.1/account
    ```
- In a request header



<br><br>

---
References
* [Understanding And Using REST APIs](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/)