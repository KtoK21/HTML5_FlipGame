const express = require("express");
const PORT = process.env.PORT;
const app = express();
app.get("/", (req, res) => {
res.send("test");
});
app.listen(PORT || 6321);
