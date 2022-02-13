import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

const app = express();

const port = process.env.PORT || 8001;

app.use(express.json())
app.use(Cors())

const connection_url = 'mongodb+srv://admin:IndiA%401234@cluster0.zenhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.get('/dating/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

app.listen(port, () => console.log(`Listening on localhost: ${port}`));