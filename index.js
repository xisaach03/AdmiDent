const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT | 3001;

app.use('', express.static(path.join(__dirname, 'dist', 'admi-dent', 'browser')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'admi-dent', 'browser','index.csr.html'))
})

app.listen(port, () => {
    console.log(`Puerto ${port}`)
})