
function PageUserLogin(world)
{
	this.world = world;

	this.username = "";
	this.password = "";
}

{
	PageUserLogin.prototype.logIn = function(inputUsername, inputPassword)
	{
		var username = inputUsername.value;
		var password = inputPassword.value;

		var user = this.world.users[username];
		var messageInvalid = "Invalid username or password.";
		if (user == null || password != user.passwordHashed)
		{
			inputPassword.value = "";
			alert(messageInvalid);
		}
		else
		{
			var pageNext = new PageUser(this.world, user);
			DomHelper.Instance().pageShow(pageNext);
		}
	};

	PageUserLogin.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();

		var divPage = dh.div
		([
			dh.heading("User Login"),
			
			dh.p
			(
				"Enter a username and password to access the system."
				+ "  If you do not yet have an account, click the Back"
				+ " button to return to the previous page and then click"
				+ " the Sign Up button."
			),

			dh.label("Username:"),
			dh.input
			(
				"inputUsername",
				new DataBinding(this, (c) => c.username, (c, v) => c.username = v),
				96 // width
			),
			dh.br(),

			dh.label("Password:"),
			dh.inputPassword
			(
				"inputPassword",
				new DataBinding(this, (c) => c.password, (c, v) => c.password = v),
				96 // width
			),
			dh.br(),

			dh.button
			(
				"Log In",
				() => this.logIn(dh.get("inputUsername"), dh.get("inputPassword"))
			),

			dh.button
			(
				"Back",
				() => dh.pageShow( new PageHome(this.world) )
			)
		]);
		return divPage;
	};
}
