
function PageUser(world, user)
{
	this.world = world;
	this.user = user;
}

{
	PageUser.prototype.toDomElement = function()
	{
		var user = this.user;
		var userProvidesCurrencyExchange = user.providesCurrencyExchange();
		var userProvidesProduct = user.providesProduct();
		var userProvidesStorage = user.providesStorage();
		var userProvidesTransport = user.providesTransport();

		var dh = DomHelper.Instance();
		var controls =
		[
			dh.heading("User Details"),

			dh.p
			(
				"Any user may offer products for shipping, or services to"
				+ " transport or store parcels in transit.  Some users"
				+ " may also offer exchange of 'shipping points' for "
				+ " other currencies.  Alternatively, most users may "
				+ " simply want to arrange shipping through existing providers."
			),

			dh.label("Username:"),
			dh.inputReadonly("inputUsername", this.user.username, 96),
			dh.br(),

			dh.button
			(
				"Arrange a Shipment",
				() => dh.pageShow( new PageShipmentPlanSearch(this.world, this.user) )
			),
			dh.br(),

			dh.label("Provides:"),
			dh.br(),

			dh.label("Currency Exchange:"),
			dh.label(userProvidesCurrencyExchange > 0 ? "Yes" : "No" ),
			dh.button
			(
				"Details",
				() => dh.pageShow( new PageProviderCurrencyExchange(this.world, this.user) )
			),
			dh.br(),

			dh.label("Products:"),
			dh.label(userProvidesProduct > 0 ? "Yes" : "No" ),
			dh.button
			(
				"Details",
				() => dh.pageShow( new PageProviderProduct(this.world, this.user) )
			),
			dh.br(),

			dh.label("Storage:"),
			dh.label(userProvidesStorage > 0 ? "Yes" : "No" ),
			dh.button
			(
				"Details",
				() => dh.pageShow( new PageProviderStorage(this.world, this.user, user.providerStorage() ) )
			),
			dh.br(),

			dh.label("Transport:"),
			dh.label(userProvidesTransport > 0 ? "Yes" : "No" ),
			dh.button
			(
				"Details",
				() => dh.pageShow( new PageProviderTransport(this.world, this.user, user.providerTransport() ) )
			),
			dh.br(),

			dh.button("Log Out", () => dh.pageShow( new PageHome(this.world) ) )
		];

		if (this.user.isAdmin)
		{
			controls.push(dh.br());
			controls.push
			(
				dh.button
				(
					"Administrator Mode",
					() => dh.pageShow( new PageAdmin(this.world, this.user) )
				)
			)
		}

		var divPage = dh.div(controls);
		return divPage;
	};
}
