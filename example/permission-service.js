var permissionService = {

	canAccessAdmin: function (personId) {
		// Repository registered globally, so just start using it.
		return permissionRepository.canAccessArea(personId, 'admin');
	}

};
module.exports = permissionService;
