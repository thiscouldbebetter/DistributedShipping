function main()
{
	var schedules = Schedule.Instances()._All;

	function zonesFromCodeRange(min, max)
	{
		var zones = [];
		for (var i = min; i <= max; i++)
		{
			var zone = new Zone("" + i);
			zones.push(zone);
		}
		return zones;
	}

	var countryUsProvinces = 
	[
		new Province("AK", "Alaska", 		zonesFromCodeRange( 99500, 99999 ) ),
		new Province("AL", "Alabama", 		zonesFromCodeRange( 35000, 36999 ) ),
		new Province("AR", "Arkansas", 		zonesFromCodeRange( 71600, 72999 ) ),
		new Province("AZ", "Arizona", 		zonesFromCodeRange( 87000, 88499 ) ),
		new Province("CA", "California", 	zonesFromCodeRange( 90000, 96199 ) ),
		new Province("CO", "Colorado", 		zonesFromCodeRange( 80000, 81999 ) ),
		new Province("CT", "Connecticut", 	zonesFromCodeRange( 06000, 06999 ) ),
		new Province("DC", "District of Columbia", zonesFromCodeRange( 20000, 20099 ) ),
		new Province("DE", "Delaware", 		zonesFromCodeRange( 19700, 19999 ) ),
		new Province("FL", "Florida", 		zonesFromCodeRange( 32000, 34999 ) ),
		new Province("GA", "Georgia", 		zonesFromCodeRange( 30000, 31999 ) ), // plus 398-399
		new Province("HI", "Hawaii", 		zonesFromCodeRange( 96700, 96899 ) ),
		new Province("IA", "Iowa", 			zonesFromCodeRange( 50000, 52999 ) ),
		new Province("ID", "Idaho", 		zonesFromCodeRange( 83200, 83999 ) ),
		new Province("IL", "Illinois", 		zonesFromCodeRange( 60000, 62999 ) ),
		new Province("IN", "Indiana", 		zonesFromCodeRange( 46000, 47999 ) ),
		new Province("KA", "Kansas", 		zonesFromCodeRange( 66000, 67999 ) ),
		new Province("KY", "Kentucky", 		zonesFromCodeRange( 40000, 42999 ) ),
		new Province("LA", "Louisiana", 	zonesFromCodeRange( 70000, 71599 ) ),
		new Province("MA", "Massachusetts", zonesFromCodeRange( 01000, 02799 ) ),
		new Province("MD", "Maryland", 		zonesFromCodeRange( 20600, 21999 ) ),
		new Province("ME", "Maine", 		zonesFromCodeRange( 03900, 04999 ) ),
		new Province("MI", "Michigan", 		zonesFromCodeRange( 48000, 49999 ) ),
		new Province("MN", "Minnesota", 	zonesFromCodeRange( 55000, 56799 ) ),
		new Province("MO", "Missouri", 		zonesFromCodeRange( 63000, 65999 ) ),
		new Province("MS", "Mississippi", 	zonesFromCodeRange( 38600, 39799 ) ),
		new Province("MT", "Montana", 		zonesFromCodeRange( 59000, 59999 ) ),
		new Province("NC", "North Carolina", zonesFromCodeRange( 27000, 28999 ) ),
		new Province("ND", "North Dakota", 	zonesFromCodeRange( 58000, 58999 ) ),
		new Province("NE", "Nebraska", 		zonesFromCodeRange( 68000, 69999 ) ),
		new Province("NH", "New Hampshire", zonesFromCodeRange( 03000, 03899 ) ),
		new Province("NJ", "New Jersey", 	zonesFromCodeRange( 07000, 08999 ) ),
		new Province("NM", "New Mexico", 	zonesFromCodeRange( 08500, 08699 ) ),
		new Province("NV", "Nevada", 		zonesFromCodeRange( 88900, 89999 ) ),
		new Province("NY", "New York", 		zonesFromCodeRange( 10000, 14999 ) ),
		new Province("OH", "Ohio", 			zonesFromCodeRange( 43000, 45999 ) ),
		new Province("OK", "Oklahoma", 		zonesFromCodeRange( 73000, 74999 ) ),
		new Province("OR", "Oregon", 		zonesFromCodeRange( 97000, 97999 ) ),
		new Province("PA", "Pennsylvania", 	zonesFromCodeRange( 15000, 19699 ) ),
		new Province("RI", "Rhode Island", 	zonesFromCodeRange( 02800, 02999 ) ),
		new Province("SC", "South Carolina", zonesFromCodeRange( 29000, 29999 ) ),
		new Province("SD", "South Dakota", 	zonesFromCodeRange( 57000, 57999 ) ),
		new Province("TN", "Tennessee", 	zonesFromCodeRange( 37000, 38599 ) ), 
		new Province("TX", "Texas", 		zonesFromCodeRange( 75000, 79999 ) ),
		new Province("UT", "Utah", 			zonesFromCodeRange( 84000, 84999 ) ),
		new Province("VA", "Viginia", 		zonesFromCodeRange( 22000, 24699 ) ), // plus 201-
		new Province("VT", "Vermont", 		zonesFromCodeRange( 05000, 05999 ) ),
		new Province("WA", "Washington", 	zonesFromCodeRange( 98000, 99499 ) ),
		new Province("WI", "Wisconsin", 	zonesFromCodeRange( 53000, 54999 ) ),
		new Province("WV", "West Virginia", zonesFromCodeRange( 24700, 26999 ) ),
		new Province("WY", "Wyoming", 		zonesFromCodeRange( 82000, 83199 ) )
	];

	var countries =
	[
		new Country("US", "United States of America", countryUsProvinces)
	];

	var currencies =
	[
		new Currency("BTC", "Bitcoin"),
		new Currency("USD", "US Dollars")
	];

	var userAdmin = new User
	(
		1,
		"admin",
		"password",
		0, // points
		true, // isAdmin
		new Address(null, "ConManagementCo", "123", "Fake Street", "Atlanta", "GA", "US", "10001"), // todo
		[] // providers
	);

	var userCurrencyExchange = new User
	(
		1,
		"exchange",
		"password",
		0, // points
		new Address(null, "DAH Bank", "234", "Facoroni Drive", "Boston", "MA", "US", "10002"), // todo
		false, // isAdmin
		[
			new CurrencyExchangeProvider()
		]
	);

	var userProducer = new User
	(
		2,
		"producer",
		"password",
		0, // points
		new Address(null, "Mann's Manufacturing", "345", "Faketory Park", "Chicago", "IL", "US", "10003"), // todo
		false, // isAdmin
		[
			new ProductProvider() // todo
		]
	);

	var userCollector = new User
	(
		3,
		"collector",
		"password",
		0, // points
		new Address(null, "Barr Pickup Lines", "456", "Fakeview Terrace", "Denver", "CO", "US", "10004"), // todo
		false, // isAdmin
		[
			new TransportProvider
			(
				null, // id
				[
					new TransportOffer()
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
		new Address(null, "We-Stor-4-U", "567", "Fakita Plaza", "El Paso", "TX", "US", "10005"), // todo
		false, // isAdmin
		[
			new StorageProvider() // todo
		]
	);

	var userDistributor = new User
	(
		5,
		"distributor",
		"password",
		0, // points
		new Address(null, "Lastmile Fulfillment Services", "678", "Fauxgrass Road", "Frankfort", "KY", "US", "10006"), // todo
		false, // isAdmin
		[
			new TransportProvider() // todo
		]
	);

	var userConsumer = new User
	(
		6,
		"consumer",
		"password",
		0, // points
		false, // isAdmin
		new Address(null, "Joe Everyman", "890", "Fake Lake Lane", "Grand Rapids", "MI", "US", "10007"), // todo
		// providers
		[]
	);

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

	var users = 
	[
		userAdmin,
		userProducer,
		userCollector,
		userWarehouse,
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
