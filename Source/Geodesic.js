
function Geodesic(latitude, longitude, altitude)
{
	this.latitude = latitude;
	this.longitude = longitude;
	this.altitude = altitude;
}
{
	Geodesic.prototype.clone = function()
	{
		return new Geodesic(this.latitude, this.longitude, this.altitude);
	};
}
