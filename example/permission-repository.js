
// Not registered globally, so can use the IOC global or do a resolve.
var message = "The permissionRepository says '" + IOC.resolve('constants').ok + "'.";

var permissionRepository = {

	canAccessArea: function (personId, area) {
		var result = '(Person:' + personId + ', Area: ' + area.toUpperCase() + ')\n';
		return result + message;
	}

};
module.exports = permissionRepository;
