
function Randomizer()
{
	this.soundsConsonantsAndClustersInitial =
		"b,bl,br,c,ch,cl,cr,d,dr,f,fl,g,gl,gr,h,j,k,l,m,n,p,pl,pr,ph,qu,r,s,sh,st,t,th,tr,v,w,y".split(",");
	this.soundsConsonantsAndClustersFinal =
		"b,ch,d,f,g,h,j,k,l,m,mp,n,nd,ng,p,pr,ph,r,rb,rd,rf,rg,rk,rv,s,sh,st,t,th,tr,v,w,x,y".split(",");
	this.soundsVowelsAndDipthongs = "a,ai,e,ee,ei,i,ie,o,oo,u".split(",");
	this.syllablePatterns = ["iv", "ivf", "vf"];
}

{
	Randomizer.Instance = function()
	{
		if (Randomizer._instance == null)
		{
			Randomizer._instance = new Randomizer();
		}
		return Randomizer._instance;
	};

	Randomizer.prototype.randomIntegerBetween = function(min, max)
	{
		return min + Math.floor(Math.random() * (max - min));
	};

	Randomizer.prototype.randomSyllable = function()
	{
		var returnValue = "";
		var pattern = this.syllablePatterns.random();
		for (var i = 0; i < pattern.length; i++)
		{
			var soundTypeCode = pattern[i];
			var soundGroup;
			if (soundTypeCode == "i") // "initial"
			{
				soundGroup = this.soundsConsonantsAndClustersInitial;
			}
			else if (soundTypeCode == "v") // "vowel"
			{
				soundGroup = this.soundsVowelsAndDipthongs;
			}
			else if (soundTypeCode == "f") // "final"
			{
				soundGroup = this.soundsConsonantsAndClustersFinal;
			}
			else
			{
				throw "Sound type code not recognized: " + soundTypeCode;
			}
			var sound = soundGroup.random();
			returnValue += sound;
		}
		return returnValue;
	};
	
	Randomizer.prototype.randomSyllables = function(min, max)
	{
		var returnValue = "";
		var syllableCount = min + Math.floor(Math.random() * (max - min));
		for (var i = 0; i < syllableCount; i++)
		{
			var syllable = this.randomSyllable();
			returnValue += syllable;
		}
		return returnValue;
	};
}
