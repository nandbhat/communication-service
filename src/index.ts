import { Hono } from 'hono'
import pkg from '../package.json'
import amqp from 'amqplib/callback_api'


const app = new Hono()

app.get('/', (c) => c.json({
    ok: true,
    message: 'Hello Hono!',
}))

app.get('/info', (c) => c.json({
    ok: true,
    name: pkg.name,
    version: pkg.version
}))


amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = 'Hello World!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});



amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            // @ts-ignore
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});

export default app
