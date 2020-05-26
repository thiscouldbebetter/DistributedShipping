
function PageShipmentPlanDetail()
{}
{
	PageShipmentPlanDetail.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Shipment Plan Details"),

			dh.button
			(
				"Search",
				() => alert("todo")
			),
		]);
		return divPage;
	};
}
