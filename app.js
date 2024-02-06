const express = require("express");
const app = express();
const port = 3000;
const urlsPath = "./public/jsons/url.json";
const urls = require(urlsPath) || [];
const fs = require("fs");

const { engine } = require("express-handlebars");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.render("index");
});

// 短網址路由
app.get("/shorten", (req, res) => {
  const inputUrl = req.query.url;
  const isValidUrl = inputUrl && inputUrl.length > 0;
  if (isValidUrl) {
    const shortUrl = shorten(inputUrl, urls);
    res.render("index", { shortUrl });
  }
});

// 短網址重定向路由
app.get("/:shortCode", (req, res) => {
  const shortCode = req.params.shortCode;
  const url = urls.find((data) => data.shortCode === shortCode);

  // 如果找不到對應 shortCode 則導回首頁
  if (!url) {
    res.redirect("/");
  }

  res.redirect(url.originalUrl);
});

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});

function generateShortCode() {
  // 可以在短網址中使用的字符集合
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  // 初始化短網址
  let shortCode = "";

  // 生成 5 個字符的短網址
  for (let i = 0; i < 5; i++) {
    shortCode += characters[Math.floor(Math.random() * characters.length)];
  }

  if (urls.some((url) => url.originalUrl === shortCode)) {
    return generateShortCode();
  }
  // 返回生成的短網址
  return shortCode;
}

function shorten(inputUrl, data) {
  let urls = data;
  let shortCode = "";
  // 如果輸入網址的最後一個字元為斜線，則將其去除
  if (inputUrl[inputUrl.length - 1] === "/") {
    inputUrl = inputUrl.slice(0, -1);
  }

  // 檢查網址是否已存在資料庫，若有則回傳原先以建立之id
  if (urls.some((url) => url.originalUrl === inputUrl)) {
    shortCode = urls.find((url) => url.originalUrl === inputUrl).shortCode;
  } else {
    shortCode = generateShortCode();
    urls.push({
      shortCode: shortCode,
      originalUrl: inputUrl,
    });

    // 將更新的資料寫入 url.json
    fs.writeFile(urlsPath, JSON.stringify(urls), function (err) {
      if (err) {
        console.log("Data written failed.");
        return console.error(err);
      }
      console.log("Data written successfully!");
    });
  }

  return `http://localhost:3000/${shortCode}`;
}
