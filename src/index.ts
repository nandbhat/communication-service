import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json({
    ok: true,
    message: 'Hello Hono!',
}))

export default app
