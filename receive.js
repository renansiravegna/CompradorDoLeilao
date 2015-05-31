module.exports = (function() {
    var self = {};

    self.escutar = function() {
        var amqp = require("amqplib");
        var queue = "lance_maximo_do_momento";

        amqp.connect("amqp://172.20.10.2").then(function(conn) {
            process.once("SIGINT", function() {
                conn.close();
            });

            return conn.createChannel().then(function(ch) {
                var ok = ch.assertQueue(queue, {
                    durable: false
                });

                ok = ok.then(function(_qok) {
                    return ch.consume(queue, function(msg) {
                        var retorno = msg.content.toString();
                        console.log(retorno);

                        var cliente = require("./cliente");

                        cliente.feedback(retorno);
                    }, {
                        noAck: true,
                        consumerTag: "feedback_leilao"
                    });
                });

                return ok.then(function(_consumeOk) {
                    console.log(" [*] Waiting for messages. To exit press CTRL+C");
                });
            });
        }).then(null, console.warn);
    };

    return self;
}());