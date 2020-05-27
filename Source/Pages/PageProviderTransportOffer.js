
function PageProviderTransportOffer(world, user, provider, offer)
{
	this.world = world;
	this.user = user;
	this.provider = provider;
	this.offer = offer.clone();
}

{
	PageProviderTransportOffer.prototype.toDomElement = function()
	{
		var locationTypes = LocationType.Instances()._All;

		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Transport Offering Details"),

			dh.label("From Location:"),
			dh.select
			(
				"selectLocationFromTypeCode",
				locationTypes,
				(x) => dh.selectOption(x.code, x.name),
				new DataBinding
				(
					this,
					(c) => c.locationFromTypeCode,
					(c, v) =>
					{
						c.locationFromTypeCode = v;
					}
				)
			),
			dh.input
			(
				"inputLocationFromAsString",
				new DataBinding
				(
					this.offer,
					(c) => c.locationFrom.toString(),
					(c, v) => c.locationFrom = Location.fromString(v)
				)
			),
			dh.br(),

			dh.label("To Location:"),
			dh.select
			(
				"selectLocationToTypeCode",
				locationTypes,
				(x) => dh.selectOption(x.code, x.name),
				new DataBinding
				(
					this,
					(c) => c.locationToTypeCode,
					(c, v) =>
					{
						c.locationToTypeCode = v;
					}
				)
			),
			dh.input
			(
				"inputLocationToAsString",
				new DataBinding
				(
					this.offer,
					(c) => c.locationTo.toString(),
					(c, v) => c.locationTo = Location.fromString(v)
				)
			),
			dh.br(),

			dh.label("Schedule:"),
			dh.select
			(
				"selectSchedule",
				this.world.schedules,
				(x) => dh.selectOption(x.code, x.name),
				new DataBinding(this, (c) => c.scheduleCode, (c, v) => c.scheduleCode = v)
			),
			dh.br(),

			dh.label("Restrictions:"),
			dh.select
			(
				"selectRestrictionGroup",
				this.world.restrictionGroups,
				(x) => dh.selectOption(x.name, x.name),
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

			dh.label("Business Minutes to Deliver Until Considered Overtime:"),
			dh.inputNumber
			(
				"inputBusinessMinutesToDeliverUntilOvertime",
				new DataBinding
				(
					this.offer,
					(c) => c.businessMinutesToDeliverUntilOvertime,
					(c, v) => c.businessMinutesToDeliverUntilOvertime = v
				)
			),
			dh.br(),

			dh.label("Discount in Points Offered Per Business Minute of Overtime"),
			dh.inputNumber
			(
				"inputDiscountInPointsPerBusinessMinuteOvertime",
				new DataBinding
				(
					this.offer,
					(c) => c.discountInPointsPerBusinessMinuteOvertime,
					(c, v) => c.discountInPointsPerBusinessMinuteOvertime = v
				)
			),
			dh.br(),

			dh.button
			(
				"Save",
				() => 
				{
					var offers = this.providers.offers;
					var offerExisting = offers.filter(x => x.id == this.offer.id);
					if (offerExisting != null)
					{
						offers.splice(offers.indexOf(offerExisting), 1);
					}
					offers.push(this.offer);
					dh.pageShow
					(
						new PageProviderTransport(this.world, this.user, this.provider)
					);
				}
			),

			dh.button
			(
				"Cancel",
				() => dh.pageShow( new PageProviderTransport(this.world, this.user, this.provider) )
			)
		]);
		return divPage;
	};
}
