var request = require('request');
var rp = require('request-promise-any');


var hasWarning = function(body) {
	return (body.Messages && body.Messages.Warning);
};

var hasError = function(body) {
	return (body.Messages && body.Messages.Error);
};

var success = function(body) {
	return body.Ack && body.Ack === 'Success';
}

var Neto = function(options) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
	this.uri = proxy + options.uri.replace(/\/$/, "") + '/do/WS/NetoAPI';
	this.api_key = options.api_key;
    // console.log(this.api_key);
};

Neto.prototype._headers = function(action) {
	return {
		'Accept': 'application/json',
		'NETOAPI_KEY': this.api_key,
		'NETOAPI_ACTION': action
	};
}

Neto.prototype._buildOptions = function(action, body) {
	return {
		uri: this.uri,
		json: true,
		headers: this._headers(action),
		body: body
	};
}

Neto.prototype._post = function(action, data, callback) {
	var options = this._buildOptions(action, data);
	
	return request.post(
		options,
		function(err, response, body) {
			if(!err && !success(body) && hasError(body))
				err = body.Messages.Error;

			return callback(err, body);
		});
		
	// rp(options)
	// 	.then(function (rep) {
	// 		return rep;
	// 	})
	// 	.catch(function (err) {
	// 		console.log(err);
	// 	});
}

// Orders

Neto.prototype.getOrder = function(filter, callback) {
	this._post('GetOrder', filter, callback);
}

Neto.prototype.addOrder = function(order, callback) {
	this._post('AddOrder', order, callback);
}

Neto.prototype.updateOrder = function(order, callback) {
	this._post('UpdateOrder', order, callback);
}

// Payments

Neto.prototype.getPayment = function(filter, callback) {
	this._post('GetPayment', filter, callback);
}

Neto.prototype.addPayment = function(payment, callback) {
	this._post('AddPayment', payment, callback);
}

// Items / Products

Neto.prototype.getItem = function(filter, callback) {
	this._post('GetItem', filter, callback);
}

Neto.prototype.addItem = function(item, callback) {
	this._post('AddItem', item, callback);
}

Neto.prototype.updateItem = function(item, callback) {
	this._post('UpdateItem', item, callback);
}

// Categories

Neto.prototype.getCategory = function(filter, callback) {
	this._post('GetCategory', filter, callback);
}

Neto.prototype.addCategory = function(category, callback) {
	this._post('AddCategory', category, callback);
}

Neto.prototype.updateCategory = function(category, callback) {
	this._post('UpdateCategory', category, callback);
}

// Customers

Neto.prototype.getCustomer = function(filter, callback) {
	this._post('GetCustomer', filter, callback);
}

Neto.prototype.addCustomer = function(customer, callback) {
	this._post('AddCustomer', customer, callback);
}

Neto.prototype.updateCustomer = function(customer, callback) {
	this._post('UpdateCustomer', customer, callback);
}

// Warehouses

Neto.prototype.getWarehouse = function(filter, callback) {
	this._post('GetWarehouse', filter, callback);
}

Neto.prototype.addWarehouse = function(warehouse, callback) {
	this._post('AddWarehouse', warehouse, callback);
}

Neto.prototype.updateWarehouse = function(warehouse, callback) {
	this._post('UpdateWarehouse', warehouse, callback);
}

// Content

Neto.prototype.getContent = function(filter, callback) {
	this._post('GetContent', filter, callback);
}

Neto.prototype.addContent = function(content, callback) {
	this._post('AddContent', content, callback);
}

Neto.prototype.updateContent = function(content, callback) {
	this._post('UpdateContent', content, callback);
}

module.exports = Neto;