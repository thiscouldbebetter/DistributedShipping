
function LocationType(code, name, locationFromString)
{
	this.code = code;
	this.name = name;
	this.locationFromString = locationFromString;
}

{
	LocationType.Instances = function()
	{
		if (LocationType._instances == null)
		{
			LocationType._instances = new LocationType_Instances();
		}
		return LocationType._instances;
	}

	function LocationType_Instances()
	{
		this.Address = new LocationType("A", "Address", x => LocationAddress.fromString(x) );
		this.Geodesic = new LocationType("G", "Geodesic", x => LocationGeodesic.fromString(x) );
		this.Multiple = new LocationType("M", "Multiple", x => LocationMultiple.fromString(x) );
		this.Radius = new LocationType("R", "Radius", x => LocationRadius.fromString(x) );
		this.User = new LocationType("U", "User", x => LocationUser.fromString(x) );
		this.Zone = new LocationType("Z", "Zone", x => LocationZone.fromString(x) );

		this._All = 
		[
			this.Address,
			this.Geodesic,
			this.Multiple,
			this.Radius,
			this.User,
			this.Zone
		].addLookupsByCode();
	};
}
