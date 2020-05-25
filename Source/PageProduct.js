
function PageProduct(world, user, product)
{
	this.world = world;
	this.user = user;
	this.product = product;
}

{
	PageProduct.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Product Details"),

			dh.button
			(
				"Back",
				() => dh.pageShow( new PageUser(this.world, this.user) )
			)
		]);
		return divPage;
	};
}
