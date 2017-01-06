// This is declared before being exported, as the canAccessArea method
// requires a reference to the permissionService so it can see 'constants'.
var permissionService = {

	// As this is a property with a null value, it will be automatically
	// resolved by nodice as this module is loaded.
	// Therefore it can be assumed to already be populated.
	constants: null,

	// The caller should only provide the 'userId'. As the 'permissionRepository'
	// has already been registered it will be injected automatically.
	canAccessAdmin: function (userId, permissionRepository) {
		var area = permissionService.constants.AdminArea;
		var message = permissionRepository.canAccessArea(userId, area);
		return "Person ID " + userId + " in area '" + area + "' - " + message;
	}

};

module.exports = permissionService;
