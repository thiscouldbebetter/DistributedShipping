
function Schedule(code, periodsAvailable)
{
	this.code = code;
	this.periodsAvailable = periodsAvailable;
}

{
	Schedule.Instances = function()
	{
		if (Schedule._instances == null)
		{
			Schedule._instances = new Schedule_Instances();
		}
		return Schedule._instances;
	};

	function Schedule_Instances()
	{
		var secondsPerMillenium = 1000 * 365.25 * 24 * 60 * 60;
		this.Default = new Schedule
		(
			"Default",
			[
				new SchedulePeriod(new Date(0), secondsPerMillenium)
			]
		);

		this._All =
		[
			this.Default,
		].addLookupsByCode();
	}
}
