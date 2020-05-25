
function PageShipmentPlanSearch(world, user)
{
	this.world = world;
	this.user = user;

	this.parcelToShip = new Parcel();
	this.shipmentPlansCalculated = [];
}

{
	PageShipmentPlanSearch.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Shipment Plan Search"),

			dh.p
			(
				"Enter criteria and click the Search button to calculate"
				+ " and view possible shipment plans through various"
				+ " providers."
			),

			dh.button
			(
				"Back to User Details",
				() => dh.pageShow( new PageUser(this.world, this.user) )
			),
			dh.br(),

			dh.label("Parcel to Ship:"),
			this.parcelToShip.toDomElement(this.world, this.user),
			dh.br(),

			dh.button
			(
				"Search",
				() => alert("todo")
			),
			dh.br(),

			dh.label("Calculated Shipment Plans:"),
			dh.br(),

			dh.selectList
			(
				"listShipmentPlansCalculated",
				this.shipmentPlansCalculated,
				(x) => dh.selectOption(x.id, x.toString() ),
				new DataBinding
				(
					this,
					(c) => c.shipmentPlanSelected,
					(c, v) => c.shipmentPlanSelected = v
				),
				5 // itemsToShow
			)
		]);
		return divPage;
	};
}
