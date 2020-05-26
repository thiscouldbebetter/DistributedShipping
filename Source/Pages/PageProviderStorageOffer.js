
function PageProviderStorageOffer(world, user, provider, offer)
{
	this.world = world;
	this.user = user;
	this.provider = provider;
	this.offer = offer;
}

{
	PageProviderStorageOffer.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();

		var divPage = dh.div
		([
			dh.heading("Storage Offering Details"),

			dh.button
			(
				"Back",
				() => dh.pageShow( new PageProviderStorage(this.world, this.user, this.provider) )
			)
		]);
		return divPage;
	};
}
