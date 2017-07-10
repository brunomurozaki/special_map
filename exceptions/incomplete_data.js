/*
	Erro lançado caso os dados de insercao de territorio sejam invalidos
*/

module.exports = function IncompleteData(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message + " - " + new Date();
  this.extra = extra;
};

require('util').inherits(module.exports, Error);