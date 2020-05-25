
function Parcel(id, addressFrom, addressTo, packageTypeCode, massInGrams, dimensions, attributes)
{
	this.id = id;
	this.addressFrom = addressFrom || new Address();
	this.addressTo = addressTo || new Address();
	this.packageTypeCode = packageTypeCode || PackageType.Instances().Box.code;
	this.massInGrams = massInGrams || 1000;
	this.dimensions = dimensions || new DimensionsBox();
	this.attributes = attributes || [];
}

{
	Parcel.prototype.toDomElement = function(world, user)
	{
		var dh = DomHelper.Instance();
		var returnValue = dh.divBordered
		([
			dh.label("From Address:"),
			this.addressFrom.toDomElement(world, user),
			dh.br(),

			dh.label("To Address:"),
			this.addressTo.toDomElement(world, user),
			dh.br(),

			dh.label("Package:"),
			dh.divBordered
			([
				dh.label("Type:"),
				dh.select
				(
					"selectPackageTypeCode",
					world.packageTypes,
					(x) => dh.selectOption(x.code, x.name),
					new DataBinding
					(
						this,
						(c) => c.packageTypeCode,
						(c, v) => c.packageTypeCode = v
					),
					64
				),
				dh.br(),

				dh.label("Mass in Grams:"),
				dh.inputNumber
				(
					"inputMassInGrams",
					new DataBinding
					(
						this,
						(c) => c.massInGrams,
						(c, v) => c.massInGrams = v
					),
					64
				),
				dh.br(),

				this.dimensions.toDomElement(),
				dh.br(),
			]),

		]);
		return returnValue;
	};
}
