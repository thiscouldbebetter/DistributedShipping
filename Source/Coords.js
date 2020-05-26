
function Coords(x, y)
{
	this.x = x;
	this.y = y;
}
{
	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	};

	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	};

	Coords.prototype.divide = function(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	};

	Coords.prototype.fromGeodesic = function(geodesic)
	{
		this.x = geodesic.longitude;
		this.y = geodesic.latitude;
		return this;
	};

	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	};

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	};

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	};

	Coords.prototype.yReverse = function()
	{
		this.y = 1 - this.y;
		return this;
	};
}
