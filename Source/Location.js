function Location(typeCode, data)
{
	this.typeCode = typeCode;
	this.data = data;
}
{
	Location.fromString = function(stringToParse)
	{
		var typeCodeAndData = stringToParse.split(":");
		var typeCode = typeCodeAndData[0];
		var data = typeCodeAndData[1];
		var type = LocationType.Instances()[typeCode];
		var instance = type.locationCreate(data);
	};

	Location.prototype.clone = function()
	{
		return new Location(this.typeCode, this.data);
	};

	Location.prototype.toString = function()
	{
		return this.data;
	};

	Location.prototype.type = function()
	{
		return LocationType.Instances()[this.typeCode];
	};
}

function LocationAddress(address)
{
	this.address = address;
}
{
	LocationAddress.fromString = function(stringToParse)
	{
		return new LocationAddress(Address.fromString(stringToParse));
	};

	LocationAddress.prototype.clone = function()
	{
		return new LocationAddress(this.address.clone());
	};

	LocationAddress.prototype.toString = function()
	{
		return this.address.toString();
	};
}

function LocationGeodesic(geodesic)
{
	this.geodesic = geodesic;
}
{
	LocationGeodesic.fromString = function(stringToParse)
	{
		return new LocationGeodesic(Geodesic.fromString(stringToParse));
	};

	LocationGeodesic.prototype.clone = function()
	{
		return new LocationGeodesic(this.geodesic.clone());
	};

	LocationGeodesic.prototype.toString = function()
	{
		return this.geodesic.toString();
	};
}

function LocationMultiple(children)
{
	this.children = children;
}
{
	LocationMultiple.fromString = function(stringToParse)
	{
		var childrenAsStrings = stringToParse.split(";")
		var children = childrenAsStrings.map(x => Location.fromString(x) );
		return new LocationMultiple(children);
	};

	LocationMultiple.prototype.clone = function()
	{
		return new LocationMultiple(this.children.clone());
	};

	LocationMultiple.prototype.toString = function()
	{
		return this.children.map(x => x.toString).join(";");
	};
}

function LocationRadius(locationCenter, radiusInMeters)
{
	this.locationCenter = locationCenter;
	this.radiusInMeters = radiusInMeters;
}
{
	LocationRadius.fromString = function(stringToParse)
	{
		var locationCenterAndRadiusAsStrings = stringToParse.split(",");
		var locationCenterAsString = locationCenterAndRadiusAsStrings[0];
		var radiusAsString = locationCenterAndRadiusAsStrings[1];
		var locationCenter = Location.fromString(locationCenterAsString);
		var radiusInMeters = parseFloat(radiusAsString);
		return new LocationRadius(locationCenter, radiusInMeters);
	};

	LocationRadius.prototype.clone = function()
	{
		return new LocationRadius(this.locationCenter.clone(), this.radiusInMeters);
	};

	LocationRadius.prototype.toString = function()
	{
		return this.locationCenter.toString() + "," + this.radiusInMeters;
	};
}

function LocationUser(username)
{
	this.username = username;
}
{
	LocationUser.fromString = function(stringToParse)
	{
		return new LocationUser(stringToParse);
	};

	LocationUser.prototype.clone = function()
	{
		return new LocationUser(this.username);
	};

	LocationUser.prototype.toString = function()
	{
		return this.username;
	};
}

function LocationZone(zoneCode)
{
	this.zoneCode = zoneCode;
}
{
	LocationZone.fromString = function(stringToParse)
	{
		return new LocationZone(stringToParse);
	};

	LocationZone.prototype.clone = function()
	{
		return new LocationZone(this.zoneCode);
	};

	LocationZone.prototype.toString = function()
	{
		return this.zoneCode;
	};
}
