const app = require('./app');

console.log(process.env);

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});