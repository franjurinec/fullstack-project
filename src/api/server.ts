import path from "path";
import express from "express";

const app = express()
const PORT = process.env.PORT ?? 3000
const NODE_ENV = process.env.NODE_ENV ?? 'development'

app.get('/api', (_, res) => {
    res.send("Hello world!")
})

/*
    When server is in a production envrionment, serve packaged React app from /dist/web
    This enables serving both the frontend and backend of the application via a single process
    All non-'/api' routes return the index.html file to enable normal React Router behavior
*/
if (NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), '/dist/web')));

    // Should be the last defined route
    app.get('*', (_,res) =>{
        res.sendFile(path.join(path.resolve(), '/dist/web/index.html'));
    });
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT} in ${NODE_ENV} mode. \n` 
    + `Frontend ${NODE_ENV === 'production' ? 'is' : 'is not'} being served.`))