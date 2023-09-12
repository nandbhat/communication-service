import { Hono } from 'hono'
import pkg from '../package.json'
import amqp from 'amqplib'
import { prettyJSON } from 'hono/pretty-json'
import { logger } from 'hono/logger'


const app = new Hono()
const rabbitmqUrl = 'amqp://localhost';

app.use('*', logger())
app.use('*', prettyJSON())
app.get('/info', (c) => c.json({
    ok: true,
    name: pkg.name,
    version: pkg.version
}))


app.post('/notify', async (c) => {
    const requestBody = await c.req.json()
    const { type, title, users, body } = requestBody
    const channel = await createConnection();
    const queueName = "notifications"
    const message = { type, title, users, body}
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ message })));
    return c.json({ "status" : "successful" })
})

async function createConnection() {
    const queueName = "notifications"
    // @ts-ignore
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName)
    return channel;
}

async function startQueueProcessing() {
    const channel = await createConnection();
    const queueName = "notifications"
    await channel.assertQueue(queueName)
    channel.consume(queueName, (message) => {
        if (message !== null) {
            const payload = JSON.parse(message.content.toString());
            console.log('Processing message:', payload.message);
            channel.ack(message);
        }
    });
}

startQueueProcessing();
export default app
