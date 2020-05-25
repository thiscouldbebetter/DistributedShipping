
function StringExtensions()
{
	// Extension method.
}

{
	String.prototype.uppercaseFirstCharacter = function()
	{
		return this.substr(0, 1).toUpperCase() + this.substr(1);
	};
}
