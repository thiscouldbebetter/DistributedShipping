
function World(name, schedules, countries, currencies, packageTypes, restrictionGroups, users, parcels, transactions)
{
	this.name = name;
	this.schedules = schedules.addLookupsByCode();
	this.countries = countries.addLookupsByCode();
	this.currencies = currencies.addLookupsByCode();
	this.packageTypes = packageTypes.addLookupsByCode();
	this.restrictionGroups = restrictionGroups.addLookupsByCode();
	this.users = users.addLookups("username");
	this.parcels = parcels;
	this.transactions = transactions;
}
