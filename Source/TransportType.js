
function TransportType(id, name)
{
	this.id = id;
	this.name = name;
}

{
	TransportType.Instances = function()
	{
		this.Airplane = new TransportType(4, "Airplane");
		this.Boat = new TransportType(3, "Boat");
		this.Car = new TransportType(1, "Car");
		this.Foot = new TransportType(2, "Foot");
	}
}
