
function PageProviderTransportOffer(world, user, provider, offer)
{
	this.world = world;
	this.user = user;
	this.provider = provider;
	this.offer = offer;
}

{
	PageProviderTransportOffer.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Transport Offering Details"),

			dh.label("From Zone:"),
			dh.input
			(
				"inputFromZoneCode",
				new DataBinding
				(
					this.offer,
					(c) => c.fromZoneCode,
					(c, v) => c.fromZoneCode = v
				)
			),
			dh.button("...", () => alert("todo") ),
			dh.br(),

			dh.label("To Zone:"),
			dh.input
			(
				"inputToZoneCode",
				new DataBinding
				(
					this.offer,
					(c) => c.toZoneCode,
					(c, v) => c.toZoneCode = v
				)
			),
			dh.button("...", () => alert("todo") ),
			dh.br(),

			dh.label("Schedule:"),
			dh.select
			(
				"selectSchedule",
				world.schedules,
				(x) => dh.selectOption(x.code, x.name),
				new DataBinding(this, (c) => c.scheduleCode, (c, v) => c.scheduleCode = v)
			),
			dh.br(),

			dh.label("Restrictions:"),
			dh.select
			(
				"selectRestrictionGroup",
				this.world.restrictionGroups,
				(x) => x.selectOption(x.name, x.name),
				new DataBinding(this, (c) => c.restrictionGroupCode, (c, v) => c.restrictionGroupCode = v)
			),
			dh.br(),

			dh.label("Capacity in Parcels:"),
			dh.inputNumber
			(
				"inputCapacityInParcels",
				new DataBinding
				(
					this.offer,
					(c) => c.capacityInParcels,
					(c, v) => c.capacityInParcels = v
				)
			),
			dh.br(),

			dh.label("Price in Points to Deliver:"),
			dh.inputNumber
			(
				"inputPriceInPointsToDeliver",
				new DataBinding
				(
					this.offer,
					(c) => c.priceInPointsToDeliver,
					(c, v) => c.priceInPointsToDeliver = v
				)
			),
			dh.br(),

			dh.label("Seconds To Deliver Until Considered Overtime:"),
			dh.inputNumber
			(
				"inputSecondsToDeliverUntilOvertime",
				new DataBinding
				(
					this.offer,
					(c) => c.secondsToDeliverUntilOvertime,
					(c, v) => c.secondsToDeliverUntilOvertime = v
				)
			),
			dh.br(),

			dh.label("Discount in Points Offered Per Second of Overtime"),
			dh.inputNumber
			(
				"inputDiscountInPointsPerSecondOvertime",
				new DataBinding
				(
					this.offer,
					(c) => c.discountInPointsPerSecondOvertime,
					(c, v) => c.discountInPointsPerSecondOvertime = v
				)
			),
			dh.br(),

			dh.button
			(
				"Back",
				() => dh.pageShow( new PageProviderTransport(this.world, this.user, this.provider) )
			)
		]);
		return divPage;
	};
}
