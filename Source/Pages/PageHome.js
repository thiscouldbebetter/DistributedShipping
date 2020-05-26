
function PageHome(world)
{
	this.world = world;
}

{
	PageHome.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var divPage = dh.div
		([
			dh.heading("Distributed Shipping System"),

			dh.p
			(
				"This site allows its users to offer each other shipping"
				+ " services in exchange for points, which can in turn be"
				+ " exchanged for currency.  Click the Sign Up button to"
				+ " create a new account, or Log In to access an existing"
				+ " account."
			),

			dh.button
			(
				"Sign Up",
				() => dh.pageShow(new PageUserSignup(this.world))
			),
			dh.button
			(
				"Log In",
				() => dh.pageShow(new PageUserLogin(this.world))
			),
		]);
		return divPage;
	};
}
