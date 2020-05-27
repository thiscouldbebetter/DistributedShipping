
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
			dh.heading("Administrator Mode"),
			dh.button
			(
				"View System Map",
				() => dh.pageShow( new PageMap(this.world, this.user) )
			),
			dh.button
			(
				"Back to User Details",
				() => dh.pageShow( new PageUser(this.world, this.user) )
			) 
		]);
		return divPage;
	}
}
