const app = require('./app');

// stayed on server (amazon, digital ocean): 
var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listen on port: ${PORT}`);
});