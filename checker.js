var default_opt = {
	option_prefix: "_opt_",
	seperator: "."
};

exports = module.exports = function(opt) {
	return new Checker(opt);
}

function Checker(opt) {
	this.opt = copyOption(opt);

	// temp var 
	this.cmpList = [];

	// result to return
	this.result = {
		errMsg: null,
		json: null
	}
}

function copyOption(opt) {
	var option = {};
	for (var name in default_opt) {
		option[name] = default_opt[name];
	}
	if (opt) {
		for (var name in opt) {
			option[name] = opt[name];
		}
	}
	// console.log("opt=",opt);
	return option;
}

Checker.prototype.check = function(template, target) {
	var self = this;
	self.result.errMsg = null;
	self.result.json = null;

	// prepare to check
	if (typeof target === 'string') {
		try {
			self.result.json = JSON.parse(target);
		} catch (err) {
			self.result.errMsg = 'target is not a valid json';
			return self.result;
		}
	} else {
		self.result.json = target;
	}

	var aNode = self.createNode("", template, self.result.json);
	self.cmpList.push(aNode);

	//
	while (self.cmpList.length > 0 && !(self.result.errMsg)) {
		var aNode = self.cmpList.shift();
		self.checkNode(aNode);
	}

	return this.result;
}

// a node records two var to compare
Checker.prototype.createNode = function(prefix, template, target) {
	return {
		prefix: prefix,
		template: template,
		target: target
	}
}

Checker.prototype.checkNode = function(aNode) {
	var self = this;
	var prefix = aNode.prefix;
	var template = aNode.template;
	var target = aNode.target;

	// type dismatch , one is array but another not 
	if ((Array.isArray(template) !== Array.isArray(target)) || (typeof template !== typeof target)) {
		self.result.errMsg = prefix + " type dismatch: Array vs not Array";
		return;
	}

	// both array
	if (Array.isArray(template) && Array.isArray(target)) {
		self.cmpJsonArr(prefix, template, target);
		return;
	}

	// both plain json
	self.cmpJsonObj(prefix, template, target);
}

Checker.prototype.getNewPrefix = function(pre, key) {
	var ret = key;
	if (pre) {
		if (pre.indexOf("[") === pre.length - 1) {
			ret = pre + key;
		} else {
			ret = pre + this.opt.seperator + key
		}
	}
	return ret;
}

Checker.prototype.cmpJsonArr = function(prefix, arrTemplate, arrTarget) {
	// we select the first item to compare
	var node = this.createNode(prefix + "[", arrTemplate[0], arrTarget[0]);
	this.cmpList.push(node);
}

Checker.prototype.cmpJsonObj = function(prefix, template, target) {
	var self = this;
	for (var key in template) {
		var vTemplate = template[key];
		var isOption = key.indexOf(self.opt.option_prefix) === 0;
		if (isOption) {
			key = key.substr(self.opt.option_prefix.length, key.length);
			// console.log('option, key=' + key);
		}

		var nextPrefix = self.getNewPrefix(prefix, key);
		var vTarget = target[key];


		if (!vTarget) { // not has the compulsory key
			if (!isOption) {
				self.result.errMsg = "no correspond key:" + nextPrefix;
				return;
			} else {
				// console.log("no option key:" + (prefix+key));
				continue;
			}
		}

		//
		if (typeof vTemplate !== typeof vTarget) {
			self.result.errMsg = "type dismatch at " + nextPrefix;
			return;
		}

		// regard same type
		if (typeof vTemplate !== "object") {
			// console.log("omit compare: not object or array:" + (typeof vTemplate)); //TODO
			continue;
		}

		// object
		if (Array.isArray(vTemplate) && Array.isArray(vTarget)) {
			// console.log("json has a array item");
			self.cmpJsonArr(nextPrefix, vTemplate, vTarget);
		} else {
			var node = self.createNode(nextPrefix, vTemplate, vTarget);
			self.cmpList.push(node);
		}
	}
}