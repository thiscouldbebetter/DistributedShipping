
function PageProviderTransport(world, user, provider)
{
	this.world = world;
	this.user = user;
	this.provider = provider;
}

{
	PageProviderTransport.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();

		var divPage = dh.div
		([
			dh.heading("Transport Offered by User '" + this.user.username + "'"),

			dh.label("Offerings:"),
			dh.select
			(
				"selectOffers",
				this.offers,
				(x) => dh.selectOption( x.toString(), x.toString() ),
				new DataBinding(this, (c) => c.offerId, (c, v) => c.offerId = v)
			),
			dh.button
			(
				"Details",
				() => dh.pageShow( new PageProviderTransportOffer(this.world, this.user, this.provider, "todo") )
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
