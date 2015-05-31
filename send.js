module.exports = (function() {
	"use strict";

	var self = {};

	self.enviar = function(mensagem) {
		var amqp = require("amqplib");
		var when = require("when");

		amqp.connect("amqp://192.168.100.111").then(function(conn) {
			return when(conn.createChannel().then(function(ch) {
				var q = "lances";
				var msg = mensagem;

				var ok = ch.assertQueue(q, {
					durable: false
				});

				return ok.then(function(_qok) {
					ch.sendToQueue(q, new Buffer(msg));
					console.log(" [x] Sent '%s'", msg);
					return ch.close();
				});
			})).ensure(function() {
				conn.close();
			});

		}).then(null, console.warn);
	};

	return self;
}());