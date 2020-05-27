
function PageProviderProduct(world, user, provider)
{
	this.world = world;
	this.user = user;
	this.provider = provider;
}

{
	PageProviderProduct.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();

		var productsOffered = [ "todo" ];

		var divPage = dh.div
		([
			dh.heading("Products Offered by User '" + this.user.username + "'"),

			dh.label("Products Offered:"),
			dh.br(),
			dh.selectList
			(
				"selectProduct",
				productsOffered,
				(x) => dh.selectOption(x.name, x.name),
				new DataBinding(this, (c) => c.productId, (c) => c.productId = v),
				10 // itemsToShow
			),
			dh.br(),
			dh.button
			(
				"Details",
				() => dh.pageShow( new PageProduct(this.world, this.user, "todo" ) )
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
