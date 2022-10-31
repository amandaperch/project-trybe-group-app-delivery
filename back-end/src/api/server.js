const port = process.env.PORT || 3001;
const app = require('./app');
// import { app }from './app';

app.listen(port);
console.log(`Api rodando na porta ${port}`);
