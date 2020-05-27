
function TransportOffer
(
	locationFrom,
	locationTo,
	schedule,
	businessMinutesToDeliverUntilOvertime,
	priceInPointsToDeliver,
	discountInPointsPerBusinessMinuteOvertime,
	parcelRestrictionGroupId,
	capacityInParcels
)
{
	this.locationFrom = locationFrom || new Location();
	this.locationTo = locationTo || new Location();
	this.schedule = schedule;
	this.businessMinutesToDeliverUntilOvertime = businessMinutesToDeliverUntilOvertime,
	this.priceInPointsToDeliver = priceInPointsToDeliver;
	this.discountInPointsPerBusinessMinuteOvertime = discountInPointsPerBusinessMinuteOvertime;
	this.parcelRestrictionGroupId = parcelRestrictionGroupId;
	this.capacityInParcels = capacityInParcels;
}
{
	TransportOffer.prototype.clone = function()
	{
		return new TransportOffer
		(
			this.locationFrom.clone(),
			this.locationTo.clone(),
			this.schedule,
			this.businessMinutesToDeliverUntilOvertime,
			this.priceInPointsToDeliver,
			this.discountInPointsPerBusinessMinuteOvertime,
			this.capacityInParcels
		);
	};
}
