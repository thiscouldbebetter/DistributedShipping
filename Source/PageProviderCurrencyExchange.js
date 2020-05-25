
function PageProviderCurrencyExchange(world, user, provider)
{
	this.world = world;
	this.user = user;
	this.provider = provider;
}

{
	PageProviderCurrencyExchange.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Currency Exchange Offered by User '" + this.user.username + "'"),

			dh.label("Currency:"),
			dh.select
			(
				"selectCurrencyCode",
				this.world.currencies,
				(x) => dh.selectOption( x.code, x.name ),
				new DataBinding(this, (c) => c.currencyCode, (c, v) => c.currencyCode = v)
			),
			dh.br(),

			dh.label("Points Offered per Currency Unit"),
			dh.inputNumber
			(
				"inputPointsOfferedPerCurrencyUnit",
				new DataBinding
				(
					this.provider,
					(c) => c.pointsOfferedPerCurrencyUnit,
					(c, v) => c.pointsOfferedPerCurrencyUnit = v
				)
			),
			dh.br(),

			dh.label("Currency Units Offered per Point:"),
			dh.inputNumber
			(
				"inputCurrencyUnitsOfferedPerPoint",
				new DataBinding
				(
					this.provider,
					(c) => c.currencyUnitsOfferedPerPoint,
					(c, v) => c.currencyUnitsOfferedPerPoint = v
				)
			),
			dh.br(),

			dh.label("Capacity in Currency Units:"),
			dh.inputNumber
			(
				"inputCapacityInCurrencyUnits",
				new DataBinding
				(
					this.provider,
					(c) => c.capacityInCurrencyUnits,
					(c, v) => c.capacityInCurrencyUnits = v
				)
			),
			dh.br(),

			dh.button
			(
				"Back to User Details",
				() => dh.pageShow( new PageUser(this.world, this.user) )
			) 
		]);
		return divPage;
	};
}
