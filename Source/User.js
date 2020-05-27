
function User(id, username, passwordHashed, pointsAccrued, isAdmin, address, providers)
{
	this.id = id;
	this.username = username;
	this.passwordHashed = passwordHashed;
	this.pointsAccrued = pointsAccrued;
	this.isAdmin = isAdmin;
	this.address = address;
	this.providers = providers;
}

{
	User.prototype.providerCurrencyExchange = function()
	{
		var returnValue = this.providers.filter( (x) => x.constructor.name == ProviderCurrencyExchange.name )[0];
		if (returnValue == null)
		{
			returnValue = new ProviderCurrencyExchange();
			this.providers.push(returnValue);
		}
		return returnValue;
	};

	User.prototype.providerProduct = function()
	{
		var returnValue = this.providers.filter( (x) => x.constructor.name == ProviderProduct.name )[0];
		if (returnValue == null)
		{
			returnValue = new ProviderProduct();
			this.providers.push(returnValue);
		}
		return returnValue;
	};

	User.prototype.providerStorage = function()
	{
		var returnValue = this.providers.filter( (x) => x.constructor.name == ProviderStorage.name )[0];
		if (returnValue == null)
		{
			returnValue = new ProviderStorage();
			this.providers.push(returnValue);
		}
		return returnValue;
	};

	User.prototype.providerTransport = function()
	{
		var returnValue = this.providers.filter( (x) => x.constructor.name == ProviderTransport.name )[0];
		if (returnValue == null)
		{
			returnValue = new ProviderTransport();
			this.providers.push(returnValue);
		}
		return returnValue;
	};

	User.prototype.providesCurrencyExchange = function()
	{
		return this.providers.some(x => x.constructor.name == ProviderCurrencyExchange.name );
	};

	User.prototype.providesProduct = function()
	{
		return this.providers.some(x => x.constructor.name == ProviderProduct.name );
	};

	User.prototype.providesStorage = function()
	{
		return this.providers.some(x => x.constructor.name == ProviderStorage.name );
	};

	User.prototype.providesTransport = function()
	{
		return this.providers.some(x => x.constructor.name == ProviderTransport.name );
	};
}
