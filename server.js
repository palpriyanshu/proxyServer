const { app } = require('./src/app.js');

app.listen(process.env.PORT || 8002, () => console.log('listening'));
