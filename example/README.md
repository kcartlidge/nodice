# About this Example

This example simulates a codebase with separate layers for presentation,
services (business) and repositories (data).

To run the example:

``` sh
cd <this-folder>
node example.js
```

The aim is to show that provided all registrations have been done it becomes possible to have module properties and/or method parameters *magically* provided with no effort on the part of the developer. This also means that should implementations change then only the dependency registrations need updating, and the remainder of the codebase will continue to function.

The basic flow of the example is as follows:

* The ```example.js``` file uses the ```dependency-registration.js``` module to load in all known presentation, business and data modules.

* It then asks the returned *container* for the **ui** module, which is the entry point.

* It calls the UI's ```showAdminAccessDetails``` with a couple of sample users.

* The UI is only given the ```userId```. Thanks to the registrations already performed when the container was created, the ```permissionRepository``` is already known and **nodice** provides it automatically.

* The service also has a ```constants``` property. As this is visible outside the module and it's name matches a registration, **nodice** automatically provides that too.

* The service calls the permissionRepository providing only the ```userId``` and ```area```. As the ```constants``` are known, they are once again provided automatically.

* The UI displays the result.
