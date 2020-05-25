
function PackageType(code, name)
{
	this.code = code;
	this.name = name;
}

{
	PackageType.Instances = function()
	{
		if (PackageType._instances == null)
		{
			PackageType._instances = new PackageType_Instances();
		}
		return PackageType._instances;
	}

	function PackageType_Instances()
	{
		this.Box = new PackageType("B", "Box");
		this.Envelope = new PackageType("E", "Envelope");
		this.Loose = new PackageType("L", "Loose");
		this.Sack = new PackageType("S", "Sack");
		this.Tube = new PackageType("T", "Tube");

		this._All = 
		[
			this.Box,
			this.Envelope,
			this.Loose,
			this.Sack,
			this.Tube
		].addLookupsByCode();
	};
}
