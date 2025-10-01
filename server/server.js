import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// сюда вставляешь свои ключи Google API
const API_KEY = "ТВОЙ_GOOGLE_API_KEY";
const CX = "ТВОЙ_CUSTOM_SEARCH_ID";

app.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;
    const r = await fetch(url);
    const data = await r.json();

    // берём краткий ответ из первого результата
    let answer = data.items?.[0]?.snippet || "Ничего не нашёл";
    res.json({ answer });
  } catch (e) {
    res.json({ answer: "Ошибка при поиске" });
  }
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
