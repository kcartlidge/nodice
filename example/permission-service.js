
var permissionService = {

	canAccessAdmin: function (personId, permissionRepository, constants) {
		var message = permissionRepository.canAccessArea(personId, constants.AdminArea);
		return "Person ID " + personId + " - " + message;
	}

};

module.exports = permissionService;
