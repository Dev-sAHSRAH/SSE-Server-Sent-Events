document.addEventListener("DOMContentLoaded", () => {
    const stockDataBody = document.getElementById("stock-data");

    // Function to update stock prices in the table
    function updateStockTable(stocks) {
        stockDataBody.innerHTML = ""; // Clear the existing rows

        for (const [stock, price] of Object.entries(stocks)) {
            const row = document.createElement("tr");

            const stockCell = document.createElement("td");
            stockCell.textContent = stock;

            const priceCell = document.createElement("td");
            priceCell.textContent = price;

            row.appendChild(stockCell);
            row.appendChild(priceCell);

            stockDataBody.appendChild(row);
        }
    }

    // Create an EventSource to connect to the server
    const eventSource = new EventSource("http://localhost:8080/stocks");

    // Listen for the "message" event
    eventSource.onmessage = function (event) {
        const stocks = JSON.parse(event.data);
        updateStockTable(stocks);
    };

    // Handle connection errors
    eventSource.onerror = function () {
        console.error(
            "Error occurred while connecting to the stock price stream."
        );
    };
});
