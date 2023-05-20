const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const ytdl = require('ytdl-core');
const { YoutubeTranscript } = require('youtube-transcript')
const app = express();
var cors = require('cors')
app.use(bodyParser.json());
app.use(cors())

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];


// Get all users
app.post('/get-youtube-text', async (req, res) => {
    try {
        const video = req.body.video
        let allStr = ''
        await YoutubeTranscript.fetchTranscript(video)
            .then((data) => data && data.length > 0 && data.map((str) => allStr = allStr + `\n ${str.text}`))
            .catch((err) => console.log(err)
            );
        const infoDetail = await ytdl.getInfo(`https://www.youtube.com/watch?v=${video}`)
        res.send({ text: allStr, info: infoDetail.videoDetails })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
