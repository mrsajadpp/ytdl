let express = require('express');
let bodyParser = require('body-parser');
let ytdl = require('ytdl-core');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3005, () => {
    console.log('Ytdl api is up.')
})

app.post('/api/yt/download', (req, res) => {
    try {
        if (ytdl.validateURL(req.body.url)) {
            if (req.body.type == 'mp3') {
                res.header('Content-Disposition', 'attachment; filename="' + new Date() + '- Fizzy.mp3"');
                ytdl(req.body.url, { format: 'mp3', filter: 'audioandvideo', quality: 'highest' }).pipe(res);
            } else {
                if (req.body.type == 'mp4') {
                    res.header('Content-Disposition', 'attachment; filename="' + new Date() + '- Fizzy.mp4"');
                    ytdl(req.body.url, { format: 'mp4', filter: 'audioandvideo', quality: 'highest' }).pipe(res);
                }
            }
        } else {
            res.json({ error: 'url not found', status: 404 })
        }
    } catch (err) {
        res.json({ error: err, status: 500 });
    }
})

app.get('*', (req, res) => {
  res.json({ error: 'Api error', status: 404 })
})