const fs = require('fs');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware👋!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Tours Data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// Get All Tours
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: { tours: tours },
  });
};

// Get Single Tour
const getTour = (req, res) => {
  console.log(req.params);

  const id = +req.params.id;
  const tour = tours.find((singleTour) => singleTour.id === id);

  if (!tour) {
    res.status(404).json({
      ststus: 'failed',
      message: 'Invalid argument',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

// Create Tour
const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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
const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'invalid argument',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<h1>Tour Updated Successfully</h1>',
    },
  });
};

// Delete Tour
const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'invalid argument',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
