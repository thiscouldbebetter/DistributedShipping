
function PageMap(world, user)
{
	this.world = world;
	this.user = user;

	this.canvasSize = new Coords(600, 600);

	var country = this.world.countries["US"]; // hack
	var provinces = country.provinces;
	var provincesToExclude = [ "AK", "HI", "MH" ]; // hack
	provinces = provinces.filter(x => provincesToExclude.indexOf(x.code) == -1);
	var zonesForProvinces = provinces.map(x => x.zones);
	this.zones = [].concat.apply([], zonesForProvinces);

	this.zoneGeodesics = this.zones.map((x) => x.geodesic);
	var zoneLatitudes = this.zoneGeodesics.map((x) => x.latitude);
	var zoneLongitudes = this.zoneGeodesics.map((x) => x.longitude);
	var zoneLatitudeMin = Math.min.apply(null, zoneLatitudes);
	var zoneLatitudeMax = Math.max.apply(null, zoneLatitudes);
	var zoneLongitudeMin = Math.min.apply(null, zoneLongitudes);
	var zoneLongitudeMax = Math.max.apply(null, zoneLongitudes);
	this.zoneGeodesicMin = new Coords(zoneLongitudeMin, zoneLatitudeMin);
	var zoneGeodesicMax = new Coords(zoneLongitudeMax, zoneLatitudeMax);
	this.viewSizeInDegrees = zoneGeodesicMax.clone().subtract(this.zoneGeodesicMin);

	this.viewCenterInDegrees = this.zoneGeodesicMin.clone().add
	(
		this.viewSizeInDegrees.clone().divideScalar(2)
	);

	if (this.viewSizeInDegrees.x > this.viewSizeInDegrees.y)
	{
		this.viewSizeInDegrees.y = this.viewSizeInDegrees.x;
	}
	else
	{
		this.viewSizeInDegrees.x = this.viewSizeInDegrees.y;
	}
	this.showZoneCodes = false;

	var marginAsFraction = .05;
	this.marginsAsFractions = new Coords(marginAsFraction, marginAsFraction);
	var marginAsFractionDoubledReversed = 1 - marginAsFraction * 2;
	this.canvasSizeMinusMargins = this.canvasSize.clone().multiply
	(
		new Coords(1, 1).multiplyScalar(marginAsFractionDoubledReversed)
	);
}

