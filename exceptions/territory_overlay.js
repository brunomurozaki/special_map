/*
	Erro lançado caso haja um overlay sobre algum territorio anterior
*/

module.exports = function TerritoryOverlay(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message + " - " + new Date();
  this.extra = extra;
};

require('util').inherits(module.exports, Error);