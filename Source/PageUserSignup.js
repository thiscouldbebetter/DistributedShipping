
function PageUserSignup(world)
{
	this.world = world;

	this.passwordLengthMin = 8;
}
{
	PageUserSignup.prototype.signUp = function(inputUsername, inputPassword, inputPasswordConfirm)
	{
		var username = inputUsername.value;
		var password = inputPassword.value;
		var passwordConfirm = inputPasswordConfirm.value;

		if (password != passwordConfirm)
		{
			alert("The passwords entered do not match.");
			inputPassword.value = "";
			inputPasswordConfirm.value = "";
		}
		else if (password.length < passwordLengthMin)
		{
			alert("Passwords must be at least " + this.passwordLengthMin + " characters long.");
			inputPassword.value = "";
			inputPasswordConfirm.value = "";
		}
		else if (this.world.users[username] != null)
		{
			alert("A user with the username '" + username + "' already exists.");
		}
		else
		{
			var userNew = new User
			(
				"todo", // id
				username,
				password,
				0, // points
				false, // isAdmin
				[] // providers
			);
			this.world.users.push(userNew);
			this.world.users[username] = userNew;

			var pageNext = new PageUser(this.world, userNew);
			DomHelper.Instance().pageShow(pageNext);
		}
	};

	PageUserSignup.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();

		var inputUsername = dh.input
		(
			"inputUsername",
			new DataBinding(this, (c) => c.username, (c, v) => c.username = v),
			96 // width
		);
		var inputPassword = dh.inputPassword
		(
			"inputPassword",
			new DataBinding(this, (c) => c.password, (c, v) => c.password = v),
			96 // width
		);
		var inputPasswordConfirm = dh.inputPassword
		(
			"inputPasswordConfirm",
			new DataBinding(this, (c) => c.passwordConfirm, (c, v) => c.passwordConfirm = v),
			96 // width
		);

		var divPage = dh.div
		([
			dh.heading("User Signup"),

			dh.p
			(
				"Enter a username and the same password twice to create"
				+ " an account.  The username must not be the same as any"
				+ " already in use by an existing user, and the password"
				+ " must be at least " + this.passwordLengthMin + " characters"
				+ " long."
			),

			dh.label("Username:"),
			inputUsername,
			dh.br(),

			dh.label("Password:"),
			inputPassword,
			dh.br(),

			dh.label("Re-Type Password:"),
			inputPasswordConfirm,
			dh.br(),

			dh.button
			(
				"Sign Up",
				() => this.signUp(inputUsername, inputPassword, inputPasswordConfirm)
			)
		]);
		return divPage;
	};
}
