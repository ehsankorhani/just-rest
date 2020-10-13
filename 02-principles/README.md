# Principles

> REST defines 6 architectural constraints which make any web service – a true RESTful API.

### 1. Uniform interface
A resource in the system should have only one logical URI. That URI should provide a way to fetch related or additional data.<br>
All resource representations across the system should follow specific and consistent guidelines.
### 2. Client–server
Client application and Server application must be able to evolve separately without any dependency on each other. 
### 3. Stateless
All interactions should be stateless. The server will not store anything about the latest HTTP request. 
### 4. Cacheable
Caching should be applied to resources when possible. These resources must declare themselves as cacheable.<br>
Caching can be implemented on the server or client.
### 5. Layered system
REST allows the use of a layered system architecture. So, each logically separated section is deployed in a different layer (Data Access, Logic, etc.). 
### 6. Code on demand (optional)
We can return executable code to support a part of the application.

<br><br>

---
### References

* [REST Architectural Constraints](https://restfulapi.net/rest-architectural-constraints/)