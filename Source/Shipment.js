
function Shipment(id, parcel, transactions)
{
	this.id = id;
	this.parcel = parcel;
	this.transactions = transactions;
}

{
	Shipment.prototype.toString = function()
	{
		return this.transactions.map( (x) => x.toString() ).join("\n");
	};
}
