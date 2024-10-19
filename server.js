const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8080;
app.use(cors());
// app.use(express.static("public"));

const stocks = {
    AAPL: 150.0,
    MSFT: 300.0,
    GOOGL: 275.0,
};

function updateStockPrices() {
    Object.keys(stocks).forEach((stock) => {
        // gives random number between [-1,1)
        const change = (Math.random() * 2 - 1).toFixed(2);

        stocks[stock] = (
            parseFloat(stocks[stock]) + parseFloat(change)
        ).toFixed(2);
    });
}

app.get("/stocks", (req, res) => {
    res.setHeader("Content-type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const intervalId = setInterval(() => {
        // get current stock prices
        updateStockPrices();

        const data = JSON.stringify(stocks);
        res.write(`data: ${data}\n\n`);
    }, 1000);

    res.on("close", () => {
        clearInterval(intervalId);
        res.end();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running @ PORT : ${PORT}`);
});
