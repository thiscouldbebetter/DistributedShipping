
function LocationType(code, name)
{
	this.code = code;
	this.name = name;
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
		this.Address = new LocationType("A", "Address");
		this.Geodesic = new LocationType("G", "Geodesic");
		this.Zone = new LocationType("Z", "Zone");

		this._All = 
		[
			this.Address,
			this.Geodesic,
			this.Zone
		].addLookupsByCode();
	};
}
