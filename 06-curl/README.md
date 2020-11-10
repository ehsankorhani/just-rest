# cURL

cURL is a command line tool for doing URL manipulations and transfers. This library which can be used to receive and send data between any two machines connected over the internet. 

cURL supports a wide range of protocols including HTTP, FTP, IMAP, LDAP, POP3, SMTP, etc.

<br>

## Installation

Normally cURL is shipped with Linux distros, but it can be installed in Ubuntu/Debian systems with:

```
$ sudo apt update
$ sudo apt install curl
```

<br>

## Basic commands

cURL basic syntax is:

```
$ curl [options] <url>
```

This command retrieves the content available at the URL.

The command will print the content into the terminal but to save it to a file we can use ```-o <file-name>``` attribute.

```
$ curl -o content.txt example.com
```

We can even download other type of files this way.

```
$ curl -o img.png example.com/logo.png
```
<br>

### Options

The most common options when making Curl requests are:

* `-X`, `--request`: The HTTP method to be used.
* `-i`, `--include`: Include the response headers.
* `-d`, `--data`: The data to be sent.
* `-H`, `--header`: Additional header to be sent.

<br>

### Request and Response details

With `--verbose` (or `-v`) we can see more information on the request and response.

```
$ curl --verbose example.com
```

To view even more details we can use `--trace` and `--trace-ascii`:

```
$ curl --trace-ascii debugdump.txt http://www.example.com/
```

<br>

## HTTP Methods With cURL

### GET

Is the default method and does not need to be explicitly stated.

```
$ curl -v https://reqres.in/api/users/2
```

```
*   Trying 104.27.134.11:443...
* TCP_NODELAY set
* Connected to reqres.in (104.27.134.11) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/ssl/certs/ca-certificates.crt
...
```

<br>

### POST

We use `POST` method to send data to a server. We can use the data option to send a payload in the request.

```
$ curl -X POST -d "userId=5&title=Hello World&body=Post body." https://jsonplaceholder.typicode.com/posts
```


The default `Content-Type` is `application/x-www-form-urlencoded`.

To specify a different type we can add a header option

```
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "morpheus","job": "leader"}' https://reqres.in/api/users
```

<br>

### PUT and PATCH

The commands are similar to POST but is used to perform *Update* and *Partial Update* operation.

```
$ curl -X PUT -d '{"name":"morpheus","job":"zion resident"}' https://reqres.in/api/users/2
```

```
$ curl -X PATCH -d '{"name":"morpheus","job":"zion resident"}' https://reqres.in/api/users/2
```

<br>

### DELETE

With `DELETE` we can request to remove a resource from the server.

```
$ curl -X DELETE 'https://reqres.in/api/users/2'
```

<br>

## Authentication

The `Authorization` header can be used to request an authorization on the server.

```
$ curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" https://api.server.io/posts
```

For basic authentication, we can embed the username and password combination in the request using the `user` option:

```
$ curl --user alfie:pass http://example.com/
```

<br>

## Redirects 

By default cURL does not redirect when receives a redirect after making a request. We can force it to do so with `-L` option,

```
$ curl -L http://www.facebook.com/
```

`--max-redirs <number>` allows to specify the number of redirects.

<br><br>

---
### References

* [cURL Command Tutorial with Examples](https://www.booleanworld.com/curl-command-tutorial-examples/)
* [Test a REST API with curl](https://www.baeldung.com/curl-rest)
* [The Art Of Scripting HTTP Requests Using Curl](https://curl.haxx.se/docs/httpscripting.html)
* [Using Curl to make REST API requests](https://linuxize.com/post/curl-rest-api/)