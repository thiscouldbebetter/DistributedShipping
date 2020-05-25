
function Country(code, name, provinces)
{
	this.code = code;
	this.name = name;
	this.provinces = provinces.addLookupsByCode();
}
