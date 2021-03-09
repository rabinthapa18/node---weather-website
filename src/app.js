const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000

//Defining path for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handelbars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory to use
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rabinson Thapa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Rabinson Thapa'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Me',
        name: 'Rabinson Thapa'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({
                error: 'Location not found. Check location and try again.'
            })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: 'Cannot find weather for this location. Check the loacation and try again.'
                    })
                }
                res.send({
                    location: location,
                    weatherForecast:forecastData
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.string) {
        return res.send({
            error: 'you must provide search'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404_page', {
        title: '404',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up and running on port '+port)
})