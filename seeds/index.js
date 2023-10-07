const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        await new Campground({
            author: "63f46908eb3cad8ac7caf089",
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                    filename: 'YelpCamp/s2an1ge0safnhaqvjaga',
                },
                {
                    url: 'https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                    filename: 'YelpCamp/d1o97lg9msogi5hog53y',
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vitae consequuntur aliquid nam consectetur, rem eius iure minima modi vero necessitatibus inventore ut dolorem laboriosam earum ducimus. Minus, commodi assumenda?",
            price: price
        }).save()
    }
}

seedDB().then(() => {
    db.close();
})