import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Telegraf } from "telegraf";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const bot = new Telegraf('8302681013:AAGjxusG2zhbM8_hguH4mj5L2-BFaDN8S7Y');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"))

app.get('/', (req, res) => {
	res.sendFile(__dirname+"/views/tech.html");
});

app.get('/main', (req, res) => {
	res.sendFile(__dirname+"/views/main.html");
});

app.post('/form', (req, res) => {
	const{name, email, message,phone} = req.body;
	  bot.telegram.sendMessage(8176192068, `
<b>📋 New Application!:</b>

<b>Name:</b>
${name || "-"}
<b>Email:</b>
${email || "-"}
<b>Phone:</b>
${phone || "-"}
<b>Message:</b>
<blockquote>${message || "-"}</blockquote>
        `, {
            parse_mode: "HTML"
        });
})

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
