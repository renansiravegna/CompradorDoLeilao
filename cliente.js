module.exports = (function() {
	"use strict";

	var self = {},
		_minhaGrana = 100;

	self.incrementarLance = function(ultimoLance) {
		var send = require("./send");

		if (ultimoLance < _minhaGrana)
			send.enviar("Renan " + (ultimoLance + 10));
	};

	self.feedback = function(mensagem) {
		var send = require("./send");

		if (mensagem.indexOf("ENCERROU") > -1) return;

		var pessoa = mensagem.split(" ")[0];
		var valor = parseFloat(mensagem.split(" ")[1]);

		if (pessoa === "Renan")
			send.enviar("Sandro " + (valor + 10));

		if (pessoa === "Sandro")
			send.enviar("Renan " + (valor + 10));
	};

	return self;
}());