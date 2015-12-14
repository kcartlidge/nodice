# NoDice v1.0.0
### Simple Dependency Resolution for Node Modules

[By K Cartlidge](http://www.kcartlidge.com).

## Licence

[MIT Licence (very permissive)](http://opensource.org/licenses/MIT).
[See the GitHub licence summary bullet points here](http://choosealicense.com/licenses/mit/).

A copy of the licence is within the package source.

## Current Status

* *Parameter injection* for all top-level module/object functions.
* *Service locator* using IOC.resolve() for other situations.

The *parameter injection* facility serves as an enhanced form of
**constructor injection** in that if your module is a factory then it's
creation function will have it's dependencies injected.

## Why do I Need It?

You don't. But it makes things nicer.

## What Problem does it Solve?

When your Node projects get bigger one of the first things you do
is start splitting it into smaller modules that you then *require* in.

Suppose you have a module that checks if a person has permission to
an area of site functionality:

``` javascript
var permissionRepository = {
	canAccessArea: function (personId, area) {
		return true;
	}
};
module.exports = permissionRepository;
```

That check may need doing in many different places, so each of those
places will probably end up doing a *require*:

``` javascript
var permissionRepository = require('../dataAccess/permissionRepository.js');
var permissionService = {
	canAccessAdmin: function (personId) {
		return permissionRepository.canAccessArea(personId, 'admin');
	}
};
module.exports = permissionService;
```

This leads to a proliferation of almost identical require statements,
all of which need maintaining as you refactor. Multiply this out by the
number of other modules you use and it gets unwieldy quite quickly.

It also makes it tricky to share instances across other modules.

## How Does it Fix Things?

Classically, especially with enterprise-level development, an IOC
(Inversion of Control) and DI (Dependency Injection) system is used,
for example AutoFac, Castle Windsor or TinyIoC.
In brief, it allows you to register stuff (like modules) just once
then wherever you use them in your code it makes them available
automatically.

NoDice does something similar, and simply. And when I say simply,
I *mean* simply. Here's an example.

**Register Some Modules**

``` javascript
IOC = require('nodice');
IOC.register('constants', require('./constants.js'));
IOC.register('permissionRepository', require('./permission-repository.js'));
IOC.register('permissionService', require('./permission-service.js'));
```

The order matters. If the *service* needs the *repository* injected,
then the repository needs registering first.

**Lifetime**

As these are registrations provided by the caller, Nodice does not take
responsibility for *lifetime*. As long as they have a reference count
they are alive. Usually that means they are alive for the lifetime of
either the Nodice container or the original loader, whichever is the longer.

You can register right at the start to a global container, or you could for
example register a local instance when a web request arrives.

**Use Those Modules**

``` javascript
var permissionService = {
	canAccessAdmin: function (personId, permissionRepository, constants) {
		return permissionRepository.canAccessArea(personId, constants.AdminArea);
	}
};
module.exports = permissionService;
```

Provided they were all registered, which *permissionRepository* and
*constants* were, then calling an also-registered *permissionService*
will work with you only needing to provde the *personId*.

**The injected parameters must currently appear last!**

As an aside, there is another way to get what you need:

``` javascript
var constants = IOC.resolve('constants');
```

## Installation

It's an npm module:

``` sh
npm install nodice
```

## Usage:

``` javascript
IOC = require('nodice');
```

### register

``` javascript
IOC.register(name, module);
```

Example:

``` javascript
IOC.register('constants', require('./data/constants'));
```

* Registration order matters - if *A* needs *B* then *B* must
be registered first.

* For parameters to be injected, they must appear after all others.

*name*

This is the name by which the module will be referred to when
requested. It should be a valid, unique JavaScript identifier.

*module*

Usually the returned result of a *require* statement.
This is the module/object which will be returned when the
registration is resolved.

### resolve

``` javascript
IOC.resolve(name);
```

Example:

``` javascript
IOC.resolve('permissionService').canAccessArea(1,'admin');
```

This will return the resolution of the dependency requested.
The name is the textual name provided at registration, which
may not necessarily be the same as the module's internal name.

**Remember that this is the long-winded optional way to resolve
the dependency**. You can get it much easier by using parameter
injection.

### getRegistrations

``` javascript
IOC.getRegistrations();
```

This returns a simple array of the names that have been
registered.

## Test Coverage

If you glance at the source, you'll see the codebase is very
small. There is therefore a correspondingly diminutive (but
complete) set of tests available:

``` sh
npm test
```

## Examples

The *tonic-example.js* file has been removed as being too
complex to follow with stubbed modules etc.

There is however an *example* folder which contains a trivial
but demonstrative example:

``` sh
npm run example
```
