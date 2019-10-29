const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname,'../templates/partial')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath); 

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send("<h1>Weather</h1>");
// });

// app.get('/help', (req, res) => {
//     res.send([{
//         name: "Shrikant"
//     },{
//         name: "padhi"
//     }]);
// });

// app.get('/about', (req, res) => {
//     res.send("<h1>About</h1>");
// });

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Shrikant Padhi"
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Thor",
        name: "Shrikant Padhi"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is  some helpfull text",
        title: 'Help',
        name: 'Shrikant Padhi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if(error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
    // res.send({
    //     forecast: "It is cloudy",
    //     location: "Mumbai",
    //     address: req.query.address
    // });
});

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
        })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "404",
        name:  "Shrikant Padhi",
        errorMessage: "Help article not found"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Shrikant Padhi",
        errorMessage: "Page not found"
    })
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});