const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());

const userController = require('./controllers/userController');
app.use('/', userController);

const userRoleController = require('./controllers/userRoleController');
app.use('/roles', userRoleController);

app.listen(PORT, () => {
    console.log(`users service started on port ${PORT}`);
});