
function Province(code, name, zones)
{
	this.code = code;
	this.name = name;
	this.zones = (zones || []).addLookupsByCode();
}
