require('dotenv').config({ path: '../../.env' });
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.static('public')); 

/**
 * Used to securely access the API key.
 * Only drawback is that the API will only work on
 * my (Max's) machine with this approach.
 */
app.post('/api', express.json(), async (req, res) => {
    // Fetch data from the actual API
    const apiResponse = await fetch('https://api.openai.com/v1/completions', {
        method: "POST",
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify(req.body)
    });

    const apiData = await apiResponse.json();

    // Send API data back to the client
    res.json(apiData);
});

app.listen(3000, () => console.log('Server running on port 3000'));