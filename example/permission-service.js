
var permissionService = {

	canAccessAdmin: function (personId, permissionRepository) {
		var message = permissionRepository.canAccessArea(personId, 'admin');
		return "Person ID " + personId + ": " + message;
	}

};

module.exports = permissionService;
