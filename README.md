# NoDice v1.0.6

### Simple Dependency Resolution for Node Modules

[By K Cartlidge](http://www.kcartlidge.com).

[Available on npm](https://www.npmjs.com/package/nodice)
with the [source on github](https://github.com/kcartlidge/nodice).

## Licence

[MIT Licence (very permissive)](http://opensource.org/licenses/MIT).
[See the GitHub licence summary bullet points here](http://choosealicense.com/licenses/mit/).

A copy of the licence is within the package source.

## About NoDice

This is a **Dependency Injection** (DI) package for **Inversion of Control** (IoC) operating at the *module* level. It currently does automatic **parameter injection** for all registered **modules**, plus property injection for visible properties having known names.

In addition to modules plain JavaScript objects are supported, though as this is designed for module-level code only the parameters for **top level functions** are injected.

**Constructor Injection** works if your module is a **factory**, as the *create* method (or equivalent) is effectivly a module function that can receive injected parameters.

**Property Injection** is now supported also. Any property at the top level whose *name* matches that of a something registered *and* whose value is **null** will get an injection.
Simply declare properties like `permissionRepository:null` and it will just work - provided your dependencies are registered in the correct order.

NoDice is intended for **server** code and requires parameter names to match the *names* of registrations. For this reason, **minification** of parameter names will break the injection as the names will no longer match.

## Current Status

* **Parameter injection** for all top-level module/object functions.
* **Property injection** based on exported properties with *null* values.
* **Service locator** using `resolve()` for other situations.

## Requirements

* It's designed for use with **Node**, but **unminified client** JavaScript should be fine.
* Currently, parameter(s) that are to be injected must be the last parameter(s) listed in a function declaration. This is mostly an **aesthetics** concern.

## Installation

It's an npm module:

``` sh
npm install nodice
```

## Using nodice

In the ```example``` subfolder there is an example of a multi-layered codebase with a presentation layer, service, repository and constants. That example includes another *README* file with fuller details.

## Lifetime

The dependency `container`, unlike with C# containers (for example) has no *lifetime* enumeration/declaration. The registrations are *by reference* and as long as those references remain (or the container/registration is in scope), so do the registrations.

## Container Scope

* Declared *without* a `var` a `container` gains global scope.
* Declared *with* a `var` a `container` is scoped like any other JavaScript object.

It is therefore possible to have local (or even module-level private) containers in addition to a possible global one.

## Syntax

It is strongly recommended that you check the ```example``` subfolder's code and README for clarity; usage is simpler than the syntax might imply.

**Reference the Module**

``` javascript
container = require('nodice');       // global
```

or

``` javascript
var container = require('nodice');   // scoped
```

**Register a Dependency**

``` javascript
container.register(name, module);
```

*name*

This is the name by which the module will be referred to when requested or when a property/parameter is matched for automatic injection. It should be a valid, unique JavaScript identifier.

*module*

Usually the returned result of a *require* statement, this is the module/object which will be returned when the registration is resolved.

Due to the nature of Node modules this should either be treated as a singleton or coded as a factory.

**Optional Manual Resolve**

``` javascript
var thing = container.resolve(name);
return thing.canAccessArea(1, constants.AdminArea);
```

This will return the resolution of the dependency requested. The name is the textual name provided at registration, which may not necessarily be the same as the module's internal name.

If the thing being resolved also has injections, they will be actioned automatically.

**Check Registered Modules**

``` javascript
var registrations = container.getRegistrations();
```

This returns a simple array of the names that have been registered.

## Test Coverage

There is test coverage using **Jasmine**.
In addition I make use of the *Wallaby* JavaScript continuous test runner. A suitable *wallaby.js* file is present. Wallaby shows full code coverage.

You can run the tests using:

``` sh
npm test
```

## Examples

There is an *example* subfolder which contains a trivial but demonstrative example (based on the examples above) and whose code is both simple and instructive:

``` sh
npm run example
```

It has it's own README with more information.
