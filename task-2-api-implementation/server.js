require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3003;


app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    console.log(`Server running on PORT: ${PORT}`);
});