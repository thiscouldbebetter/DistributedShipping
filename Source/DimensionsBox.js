

function DimensionsBox(x, y, z)
{
	this.x = x || 20;
	this.y = y || 15;
	this.z = z || 10;
}

{
	DimensionsBox.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();
		var widthInPixels = 64;
		var returnValue = dh.div
		([
			dh.label("Dimensions in Centimeters:"),
			dh.label("Length:"),
			dh.inputNumber
			(
				"inputX",
				new DataBinding(this, (c) => c.x, (c, v) => c.x = v ),
				widthInPixels
			),
			dh.label("Width:"),
			dh.inputNumber
			(
				"inputY",
				new DataBinding(this, (c) => c.y, (c, v) => c.y = v ),
				widthInPixels
			),
			dh.label("Height:"),
			dh.inputNumber
			(
				"inputZ",
				new DataBinding(this, (c) => c.z, (c, v) => c.z = v ),
				widthInPixels
			),
		]);

		return returnValue;
	};
}