{
	PageMap.prototype.draw = function(graphicsContext)
	{
		var g = graphicsContext;

		g.fillStyle = "White";
		g.fillRect(0, 0, this.canvasSize.x, this.canvasSize.y);
		g.strokeStyle = "Gray";
		g.strokeRect(0, 0, this.canvasSize.x, this.canvasSize.y);

		var zoneGeodesicsToDraw = this.zoneGeodesics.map
		(
			x =>
			{
				return new Coords().fromGeodesic(x).subtract
				(
					this.viewCenterInDegrees
				).add
				(
					this.viewSizeInDegrees.clone().divideScalar(2)
				).divide
				(
					this.viewSizeInDegrees
				).yReverse().add
				(
					this.marginsAsFractions
				).multiply
				(
					this.canvasSizeMinusMargins
				);
			}
		);

		g.fillStyle = "Gray";
		for (var i = 0; i < this.zones.length; i++)
		{
			var zone = this.zones[i];

			var drawPos = zoneGeodesicsToDraw[i];

			g.strokeRect(drawPos.x, drawPos.y, 1, 1);
			if (this.showZoneCodes)
			{
				g.fillText(zone.code, drawPos.x, drawPos.y);
			}
		}

	};

	PageMap.prototype.toDomElement = function()
	{
		var dh = DomHelper.Instance();

		var canvasMap = dh.canvas(this.canvasSize);

		var g = dh.graphicsContextForCanvas(canvasMap);
		this.draw(g);

		var divPage = dh.div
		([
			dh.heading("System Map"),

			dh.label("View:"),

			dh.label("Size in Degrees:"),
			dh.label("Latitude:"),
			dh.inputNumber
			(
				"inputViewSizeInDegreesY",
				new DataBinding
				(
					this,
					(c) => c.viewSizeInDegrees.y,
					(c, v) => c.viewSizeInDegrees.y = v
				)
			), 
			dh.label("Longitude:"),
			dh.inputNumber
			(
				"inputViewSizeInDegreesX",
				new DataBinding
				(
					this,
					(c) => c.viewSizeInDegrees.x,
					(c, v) => c.viewSizeInDegrees.x = v
				)
			), 
			dh.br(),

			dh.label("Center in Degrees:"),
			dh.label("Latitude:"),
			dh.inputNumber
			(
				"inputViewCenterInDegreesY",
				new DataBinding
				(
					this,
					(c) => c.viewCenterInDegrees.y,
					(c, v) => c.viewCenterInDegrees.y = v
				)
			),
			dh.label("Longitude:"),
			dh.inputNumber
			(
				"inputViewCenterInDegreesX",
				new DataBinding
				(
					this,
					(c) => c.viewCenterInDegrees.x,
					(c, v) => c.viewCenterInDegrees.x = v
				)
			), 
			dh.br(),

			dh.button("&nbsp;", () => {}),
			dh.button
			(
				"^",
				() =>
				{
					var input = dh.get("inputViewCenterInDegreesY");
					input.value = parseFloat(input.value) + this.viewSizeInDegrees.y * .1;
					input.onchange();
					this.draw(g);
				}
			),
			dh.button
			(
				"Out",
				() =>
				{
					var inputX = dh.get("inputViewSizeInDegreesX");
					var inputY = dh.get("inputViewSizeInDegreesY");
					inputX.value = parseFloat(inputX.value) * 2;
					inputY.value = parseFloat(inputY.value) * 2;
					inputX.onchange();
					inputY.onchange();
					this.draw(g);
				}
			),
			dh.br(),

			dh.button
			(
				"<",
				() =>
				{
					var input = dh.get("inputViewCenterInDegreesX");
					input.value = parseFloat(input.value) - this.viewSizeInDegrees.x * .1;
					input.onchange();
					this.draw(g);
				}
			),
			dh.button("&nbsp;", () => {}),
			dh.button
			(
				">",
				() =>
				{
					var input = dh.get("inputViewCenterInDegreesX");
					input.value = parseFloat(input.value) + this.viewSizeInDegrees.x * .1;
					input.onchange();
					this.draw(g);
				}
			),
			dh.br(),

			dh.button("&nbsp;", () => {}),
			dh.button
			(
				"v",
				() =>
				{
					var input = dh.get("inputViewCenterInDegreesY");
					input.value = parseFloat(input.value) - this.viewSizeInDegrees.y * .1;
					input.onchange();
					this.draw(g);
				}
			),
			dh.button
			(
				"In",
				() =>
				{
					var inputX = dh.get("inputViewSizeInDegreesX");
					var inputY = dh.get("inputViewSizeInDegreesY");
					inputX.value = parseFloat(inputX.value) / 2;
					inputY.value = parseFloat(inputY.value) / 2;
					inputX.onchange();
					inputY.onchange();
					this.draw(g);
				}
			),
			dh.br(),

			dh.label("Show Zone Codes"),
			dh.inputCheckbox
			(
				"checkboxShowCodes",
				new DataBinding
				(
					this,
					(c) => c.showZoneCodes,
					(c, v) =>
					{
						c.showZoneCodes = v;
						c.draw(g);
					}
				)
			),

			dh.div
			(
				[ canvasMap ],
				false // hasBorder
			),
			dh.br(),

			dh.button
			(
				"Back to Admin Page",
				() => dh.pageShow(new PageAdmin(this.world, this.user))
			),
		]);
		return divPage;
	};
}
