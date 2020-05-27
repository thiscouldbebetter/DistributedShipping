function main()
{
	var filePath = "../Data/Geonames_dot_org-US_Postal_Codes-Compressed.csv.txt";
	new TextStringFromFile(filePath).load(main_PostalCodesFileLoaded);
}

function main_PostalCodesFileLoaded(postalCodesAsTextCsvCompressed)
{
	var provinces = [];

	var postalCodesAsLinesCsv = postalCodesAsTextCsvCompressed.split("\n");
	var provinceCodePrev = null;
	var zoneLatitudeAsStringPrev = null;
	var zoneLongitudeAsStringPrev = null;
	var province = null;
	for (var i = 0; i < postalCodesAsLinesCsv.length; i++)
	{
		var postalCodeAsLineCsv = postalCodesAsLinesCsv[i];
		if (postalCodeAsLineCsv.length > 0 && postalCodeAsLineCsv.startsWith("//") == false)
		{
			var postalCodeAsFields = postalCodeAsLineCsv.split(",");

			var postalCode = postalCodeAsFields[1];

			var provinceCode = postalCodeAsFields[4];
			if (provinceCode == "")
			{
				provinceCode = provinceCodePrev;
			}
			else
			{
				var provinceName = postalCodeAsFields[3];
				province = new Province(provinceCode, provinceName, []);
				provinces.push(province);
			}

			var zoneLatitudeAsString = postalCodeAsFields[7];
			var zoneLongitudeAsString = postalCodeAsFields[8];
			if (zoneLatitudeAsString == "")
			{
				zoneLatitudeAsString = zoneLatitudeAsStringPrev;
			}
			if (zoneLongitudeAsString == "")
			{
				zoneLongitudeAsString = zoneLongitudeAsStringPrev;
			}

			var zoneLatitude = parseFloat(zoneLatitudeAsString);
			var zoneLongitude = parseFloat(zoneLongitudeAsString);

			var zoneGeo = new Geodesic(zoneLatitude, zoneLongitude);
			var zone = new Zone(postalCode, zoneGeo);
			province.zones.push(zone);

			provinceCodePrev = provinceCode;
			zoneLatitudeAsStringPrev = zoneLatitudeAsString;
			zoneLongitudeAsStringPrev = zoneLongitudeAsString;
		}
	}

	var countries =
	[
		new Country("US", "United States of America", provinces)
	];

	var schedules = Schedule.Instances()._All;

	var currencies =
	[
		new Currency("BTC", "Bitcoin"),
		new Currency("USD", "US Dollars")
	];

	var restrictions = 
	[
		new Restriction
		(
			0, // id
			"None", // name
			"No restrictions.", // description
			// isParcelAllowed
			() => true
		)
	];

	var restrictionGroups =
	[
		new RestrictionGroup
		(
			0, // id
			"Default",
			[
				restrictions[0]
			]
		)
	];

	var userAdmin = new User
	(
		1,
		"admin",
		"password",
		0, // points
		true, // isAdmin
		new LocationAddress
		(
			new Address(null, "ConManagementCo", "123", "Fake Street", "Atlanta", "GA", "US", "10001")
		),
		[] // providers
	);

	var userCurrencyExchange = new User
	(
		1,
		"exchange",
		"password",
		0, // points
		new LocationAddress
		(
			new Address(null, "DAH Bank", "234", "Facoroni Drive", "Boston", "MA", "US", "10002")
		),
		false, // isAdmin
		[
			new ProviderCurrencyExchange()
		]
	);

	var userProducer = new User
	(
		2,
		"producer",
		"password",
		0, // points
		new LocationAddress
		(
			new Address(null, "Mann's Manufacturing", "345", "Faketory Park", "Chicago", "IL", "US", "10003")
		),
		false, // isAdmin
		[
			new ProviderProduct() // todo
		]
	);

	var userCollector = new User
	(
		3,
		"collector",
		"password",
		0, // points
		new LocationAddress
		(
			new Address(null, "Barr Pickup Lines", "456", "Fakeview Terrace", "Denver", "CO", "US", "10004")
		),
		false, // isAdmin
		[
			new ProviderTransport
			(
				null, // id
				[
					new TransportOffer
					(
						new LocationRadius(new LocationZone("10004"), 5000), // from
						new LocationUser("collector"), // to
						"Weekdays9To5", // scheduleCode,
						8 * 60, // businessMinutesToDeliverUntilOvertime,
						5, // priceInPointsToDeliver,
						.01, // discountInPointsPerBusinessMinuteOvertime,
						"[restrictionGroupCode]", //parcelRestrictionGroupCode,
						100 // capacityInParcels
					)
				]
			)
		]
	);

	var userWarehouse = new User
	(
		4,
		"warehouse",
		"password",
		0, // points
		new LocationAddress
		(
			new Address(null, "We-Stor-4-U", "567", "Fakita Plaza", "El Paso", "TX", "US", "10005")
		),
		false, // isAdmin
		[
			new ProviderStorage() // todo
		]
	);

	var userHauler = new User
	(
		5,
		"hauler",
		"password",
		0, // points
		new LocationAddress
		(
			new Address(null, "Ares Throttle's College of Haulage", "678", "Fauxgrass Road", "Frankfort", "KY", "US", "10006")
		),
		false, // isAdmin
		[
			new ProviderTransport() // todo
		]
	);

	var userDistributor = new User
	(
		6,
		"distributor",
		"password",
		0, // points
		new LocationAddress
		(
			new Address(null, "Lastmile Fulfillment Services", "890", "Fake Lake Lane", "Grand Rapids", "MI", "US", "10007")
		),
		false, // isAdmin
		[
			new ProviderTransport() // todo
		]
	);

	var userConsumer = new User
	(
		7,
		"consumer",
		"password",
		0, // points
		false, // isAdmin
		new LocationAddress
		(
			new Address(null, "Joe Everyman", "901", "Four-Carat Highway", "Hartford", "CT", "US", "10008")
		),
		// providers
		[]
	);

	var users = 
	[
		userAdmin,
		userProducer,
		userCollector,
		userWarehouse,
		userHauler,
		userDistributor,
		userConsumer
	];

	var world = new World
	(
		"World",
		schedules,
		countries,
		currencies,
		PackageType.Instances()._All,
		restrictionGroups,
		users,
		[], // parcels,
		[], // transactions
	);

	DomHelper.Instance().pageShow
	(
		new PageHome(world)
	);
}
