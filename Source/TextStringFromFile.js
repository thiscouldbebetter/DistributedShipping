
function TextStringFromFile(sourcePath)
{
	this.sourcePath = sourcePath;
}
{
	TextStringFromFile.prototype.load = function(callback)
	{
		var text = this;

		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.open("GET", this.sourcePath);
		xmlHttpRequest.onreadystatechange = function(event)
		{
			if (xmlHttpRequest.readyState === XMLHttpRequest.DONE)
			{
				var text = xmlHttpRequest.responseText;
				callback(text);
			}
		};
		xmlHttpRequest.send();
	};
}
