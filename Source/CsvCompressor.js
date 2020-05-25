function CsvCompressor()
{
	// Do nothing.
}
{
	CsvCompressor.Blank = "";
	CsvCompressor.Comma = ",";
	CsvCompressor.CommentIndicator = "//";
	CsvCompressor.Newline = "\n";

	CsvCompressor.prototype.compress = function(dataToCompress)
	{
		var blank = CsvCompressor.Blank;
		var comma = CsvCompressor.Comma;
		var newline = CsvCompressor.Newline;

		var linesToCompress = dataToCompress.split(newline);
		var valuesToCompressPrev = [];
		var linesCompressed = [];
		for (var i = 0; i < linesToCompress.length; i++)
		{
			var lineToCompress = linesToCompress[i];

			var startingIndexOfComment = lineToCompress.indexOf
			(
				CsvCompressor.CommentIndicator
			);
			var comment = "";
			if (startingIndexOfComment > 0)
			{
				comment = lineToCompress.substr(startingIndexOfComment);
				lineToCompress = lineToCompress.substr(0, startingIndexOfComment);
			}

			var valuesToCompress = lineToCompress.split(comma);
			var valuesCompressed = [];

			for (var v = 0; v < valuesToCompress.length; v++)
			{
				var valueToCompress = valuesToCompress[v];
				var valueToCompressPrev = valuesToCompressPrev[v];
				var isValueSameAsPrev = (valueToCompress == valueToCompressPrev);
				var valueCompressed = (isValueSameAsPrev ? blank : valueToCompress);
				if (isValueSameAsPrev == false)
				{
					valuesToCompressPrev[v] = valueToCompress;
				}
				valuesCompressed.push(valueCompressed);
			}

			var lineCompressed = valuesCompressed.join(comma);
			lineCompressed += comment;
			linesCompressed.push(lineCompressed);
		}
		var dataCompressed = linesCompressed.join(newline);
		return dataCompressed;
	};

	CsvCompressor.prototype.decompress = function(dataToDecompress)
	{
		var blank = CsvCompressor.Blank;
		var comma = CsvCompressor.Comma;
		var newline = CsvCompressor.Newline;

		var linesToDecompress = dataToDecompress.split(newline);
		var valuesToDecompressPrev = [];
		var linesDecompressed = [];

		for (var i = 0; i < linesToDecompress.length; i++)
		{
			var lineToDecompress = linesToDecompress[i];

			var startingIndexOfComment = lineToDecompress.indexOf
			(
				CsvCompressor.CommentIndicator
			);
			var comment = "";
			if (startingIndexOfComment > 0)
			{
				comment = lineToDecompress.substr(startingIndexOfComment);
				lineToDecompress = lineToDecompress.substr(0, startingIndexOfComment);
			}

			if (lineToDecompress != "")
			{
				var valuesToDecompress = lineToDecompress.split(comma);
				var valuesDecompressed = [];

				for (var v = 0; v < valuesToDecompress.length; v++)
				{
					var valueToDecompress = valuesToDecompress[v];
					var valueToDecompressPrev = valuesToDecompressPrev[v];
					var isValueBlank = (valueToDecompress == blank);
					var valueDecompressed =
						(isValueBlank ? valueToDecompressPrev : valueToDecompress);
					if (isValueBlank == false)
					{
						valuesToDecompressPrev[v] = valueToDecompress;
					}
					valuesDecompressed.push(valueDecompressed);
				}

				var lineDecompressed = valuesDecompressed.join(comma);
				linesDecompressed.push(lineDecompressed);
			}
		}

		var dataDecompressed = linesDecompressed.join(newline);

		return dataDecompressed;
	};
}
