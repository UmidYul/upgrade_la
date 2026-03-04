import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Telegraf } from "telegraf";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const bot = new Telegraf('8637705357:AAF0byJLaZpt_bl3n6iCeZF-tAAvGyxztuI');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/main.html');
});

app.post('/form', async (req, res) => {
	const { name, email, message, phone } = req.body;
	try {
		await bot.telegram.sendMessage(8176192068, `
<b>📋 Новая заявка — Upgrade LA</b>

<b>Имя:</b> ${name || '-'}
<b>Email:</b> ${email || '-'}
<b>Телефон:</b> ${phone || '-'}
<b>Сообщение:</b>
<blockquote>${message || '-'}</blockquote>
		`, { parse_mode: 'HTML' });
		res.json({ ok: true });
	} catch (err) {
		console.error('Telegram error:', err.message);
		res.status(500).json({ ok: false, error: 'Ошибка отправки' });
	}
});

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
