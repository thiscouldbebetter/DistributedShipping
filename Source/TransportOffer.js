
function TransportOffer
(
	zoneFromCode,
	zoneToCode,
	scheduleId,
	secondsToDeliverUntilOvertime,
	discountInPointsPerSecondOvertime,
	priceInPointsToDeliver,
	parcelRestrictionGroupId,
	capacityInParcels
)
{
	this.zoneFromCode = zoneFromCode;
	this.zoneToCode = zoneToCode;
	this.scheduleId = scheduleId;
	this.secondsToDeliverUntilOvertime = secondsToDeliverUntilOvertime;
	this.discountInPointsPerSecondOvertime = this.discountInPointsPerSecondOvertime;
	this.priceInPointsToDeliver = priceInPointsToDeliver;
	this.parcelRestrictionGroupId = parcelRestrictionGroupId;
	this.capacityInParcels = capacityInParcels;
}
