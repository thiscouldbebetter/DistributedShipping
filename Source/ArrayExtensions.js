
// extensions

function ArrayExtensions()
{
	// Extension class.
}

{
	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var key = element[keyName];
			if (isNaN(key) == false)
			{
				key = "_" + key;
			}
			this[key] = element;
		}
		return this;
	};

	Array.prototype.addLookupsByCode = function()
	{
		return this.addLookups("code");
	};

	Array.prototype.addLookupsByName = function()
	{
		return this.addLookups("name");
	};

	Array.prototype.random = function()
	{
		return this[Math.floor(Math.random() * this.length)]; 
	};
}
