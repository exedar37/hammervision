const app = require('./app'); // Import the Express application
const db = require('./models'); // assuming your Sequelize models are set up here
const port = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

  }).catch(err => {
    console.error("Failed to synchronize database:", err);
  });

