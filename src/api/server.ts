import path from "path";
import express from "express";

const app = express()
const PORT = process.env.PORT ?? 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.get('/hello', (_, res) => {
    res.send("Hello world!")
})

if (NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), '/dist/web')));
    app.get('*', (_,res) =>{
        res.sendFile(path.join(path.resolve(), '/dist/web/index.html'));
    });
}

app.listen(PORT)