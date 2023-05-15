import express from 'express';

const app = express();

app.get('/welcome', (req, res, next) => {
    res.json({
        message: "Welcome to Vyapar!"
    })
})

app.listen(process.env.PORT || 3000)