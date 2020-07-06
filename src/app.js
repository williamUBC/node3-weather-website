const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const geocodePromise = require('./utils/geocodePromise');
const forecastPromise = require('./utils/forecastPromise');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setip static directory to serve
app.use(express.static(publicDirectoryPath));
// express 默认回去从这个路径中找index.html文件，如果找到了就作为root路径的显示

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Bill Haha'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bill Haha'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help HBS',
        name: 'Bill Haha'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }
    geocodePromise(address)
        .then(({ longitude, latitude } = {}) => {
            return forecastPromise(longitude, latitude)
        })
        .then(({ name, temperature, precipitation, decription, icon } = {}) => res.send({
            name,
            temperature, 
            precipitation, 
            decription, 
            icon
        }))
        .catch(error => res.send({error}));

    // res.send({
    //     forecast: 20,
    //     location: 'New York',
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' });
        // 注意加上return，否则会报错，因为如果没有return的话程序会继续执行后面的res.send， 而express只能response一次
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Bill wow'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bill wow',
        errorMessage: 'My 404 page'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

// 此时就可以通过localhost:3000/help.html来访问了，下面的代码就用不到了
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Bill',
//         age: 100
//     });
// });

// app.get('/about', (req, res) => {
//     //res.send('<h2>About page</h2>');
//     res.sendFile(`${publicDirectoryPath}/about.html`);
// });