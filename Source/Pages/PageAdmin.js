
function PageAdmin(world, user)
{
	this.world = world;
	this.user = user;
}
{
	PageAdmin.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Admin"),
			dh.button
			(
				"View System Map",
				() => dh.pageShow( new PageMap(this.world, this.user) )
			)
		]);
		return divPage;
	}
}
