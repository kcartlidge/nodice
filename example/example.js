// Get a container from our DI registration module (where the magic is set up).
var container = require("./dependency-registration.js");

// Get the entry point of our codebase.
var ui = container.resolve("ui");

console.log();
console.log("This is a very short, contrived example. Check the 'example' subfolder.");
console.log();

var userWithAdminRights = 1;
var userWithoutAdminRights = 10;

// Perform a couple of sample calls to the presentation layer.
// We only pass the userId as, given that the ui module is registered within the
// container, nodice is able to fill in the remaining parameters.
ui.showAdminAccessDetails(userWithAdminRights);
ui.showAdminAccessDetails(userWithoutAdminRights);

console.log();
