const fs = require('fs');

// Tours Data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// Middleware
exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (+req.params.id > tours.length || +req.params.id < 0) {
    return res.status(404).json({
      status: 'failed',
      message: 'invalid argument',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing name or price',
    });
  }
  next();
};

// Get All Tours
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: { tours: tours },
  });
};

// Get Single Tour
exports.getTour = (req, res) => {
  console.log(req.params);

  const id = +req.params.id;
  const tour = tours.find((singleTour) => singleTour.id === id);

  //   if (!tour) {
  //     res.status(404).json({
  //       ststus: 'failed',
  //       message: 'Invalid argument',
  //     });
  //   }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

// Create Tour
exports.createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) throw err;

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// Update Tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<h1>Tour Updated Successfully</h1>',
    },
  });
};

// Delete Tour
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
