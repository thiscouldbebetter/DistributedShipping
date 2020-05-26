
function PageMap(world, user)
{
	this.world = world;
	this.user = user;

	this.canvasSize = new Coords(600, 400);
}

{
	PageMap.prototype.draw = function(graphicsContext)
	{
		var g = graphicsContext;

		g.fillStyle = "White";
		g.fillRect(0, 0, this.canvasSize.x, this.canvasSize.y);
		g.strokeStyle = "Gray";
		g.strokeRect(0, 0, this.canvasSize.x, this.canvasSize.y);

		var country = this.world.countries[0]; // hack
		var provinces = country.provinces;
		var provincesToExclude = [ "AK", "HI", "MH" ];
		provinces = provinces.filter(x => provincesToExclude.indexOf(x.code) == -1);
		var zonesForProvinces = provinces.map(x => x.zones);
		var zones = [].concat.apply([], zonesForProvinces);

		var zoneGeodesics = zones.map((x) => x.geodesic);
		var zoneLatitudes = zoneGeodesics.map((x) => x.latitude);
		var zoneLongitudes = zoneGeodesics.map((x) => x.longitude);
		var zoneLatitudeMin = Math.min.apply(null, zoneLatitudes);
		var zoneLatitudeMax = Math.max.apply(null, zoneLatitudes);
		var zoneLongitudeMin = Math.min.apply(null, zoneLongitudes);
		var zoneLongitudeMax = Math.max.apply(null, zoneLongitudes);
		var zoneGeodesicMin = new Coords(zoneLongitudeMin, zoneLatitudeMin);
		var zoneGeodesicMax = new Coords(zoneLongitudeMax, zoneLatitudeMax);
		var zoneGeodesicRange = zoneGeodesicMax.clone().subtract(zoneGeodesicMin);
		var margin = .05;
		var margins = new Coords(margin, margin);
		var marginDoubledReversed = 1 - margin * 2;
		var canvasSizeMinusMargins = this.canvasSize.clone().multiply
		(
			new Coords(1, 1).multiplyScalar(marginDoubledReversed)
		);

		var zoneGeodesicsToDraw = zoneGeodesics.map
		(
			x =>
			{
				return new Coords().fromGeodesic(x).subtract
				(
					zoneGeodesicMin
				).divide
				(
					zoneGeodesicRange
				).yReverse().add
				(
					margins
				).multiply
				(
					canvasSizeMinusMargins
				);
			}
		);

		for (var i = 0; i < zoneGeodesicsToDraw.length; i++)
		{
			var drawPos = zoneGeodesicsToDraw[i];
			g.strokeRect(drawPos.x, drawPos.y, 1, 1);
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

			canvasMap,
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
