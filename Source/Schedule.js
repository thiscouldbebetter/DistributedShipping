
function Schedule(code, startTime, offsetsAvailable, recurrencePeriodInSeconds)
{
	this.code = code;
	this.startTime = startTime;
	this.offsetsAvailable = offsetsAvailable;
	this.recurrencePeriodInSeconds = recurrencePeriodInSeconds;
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
		var secondsPerShift = 8 * 60 * 60;
		var secondsPerDay = 24 * 60 * 60;
		var secondsPerWeek = 7 * secondsPerDay;

		this.Weekdays9To5 = new Schedule
		(
			"Weekdays9To5",
			new Date(0), // startTime - todo - Make it a Monday.
			[
				new SchedulePeriod(0, secondsPerShift),
				new SchedulePeriod(secondsPerDay, secondsPerShift),
				new SchedulePeriod(secondsPerDay, secondsPerShift),
				new SchedulePeriod(secondsPerDay, secondsPerShift),
				new SchedulePeriod(secondsPerDay, secondsPerShift),
			],
			secondsPerWeek // recurrencePeriodInSeconds
		);

		this._All =
		[
			this.Weekdays9To5,
		].addLookupsByCode();
	}
}
