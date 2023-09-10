import { Hono } from 'hono'
import pkg from '../package.json'

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

export default app
