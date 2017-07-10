/*
	Erro lançado quando algum recurso nao foi encontrado
*/

module.exports = function NotFound(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message + " - " + new Date();
  this.extra = extra;
};

require('util').inherits(module.exports, Error);