# Resource

> The key abstraction of information in REST is a resource. 

Any information that can be named can be a resource: a document, an image, an object, etc. 

<br>

**Resource identifier**
is an operation to identify the particular resource involved in an interaction between components.

**Resource representation**
is the state of the resource at any particular timestamp.<br>
This representation consists of *data*, *metadata describing the data* and *hypermedia* links.

**Hypermedia**
guides the clients in transition to the next desired state.

**Media type**
is data format of a representation.

<br>

## Methods
*Roy Fielding* emphasizes on *uniform interface*. There is no constraints on mapping any particular HTTP method to a resource action.

However, most people follow the general HTTP to Rest convention.

<br>

### Query based API result
Query is not a substitute for identification of resources.

They should be represented with a list of links, not by arrays of original resource representations.

<br>

## Naming guide

> REST APIs use Uniform Resource Identifiers (URIs) to address resources. 

**Singleton or Collection** 
* Identify *customers* collection resource using the URI ```/customers```.
* Identify a single *customer* resource using the URI ```/customers/{customerId}```.

**Sub-collection**
* Identify *accounts* sub-collection resource using the URI ```/customers/{customerId}/accounts```.
* Identify a single *account* resource using the URI ```/customers/{customerId}/accounts/{accountId}```.

<br>

### Use nouns to represent resources
RESTful URI should refer to a resource that is a thing (noun) instead of referring to an action (verb).

examples:
* Users of a system
* Customers of a bank
* Cars of a showroom

```
http://api.example.com/user-management/users/
http://api.example.com/user-management/users/{id}
```

We can divide the resource archetypes into four categories:

1. **document**<br>
    is a singular concept or object instance or database record.
    ```
    http://api.example.com/user-management/users/{id}
    http://api.example.com/user-management/users/admin
    ``` 
2. **collection**<br>
    is a directory of resources.
    ```
    http://api.example.com/user-management/users
    http://api.example.com/user-management/users/{id}/accounts
    ```
3. **store**<br>
    is a client-managed resource repository. Use “plural” name to denote this archetype.
    ```
    http://api.example.com/song-management/users/{id}/playlists
    ```
4. **controller**<br>
    Models a procedural concept. Use “verb” to denote this archetype.
    ```
    http://api.example.com/cart-management/users/{id}/cart/checkout
    ```

<br>

## Other conventions

* Do not use trailing forward slash ( ```/``` ) in URIs.
* Use hyphens ( ```-``` ) to improve the readability of URIs.
* Do not use underscores ( ```_``` ).
* Use lowercase letters in URIs.
* Do not use file extensions.
* Do not use CRUD function names in URIs.
    ```
    https://adventure-works.com/orders // Good
    https://adventure-works.com/create-order // Avoid
    ```
* Use query component to filter URI collection.
    ```
    http://api.example.com/device-management/managed-devices?region=USA
    ```

<br><br>

---
### Reference

* [What is REST](https://restfulapi.net/)