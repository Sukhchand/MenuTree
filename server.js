const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors({origin: true, credentials: true}));

app.get('/', (req,res) => {
    res.send('Hello World');
});
const port = process.env.port || 8000;
app.listen(port,()=> console.log(`Server running on port ${port}`));

app.get('/api/getMenuList', async (req, res)=> {
    const api_url = "https://api.npoint.io/93bed93a99df4c91044e";
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
})