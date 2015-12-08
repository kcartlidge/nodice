# NoDice
## Simple Dependency Resolution for Node Modules

By K Cartlidge.

### Licence

[MIT Licence (very permissive)](http://opensource.org/licenses/MIT).
[GitHub licence summary bullet points](http://choosealicense.com/licenses/mit/).

A copy of the licence is within the package source.

### Why do I Need It?

You don't. But it makes things nicer.

### What Problem does it Solve?

When your Node projects get bigger one of the first things you do
is start splitting it into smaller modules that you then *require* in.

Suppose you have a module that checks if a person has permission to
an area of site functionality:

	var permissionRepository = {
		canAccessArea: function (personId, area) {
			return true;
		}
	};
	module.exports = permissionRepository;

That check may need doing in many different places, so each of those
places will probably end up doing a *require*:

	var permissionRepository = require('../dataAccess/permissionRepository.js');
	var permissionService = {
		canAccessAdmin: function (personId) {
			return permissionRepository.canAccessArea(personId, 'admin');
		}
	};
	module.exports = permissionService;

This leads to a proliferation of almost identical require statements,
all of which need maintaining as you refactor. Multiply this out by the
number of other modules you use and it gets unwieldy quite quickly.

### How Does it Fix Things?

Classically, especially with enterprise-level development, an IOC
(Inversion of Control) and DI (Dependency Injection) system is used,
for example AutoFac, Castle Windsor or TinyIoC.
In brief, it allows you to register stuff (like modules) just once
then wherever you use them in your code it makes them available
automatically.

That's a step too far for a simple solution. And when I say simple,
I mean simple. Here's an example.

**Register Some Modules**

	IOC = require('nodice');
	IOC.register('constants', require('./constants.js'), true);
	IOC.register('permissionService', require('./permission-service.js'));

Note that the first has *true* at the end. That registers it globally.

**Use Those Modules**

	var permissionService = {
		canAccessAdmin: function (personId) {
			return IOC.permissionRepository.canAccessArea(personId, 'admin');
		}
	};
	module.exports = permissionService;

This is the same module as before, but there is no *require*. Instead
we can get the *permissionRepository* directly from *IOC*.

The *constants* module that was registered with *true* at the end is
available even easier:

	var permissionRepository = {
		canAccessArea: function (personId, area) {
			return constants.message;
		}
	};
	module.exports = permissionRepository;

You can simply refer to it directly; once registered it's always
available.

So why would you ever do the other way? Many people do not like
polluting the global namespace. For the benefit it gives, having
*IOC* there as per the first usage example is a good trade,
especially given that a naming collision is terribly unlikely
(why would you have multiple IOC resolutions going on?), but the
availability of all registrations at the very top is contentious.
I like it as my naming is pretty obvious and thorough; many don't.

As an aside, there is a third way to get what you need. This is
really there as a convenience method and not often used:

	var permissionRepository = {
		canAccessArea: function (personId, area) {
			return IOC.resolve('constants').message;
		}
	};
	module.exports = permissionRepository;

## Installation

It's an npm module:

	npm install nodice

## Usage:

	var IOC = require('nodice');

As a general note, be aware that sometimes the order of
registrations matters. If module B refers to module A at
the time it is loaded, module A must already be available.
If it doesn't refer to module A until it is actually used,
it may well be fine for module A to not yet be loaded.

### register

	IOC.register(name, module, registerGlobally);

Example:

	IOC.register('constants', require('./data/constants'), true);

*name*

This is the name by which the module will be referred to when
requested. It should be a valid JavaScript identifier.
Duplicates (by name) are not registered.
Name collisions for globally registered modules will throw an
error.

*module*

The returned result of a *require* statement. This is the module
which will be returned when the registration is resolved.
Note that whilst non-modules (effectively any JavaScript object)
will usually work, this is a side-effect not a design criteria
and so should not be relied upon.

*registerGlobally*

If *false* (the default) the dependency can only be resolved via
the *IOC* property (eg IOC.constants.ok) or the *resolve* method
(eg IOC.resolve('constants').ok). If it is *true* then the resolution
is always available directly (eg constants.ok).

### resolve

	IOC.resolve(name);

Example:

	IOC.resolve('permissionService').canAccessArea(1,'admin');

This will return the resolution of the dependency requested.
The name is the textual name provided at registration, which
may not necessarily be the same as the module's internal name.

### getRegistrations

	IOC.getRegistrations();

This returns a simple array of the names that have been
registered.

## Test Coverage

If you glance at the source, you'll see the codebase is very
small. There is therefore a correspondingly diminutive (but
complete) set of tests available:

	npm test

## Examples

There is an *example* folder which contains a trivial but
demonstrative example:

	npm run example
