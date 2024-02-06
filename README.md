# URL Shortener - 短網址產生器

使用 Node.js + Express 製作的短網址產生器

![image](https://github.com/h967160/url_shortener/assets/152831113/4a984eef-4a93-49d9-9c26-bcd32ea54ff5)

## Features - 功能

- 可以輸入網址產生對應的短網址，若已經轉換過的網址產生的短網址也是一樣的。
- 可以直接點選生成的短網址連結至原網址。
- 點選標題 URL SHORTENER 可以回到首頁。
- 以 json 檔儲存網址資料。
- 若輸入不符合的短網址將回到首頁。

## Environment SetUp - 環境建置

- Node.js
- Express @4.18.2
- Express-handlebars @7.1.2
- Bootstrap @5.1.3

## Installation and Execution - 安裝並執行專案

1.開啟終端機（Terminal）， clone 此專案至本機電腦。

```
https://github.com/h967160/url_shortener.git
```

2.開啟終端機（Terminal），進入存放此專案的資料夾。

```
cd url_shortener
```

3.安裝 npm 套件

```
npm install
```

4.安裝 nodemon 工具（開發環境使用，如已安裝可跳過此步驟）

```
npm install -g nodemon
```

5.啟動伺服器

```
npm run dev
```

6.當 Terminal 出現以下訊息，表示伺服器已啟動，打開瀏覽器進入到以下網址

```
Express server is running on http://localhost:3000
```

7.如欲停止伺服器

```
ctrl + c
```
