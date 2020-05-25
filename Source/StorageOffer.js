
function StorageOffer
(
	capacityInParcels,
	priceInPointsToAcceptParcel,
	secondsStoredUntilOvertime,
	priceInPointsPerSecondOvertime,
	durationInSecondsOfOvertimeBeforeDiscard,
	parcelRestrictionGroupId
)
{
	this.capacityInParcels = capacityInParcels;
	this.priceInPointsToAcceptParcel = priceInPointsToAcceptParcel;
	this.secondsStoredUntilOvertime = secondsStoredUntilOvertime;
	this.priceInPointsPerSecondOvertime = priceInPointsPerSecondOvertime;
	this.durationInSecondsOfOvertimeBeforeDiscard = durationInSecondsOfOvertimeBeforeDiscard;
	this.parcelRestrictionGroupId = parcelRestrictionGroupId;
}
