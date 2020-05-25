
function Transaction(time, parcelId, userFrom, userTo, statusId)
{
	this.time = time;
	this.parcelId = parcelId;
	this.userFrom = userFrom;
	this.userTo = userTo;
	this.statusId = statusId;
}

{
	Transaction.prototype.toString = function()
	{
		var returnValue = 
			this.time.toString() + ": "
			+ " from " + this.userFrom.username +
			+ " to " + this.userTo.username;

		return returnValue;
	};
}
