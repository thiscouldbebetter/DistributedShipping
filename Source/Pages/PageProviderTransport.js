
function PageProviderTransport(world, user, provider)
{
	this.world = world;
	this.user = user;
	this.provider = provider;

	this.offerSelectedId = null;
}

{
	PageProviderTransport.prototype.offerSelected = function()
	{
		return this.provider.offers.filter(x => x.id == this.offerSelectedId)[0];
	};

	PageProviderTransport.prototype.offerSelectedDelete = function()
	{
		var offers = this.provider.offers;
		var offerSelected = this.offerSelected();
		if (offerSelected != null)
		{
			offers.splice(offers.indexOf(offerSelected), 1);
		}
	};

	PageProviderTransport.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();

		var divPage = dh.div
		([
			dh.heading("Transport Offered by User '" + this.user.username + "'"),

			dh.label("Offerings:"),
			dh.br(),
			dh.selectList
			(
				"selectOffers",
				this.provider.offers,
				x => dh.selectOption( x.id, x.toString() ),
				new DataBinding
				(
					this,
					(c) => c.offerSelectedId,
					(c, v) => c.offerSelectedId = v
				),
				10 // itemsToShow
			),
			dh.br(),
			dh.button
			(
				"Add",
				() =>
				{
					dh.pageShow
					(
						new PageProviderTransportOffer
						(
							this.world, this.user, this.provider, new TransportOffer()
						)
					);
				}
			),
			dh.button
			(
				"Edit",
				() =>
				{
					dh.pageShow
					(
						new PageProviderTransportOffer
						(
							this.world, this.user, this.provider, this.offerSelected()
						)
					);
				}
			),
			dh.button
			(
				"Delete",
				() => this.offerSelectedDelete()
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
