import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello, Express server is running!');
});

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
