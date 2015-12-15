# NoDice v1.0.3
### Simple Dependency Resolution for Node Modules

[By K Cartlidge](http://www.kcartlidge.com).

## Licence

[MIT Licence (very permissive)](http://opensource.org/licenses/MIT).
[See the GitHub licence summary bullet points here](http://choosealicense.com/licenses/mit/).

A copy of the licence is within the package source.

## About NoDice

This is a **Dependency Injection** (DI) package for **Inversion of Control** (IoC).
It currently does automatic **parameter injection** for all registered **modules**.

Plain objects are supported, though as this is designed for module-level code only the paameters for **top level functions** are injected.

**Constructor Injection** works if your module is a **factory**, as the *create* method (or equivalent) remains a function that can receive injections.

**Property Injection** is now supported also. Any property at the top level whose *name* matches that of a something registered and whose value is **null** will get an injection.
Simply declare properties like `permissionRepository:null` and it will just work - provided your dependencies are registered in the correct order.

NoDice is intended for **server** code and requires parameter names to match registrations.
For this reason, **minification** of parameter names will break the injection.

An update to support this is relatively imminent.


## Current Status

* **Parameter injection** for all top-level module/object functions.
* **Property injection** based on exported properties with *null* values.
* **Service locator** using `resolve()` for other situations.

## Upcoming

* Dependency parameter positioning enhancements
* Minification support to not break injections

## Requirements

* It's designed for use with **Node**, but **unminified client** JavaScript should be fine.
* Currently, parameters that are to be injected must be the last parameters listed in a function declaration.
An update to get around this is under consideration; in the meantime that's mostly an **aesthetics** concern.

## Installation

It's an npm module:

``` sh
npm install nodice
```

## Registering Modules/Objects

Require it as normal; the module exports the *container*:

``` javascript
var container = require("nodice");
```

Register your modules, by *unique* name:

``` javascript
container.register('constants', require('./constants.js'));
container.register('permissionRepository', require('./permission-repository.js'));
container.register('permissionService', require('./permission-service.js'));
```

## Dependency Injection

Assume the above `container.register` statements register the following modules:

``` javascript
// constants.js

var constants = {
	AdminArea: "admin",
	Okay: "You have permission to this area.",
	Forbidden: "Sorry, you cannot access this area."
};
module.exports = constants;
```

``` javascript
// permission-repository.js

var permissionRepository = {
	canAccessArea: function (personId, area, constants) {
		return personId < 10 ? constants.Okay : constants.Forbidden;
	}
};
module.exports = permissionRepository;
```

``` javascript
// permission-service.js

var permissionService = {
	constants: null,
	canAccessAdmin: function (personId, permissionRepository) {
		var area = permissionService.constants.AdminArea;
		var message = permissionRepository.canAccessArea(personId, area);
		return "Person ID " + personId + " in area '" + area + "' - " + message;
	}
};
module.exports = permissionService;
```

Your main **node** entry point may look like this:

``` javascript
// index.js

container = require('../index.js');

var permissionService = require('./permission-service.js');

IOC.register('constants', require('./constants.js'));
IOC.register('permissionRepository', require('./permission-repository.js'));
IOC.register('permissionService', permissionService);

console.log(permissionService.canAccessAdmin(9));
console.log(permissionService.canAccessAdmin(10));
```

This will give an output of:

	Person ID 9 in area 'admin' - You have permission to this area.
	Person ID 10 in area 'admin' - Sorry, you cannot access this area.

How this works is straightforward.

The `container` declaration, as it does not start with `var`, makes a globally-available container.
There are few cases where this is a good idea; DI *can* be one.

*It is not necessary for the `container` to be global.*

We declare a `permissionService` independent of the container to allow us to call it as normal without needing to `resolve` it first.
This isn't a requirement (`container.resolve` would work) but looks nicer.

We then register the three modules, where the names given are the expected function parameter names during injection.
For example, `permissionService` has a function (`canAccessAdmin`) with a parameter named `permissionRepository`, so the registration of that name would be injected.

That service also has a `constants` property which, being set to *null*, will have the *constants* module injected automatically.

Finally, call a function on something that has been registered - in this case `permissionService.canAccessAdmin`.
As it is registered, and so are the dependencies, the function is called with the `permissionRepository` and `constants` parameters resolved in the background.

*Remember - only the top level functions of a registered module/object receive injections.*

## Ordering of Registrations

This matters.

When something is registered, if the thing to be injected into a function parameter within it has not also been registered then no injection is set up for that parameter.

Whilst this does not instantly break things, it does mean that when you finally call a function with such a parameter then that parameter will either need passing manually or will be `undefined`.

In our example above, `permissionService` has `permissionRepository` injected into one of it's functions.
Therefore, `permissionRepository` is registered first.

## Lifetime

The `container` will stay in scope as long as it has at least one registration within it where the thing registered also still has a reference.

In other words, unlike with say C# containers there is no *lifetime* enumeration/declaration.
The registrations are *by reference* and as long as those references remain (or the container/registration is in scope) so do the registrations.

## Container Scope

* Declared *without* a `var` a `container` gains global scope.
* Declare *with* a `var` a `container` is scoped like any other JavaScript object.

It is therefore possible to have local (or even private module) containers in addition to a possible global one.

## Syntax

**Reference the Module**

``` javascript
container = require('nodice');
```

or

``` javascript
var container = require('nodice');
```

**Register a Dependency**

``` javascript
container.register(name, module);
```

*name*

This is the name by which the module will be referred to when
requested. It should be a valid, unique JavaScript identifier.

*module*

Usually the returned result of a *require* statement.
This is the module/object which will be returned when the
registration is resolved.

**Optional Manual Resolve**

``` javascript
var thing = container.resolve(name);
return thing.canAccessArea(1, constants.AdminArea);
```

This will return the resolution of the dependency requested.
The name is the textual name provided at registration, which may not necessarily be the same as the module's internal name.

If the thing being resolved also has injections, they will be actioned automatically.

**Check Registered Modules**

``` javascript
var registrations = container.getRegistrations();
```

This returns a simple array of the names that have been
registered.

## Test Coverage

If you glance at the source, you'll see the codebase is compact. There is therefore a correspondingly diminutive set of tests available (about 85% coverage at the moment):

``` sh
npm test
```

## Examples

There is an *example* folder which contains a trivial but demonstrative example (based on the examples above) and whose code is both simple and instructive:

``` sh
npm run example
```
