
var permissionRepository = {

	canAccessArea: function (personId, area, constants) {
		return personId < 10 ? constants.Okay : constants.Forbidden;
	}

};

module.exports = permissionRepository;
