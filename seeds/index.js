const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

MongoClient.connect("mongodb://localhost:27017/yelp-camp1", function (err, db) {
     if(err) throw err;   
  // Use this space to pass MongoDB CRUD code here             
});

mongoose.connect('mongodb://localhost:27017/yelp-camp1', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62b190e99a56cfa809186cf8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzepwupsl/image/upload/v1662123740/YelpCamp/argvvrkbia7wca594acs.jpg',
                    filename: 'YelpCamp/argvvrkbia7wca594acs.jpg',
                },
                {
                    url: 'https://res.cloudinary.com/dzepwupsl/image/upload/v1661957231/YelpCamp/pkchegjojjtqyartqycl.jpg',
                    filename: 'YelpCamp/pkchegjojjtqyartqycl',
                },
                {
                    url: 'https://res.cloudinary.com/dzepwupsl/image/upload/v1661957246/YelpCamp/suoyottkhmyultad1epv.jpg',
                    filename: 'YelpCamp/suoyottkhmyultad1epv',

                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})