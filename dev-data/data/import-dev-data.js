const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

// const app = require('./app');

// Connection to Database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

//   Fetching Data from our json file into the database
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import Data in DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully Imported');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Delete all Data in DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted Imported');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();

console.log(process.argv);
