
// pages

function DomHelper()
{
	this.d = document;
}

{
	DomHelper.Instance = function()
	{
		if (DomHelper._instance == null)
		{
			DomHelper._instance = new DomHelper();
		}
		return DomHelper._instance;
	};

	DomHelper.prototype.br = function(click)
	{
		var returnValue = this.d.createElement("br");
		return returnValue;
	};

	DomHelper.prototype.button = function(text, click)
	{
		var returnValue = this.d.createElement("button");
		returnValue.innerHTML = text;
		returnValue.onclick = click;
		return returnValue;
	};

	DomHelper.prototype.canvas = function(size)
	{
		var returnValue = this.d.createElement("canvas");
		returnValue.width = size.x;
		returnValue.height = size.y;
		return returnValue;
	};

	DomHelper.prototype.div = function(children, hasBorder, id)
	{
		var returnValue = this.d.createElement("div");
		if (id != null)
		{
			returnValue.id = id;
		}
		for (var i = 0; i < children.length; i++)
		{
			var child = children[i];
			returnValue.appendChild(child);
		}
		if (hasBorder)
		{
			returnValue.style.border = "1px solid";
		}
		return returnValue;
	};

	DomHelper.prototype.divBordered = function(children)
	{
		return this.div(children, true);
	};

	DomHelper.prototype.get = function(id)
	{
		return this.d.getElementById(id);
	};

	DomHelper.prototype.graphicsContextForCanvas = function(canvas)
	{
		return canvas.getContext("2d");
	};

	DomHelper.prototype.heading = function(innerHtml)
	{
		var returnValue = this.d.createElement("h3");
		returnValue.innerHTML = innerHtml;
		return returnValue;
	};

	DomHelper.prototype.input = function(id, valueBinding, widthInPixels)
	{
		var returnValue = this.d.createElement("input");
		returnValue.id = id;
		returnValue.value = valueBinding.get();
		returnValue.onchange = () => valueBinding.set(returnValue.value);
		if (widthInPixels != null)
		{
			returnValue.style.width = widthInPixels + "px";
		}
		return returnValue;
	};

	DomHelper.prototype.inputCheckbox = function(id, valueBinding)
	{
		var returnValue = this.d.createElement("input");
		returnValue.id = id;
		returnValue.type = "checkbox";
		returnValue.checked = valueBinding.get();
		returnValue.onchange = () => valueBinding.set(returnValue.value);
		return returnValue;
	};

	DomHelper.prototype.inputNumber = function(id, valueBinding, widthInPixels)
	{
		var returnValue = this.d.createElement("input");
		returnValue.id = id;
		returnValue.type = "number";
		returnValue.value = valueBinding.get();
		returnValue.onchange = () =>
		{
			valueBinding.set(returnValue.value);
		};
		if (widthInPixels != null)
		{
			returnValue.style.width = widthInPixels + "px";
		}
		return returnValue;
	};

	DomHelper.prototype.inputPassword = function(id, valueBinding)
	{
		var returnValue = this.d.createElement("input");
		returnValue.id = id;
		returnValue.type = "password";
		returnValue.value = valueBinding.get();
		returnValue.onchange = () => valueBinding.set(returnValue.value);
		returnValue.style.width = "96px";
		return returnValue;
	};

	DomHelper.prototype.inputReadonly = function(id, value, widthInPixels)
	{
		var returnValue = this.d.createElement("input");
		returnValue.id = id;
		returnValue.value = value;
		returnValue.disabled = true;
		if (widthInPixels != null)
		{
			returnValue.style.width = widthInPixels + "px";
		}
		return returnValue;
	};

	DomHelper.prototype.label = function(innerHtml)
	{
		var returnValue = this.d.createElement("label");
		returnValue.innerHTML = innerHtml;
		return returnValue;
	};

	DomHelper.prototype.p = function(innerHtml)
	{
		var returnValue = this.d.createElement("p");
		returnValue.innerHTML = innerHtml;
		return returnValue;
	};

	DomHelper.prototype.pageShow = function(pageToShow)
	{
		var divUi = this.d.getElementById("divUi");
		divUi.innerHTML = "";
		var pageToShowAsDomElement = pageToShow.toDomElement();
		divUi.appendChild(pageToShowAsDomElement);
	};

	DomHelper.prototype.select = function(id, items, itemToDomElement, valueBinding, widthInPixels)
	{
		var returnValue = this.d.createElement("select");
		returnValue.id = id;
		var itemsAsDomElements = items.map( (x) => itemToDomElement(x) );
		itemsAsDomElements.forEach( (x) => returnValue.appendChild(x) );
		returnValue.selectedValue = valueBinding.get();
		returnValue.onchange = () => valueBinding.set(returnValue.selectedValue);
		if (widthInPixels != null)
		{
			returnValue.style.width = widthInPixels + "px";
		}
		return returnValue;
	};

	DomHelper.prototype.selectList = function(id, items, itemToDomElement, valueBinding, itemsToShow)
	{
		var returnValue = this.d.createElement("select");
		returnValue.id = id;
		var itemsAsDomElements = items.map( (x) => itemToDomElement(x) );
		itemsAsDomElements.forEach( (x) => returnValue.appendChild(x) );
		returnValue.selectedValue = valueBinding.get();
		returnValue.onchange = () => valueBinding.set(returnValue.selectedValue);
		returnValue.size = itemsToShow;
		return returnValue;
	};

	DomHelper.prototype.selectOption = function(value, text)
	{
		var returnValue = this.d.createElement("option");
		returnValue.value = value;
		returnValue.innerHTML = text;
		return returnValue;
	};
}
