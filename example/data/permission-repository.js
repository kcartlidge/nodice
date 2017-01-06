var permissionRepository = {

	// The caller should only pass the 'personId' and 'area' (which is for
	// illustrative purposes only and is ignored).
	// As the 'constants' have already been registered they will be
	// injected automatically.
	canAccessArea: function (personId, area, constants) {
		// Anybody with an ID below 10 has access.
		return personId < 10 ? constants.Okay : constants.Forbidden;
	}

};

module.exports = permissionRepository;
