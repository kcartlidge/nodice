
var permissionService = {

	constants: null,

	canAccessAdmin: function (personId, permissionRepository) {
		var area = permissionService.constants.AdminArea;
		var message = permissionRepository.canAccessArea(personId, area);
		return "Person ID " + personId + " in area '" + area + "' - " + message;
	}

};

module.exports = permissionService;
