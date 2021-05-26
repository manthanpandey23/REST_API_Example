const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

const redisPort = 6379;
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})

app.get("/activity/search", (req, res) => {
    const searchTerm = req.query.text;
    try {
        client.get(searchTerm, async (err, result) => {
            if (err) throw err;
    
            if (result) {
                res.status(200).send({
                    result: JSON.parse(result),
                    message: "data retrieved from the cache"
                });
            }
            else {
                const result = await axios.get(`https://sandbox.musement.com/api/v3/activities?text=${searchTerm}&text_operator=AUTO&extend_other_languages=AUTO&extend_content_fields=AUTO&fuzziness_level=LEVEL-0&zero_terms_query=NONE&limit=10&offset=0`);
                client.setex(searchTerm, 600, JSON.stringify(result.data));
                res.status(200).send({
                    result: result.data,
                    message: "cache miss"
                });
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Node server started on Port 3000");
});