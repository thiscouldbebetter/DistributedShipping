
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
		return this.providers.filter( (x) => x.constructor.name == CurrencyExchange.name )[0];
	};

	User.prototype.providerProduct = function()
	{
		return this.providers.filter( (x) => x.constructor.name == ProductProvider.name )[0];
	};

	User.prototype.providerStorage = function()
	{
		return this.providers.filter( (x) => x.constructor.name == StorageProvider.name )[0];
	};

	User.prototype.providerTransport = function()
	{
		return this.providers.filter( (x) => x.constructor.name == TransportProvider.name )[0];
	};

	User.prototype.providesCurrencyExchange = function()
	{
		return this.providerCurrencyExchange() != null;
	};

	User.prototype.providesProduct = function()
	{
		return this.providerProduct() != null;
	};

	User.prototype.providesStorage = function()
	{
		return this.providerStorage() != null;
	};

	User.prototype.providesTransport = function()
	{
		return this.providerTransport != null;
	};
}
