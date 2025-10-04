import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"))

app.get('/', (req, res) => {
	res.sendFile(__dirname+"/views/tech.html");
});

app.get('/main', (req, res) => {
	res.sendFile(__dirname+"/views/main.html");
});
app.get('/achieve', (req, res) => {
	res.sendFile(__dirname+"/views/achievements_contact.html");
});
app.get('/teach', (req, res) => {
	res.sendFile(__dirname+"/views/teacher_about.html");
});

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
