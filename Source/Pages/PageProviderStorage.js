
function PageProviderStorage(world, user, provider)
{
	this.world = world;
	this.user = user;
	this.provider = provider;
}

{
	PageProviderStorage.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();

		var divPage = dh.div
		([
			dh.heading("Storage Offered by User '" + this.user.username + "'"),

			dh.label("Offerings:"),
			dh.br(),
			dh.selectList
			(
				"selectOffer",
				this.provider.offers,
				(x) => dh.selectOption( x.id, x.toString() ),
				new DataBinding
				(
					this, (c) => c.offerSelectedId, (c, v) => c.offerSelectedId = v
				),
				10  // itemsToShow
			),
			dh.br(),
			dh.button
			(
				"Details",
				() => dh.pageShow( new PageProviderStorageOffer(this.world, this.user, this.provider, "todo") )
			),
			dh.br(),

			dh.button
			(
				"Back to User Details",
				() => dh.pageShow( new PageUser(this.world, this.user) )
			) 
		]);
		return divPage;
	};
}
