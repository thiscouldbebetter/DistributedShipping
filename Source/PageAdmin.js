
function PageAdmin()
{}
{
	PageAdmin.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Admin")
		]);
		return divPage;
	}	
}
