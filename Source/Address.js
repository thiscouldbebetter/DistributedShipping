
// classes

function Address
(
	id,
	addresseeName,
	streetNumber,
	streetName,
	cityName,
	provinceCode,
	countryCode,
	zoneCode
)
{
	this.id = id || ("_" + Math.random());
	this.addresseeName = addresseeName || "";
	this.streetNumber = streetNumber || "";
	this.streetName = streetName || "";
	this.cityName = cityName || "";
	this.provinceCode = provinceCode || "";
	this.countryCode = countryCode || "US";
	this.zoneCode = zoneCode || "";
}

{
	Address.fromString = function(stringToParse)
	{
		var fieldsAsStrings = stringToParse.split(" ");
		return new Address
		(
			null, // id
			fieldsAsStrings[0], // addresseeName
			fieldsAsStrings[1], // streetNumber
			fieldsAsStrings[2], // streetName
			fieldsAsStrings[3], // cityName
			fieldsAsStrings[4], // provinceCode
			fieldsAsStrings[5], // countryCode
			fieldsAsStrings[6], // zoneCode
		);
	};

	Address.prototype.country = function(world)
	{
		return world.countries[this.countryCode];
	};

	Address.prototype.randomize = function(world)
	{
		var country = world.countries.random();
		var province = country.provinces.random();
		var zone = province.zones.random();
		var randomizer = Randomizer.Instance();
		return new Address
		(
			null, // id,
			randomizer.randomSyllables(2, 3).uppercaseFirstCharacter()
				+ " " + randomizer.randomSyllables(2, 4).uppercaseFirstCharacter(), // addresseeName,
			randomizer.randomIntegerBetween(100, 10000), // streetNumber
			randomizer.randomSyllables(2, 3).uppercaseFirstCharacter() + " Street", // streetName,
			randomizer.randomSyllables(1, 3).uppercaseFirstCharacter() + "ville", // cityName,
			province.code,
			country.code,
			zone.code
		);
	};

	Address.prototype.toString = function()
	{
		var fields =
		[
			this.addresseeName,
			this.streetNumber,
			this.streetName,
			this.cityName,
			this.provinceCode,
			this.countryCode,
			this.zoneCode
		];
		var returnValue = fields.join(" ");
		return returnValue;
	};

	// Clonable.

	Address.prototype.clone = function()
	{
		return new Address
		(
			this.id, this.addresseeName, this.streetNumber, this.streetName,
			this.cityName, this.provinceCode, this.countryCode, this.zoneCode
		);
	};

	// Dom.

	Address.prototype.toDomElement = function(world, user)
	{
		var dh = DomHelper.Instance();

		var suffix = "_" + this.id;
		var userAddress = user.address;

		var returnValue = dh.divBordered
		([
			dh.button
			(
				"Set from User Address",
				() =>
				{
					dh.get("inputAddresseeName" + suffix).value = userAddress.addresseeName;
					dh.get("inputStreetNumber" + suffix).value = userAddress.streetNumber;
					dh.get("inputStreetName" + suffix).value = userAddress.streetName;
					dh.get("inputCityName" + suffix).value = userAddress.cityName;
					dh.get("selectCountryCode" + suffix).value = userAddress.countryCode;
					dh.get("selectProvinceCode" + suffix).value = userAddress.provinceCode;
					dh.get("inputZoneCode" + suffix).value = userAddress.zoneCode;
				}
			),
			dh.button
			(
				"Randomize",
				() =>
				{
					var address = new Address().randomize(world);
					dh.get("inputAddresseeName" + suffix).value = address.addresseeName;
					dh.get("inputStreetNumber" + suffix).value = address.streetNumber;
					dh.get("inputStreetName" + suffix).value = address.streetName;
					dh.get("inputCityName" + suffix).value = address.cityName;
					dh.get("selectCountryCode" + suffix).value = address.countryCode;
					dh.get("selectProvinceCode" + suffix).value = address.provinceCode;
					dh.get("inputZoneCode" + suffix).value = address.zoneCode;
				}
			),
			dh.br(),

			dh.label("Addressee:"),
			dh.input
			(
				"inputAddresseeName" + suffix,
				new DataBinding
				(
					this,
					(c) => c.addresseeName,
					(c, v) => c.addresseeName = v
				)
			),
			dh.br(),
			dh.label("Street Number"),
			dh.input
			(
				"inputStreetNumber" + suffix,
				new DataBinding
				(
					this,
					(c) => c.streetNumber,
					(c, v) => c.streetNumber = v
				),
				64 // widthInPixels
			),
			dh.label("Street Name:"),
			dh.input
			(
				"inputStreetName" + suffix,
				new DataBinding
				(
					this,
					(c) => c.streetName,
					(c, v) => c.streetName = v
				)
			),
			dh.br(),
			dh.label("City:"),
			dh.input
			(
				"inputCityName" + suffix,
				new DataBinding
				(
					this,
					(c) => c.cityName,
					(c, v) => c.cityName = v
				),
				96 // widthInPixels
			),
			dh.label("Country:"),
			dh.select
			(
				"selectCountryCode" + suffix,
				world.countries,
				(x) => dh.selectOption(x.code, x.code),
				new DataBinding
				(
					this,
					(c) => c.countryCode,
					(c, v) => c.countryCode = v
				),
				64 // widthInPixels
			),
			dh.label("State/Province:"),
			dh.select
			(
				"selectProvinceCode" + suffix,
				this.country(world).provinces,
				(x) => dh.selectOption(x.code, x.code),
				new DataBinding
				(
					this,
					(c) => c.provinceCode,
					(c, v) => c.provinceCode = v
				),
				64 // widthInPixels
			),
			dh.label("Zone Code (ZIP):"),
			dh.input
			(
				"inputZoneCode" + suffix,
				new DataBinding
				(
					this,
					(c) => c.zoneCode,
					(c, v) => c.zoneCode = v
				),
				64 // widthInPixels
			),
			dh.br()
		]);

		return returnValue;
	};
}
