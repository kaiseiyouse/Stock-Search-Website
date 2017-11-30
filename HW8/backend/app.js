const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const http = require("http");
// const DOMParser = require('xmldom');
const parseString = require('xml2js').parseString;

const app = express();
// app.use(function (req, res, next) {
//     console.log(req.method + " request for " + "'"+ req.url+ "'");
//     next();
// });
app.use(express.static("./public"));
app.use(cors());



app.get('/api/daily', function (req, res1) {
    const symbol = req.query.symbol;
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=5MEQ8IRETK77LVCM";

    https.get(url, function(res) {
        var data = [];
        // console.log('statusCode: ', res.statusCode);
        // console.log('headers', res.headers);
        res.on('data', function (chunk) {
            data.push(chunk);
        });
        res.on('end', function () {
            var buffer = Buffer.concat(data);
            // console.log(buffer.toString('UTF-8'));
            res1.send(buffer.toString('UTF-8'));
        });
    }).on('error', function (err) {
        console.log("problem with request: " + err.message);
    });

});


app.get('/api/refresh', function (req, res1) {
    const symbol = req.query.symbol;
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=5MEQ8IRETK77LVCM";

    https.get(url, function(res) {
        var data = [];
        // console.log('statusCode: ', res.statusCode);
        // console.log('headers', res.headers);
        res.on('data', function (chunk) {
            data.push(chunk);
        });
        res.on('end', function () {
            var str = Buffer.concat(data).toString('UTF-8');
            // console.log(str);
            if(str === '{}' || str === undefined) {
                res1.send("");
            }
            else {
                var obj = JSON.parse(str);
                // console.log(obj);
                var last_refreshed = obj["Meta Data"]["3. Last Refreshed"].slice(0, 10);
                var objToday = obj["Time Series (Daily)"][last_refreshed];
                // console.log(objToday);
                last_refreshed = new Date(last_refreshed);
                last_refreshed.setDate(last_refreshed.getDate() - 1);
                last_refreshed = last_refreshed.toISOString().slice(0, 10);
                while(!obj["Time Series (Daily)"].hasOwnProperty(last_refreshed)) {
                    last_refreshed = new Date(last_refreshed);
                    last_refreshed.setDate(last_refreshed.getDate() - 1);
                    last_refreshed = last_refreshed.toISOString().slice(0, 10);
                }
                var objYesterday = obj["Time Series (Daily)"][last_refreshed];
                // console.log(objYesterday);

                //use '@' symbol to seperate today's and yesterday's data
                res1.send(JSON.stringify(objToday) + '@' + JSON.stringify(objYesterday));
            }

        });
    }).on('error', function (err) {
        console.log("problem with refresh request: " + err.message);
    });

});



app.get('/api/indicators', function (req, res1) {
    const symbol = req.query.symbol;
    const indicator = req.query.indicator;
    const url = "https://www.alphavantage.co/query?function=" + indicator + "&symbol=" + symbol + "&interval=daily&time_period=10&series_type=open&apikey=5MEQ8IRETK77LVCM";

    https.get(url, function(res) {
        var data = [];
        // console.log('statusCode: ', res.statusCode);
        // console.log('headers', res.headers);
        res.on('data', function (chunk) {
            data.push(chunk);
        });
        res.on('end', function () {
            var buffer = Buffer.concat(data);
            res1.send(buffer.toString('UTF-8'));
        });
    }).on('error', function (err) {
        console.log("problem with request: " + err.message);
    });

});

app.get('/api/news', function (req, res1) {
    const symbol = req.query.symbol;
    const url = "https://seekingalpha.com/api/sa/combined/" + symbol +".xml";
    https.get(url, function(res) {
        var data = [];
        // console.log('statusCode: ', res.statusCode);
        // console.log('headers', res.headers);
        res.on('data', function (chunk) {
            data.push(chunk);
        });
        res.on('end', function () {
            var buffer = Buffer.concat(data);
            var xml = buffer.toString('UTF-8');
            parseString(xml, function (err, result) {
                // console.log(result);
                res1.send(result);
            })
        });
    }).on('error', function (err) {
        console.log("problem with request: " + err.message);
    });

});

app.get('/api/autocomplete', function (req, res1) {
    const symbol = req.query.input;
    const url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" + symbol;

    http.get(url, function(res) {
        var data = [];
        // console.log('statusCode: ', res.statusCode);
        // console.log('headers', res.headers);
        res.on('data', function (chunk) {
            data.push(chunk);
        });
        res.on('end', function () {
            var buffer = Buffer.concat(data);
            // console.log(buffer.toString('UTF-8'));
            res1.send(buffer.toString('UTF-8'));
        });
    }).on('error', function (err) {
        console.log("problem with request: " + err.message);
    });

});



// app.listen(3000);
// console.log("Express app running on port 3000");

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
// module.exports = app;