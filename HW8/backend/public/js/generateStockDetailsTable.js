

function generateStockDetailsTable(obj) {
    // var items = $('#detail-table td');
    // console.log(obj);
    var last_refreshed = obj["Meta Data"]["3. Last Refreshed"].slice(0, 10);
    var timestamp = obj["Meta Data"]["3. Last Refreshed"] + " EDT";
    while(!obj["Time Series (Daily)"].hasOwnProperty(last_refreshed)) {
        last_refreshed = new Date(last_refreshed);
        last_refreshed.setDate(last_refreshed.getDate() - 1);
        last_refreshed = last_refreshed.toISOString().slice(0, 10);
    }

    var today = obj["Time Series (Daily)"][last_refreshed];
    last_refreshed = new Date(last_refreshed);
    last_refreshed.setDate(last_refreshed.getDate() - 1);
    last_refreshed = last_refreshed.toISOString().slice(0, 10);
    while(!obj["Time Series (Daily)"].hasOwnProperty(last_refreshed)) {
        last_refreshed = new Date(last_refreshed);
        last_refreshed.setDate(last_refreshed.getDate() - 1);
        last_refreshed = last_refreshed.toISOString().slice(0, 10);
    }
    var yesterday = obj["Time Series (Daily)"][last_refreshed];
    var change = parseFloat(today["4. close"]) - parseFloat(yesterday["4. close"]);
    var changePercent = change / parseFloat(yesterday["4. close"]) * 100;
    // change = parseFloat(change);
    // changePercent = parseFloat(changePercent);
    var arrowImg = change >= 0 ? "./icons/Green_Arrow_Up.png" : "./icons/Red_Arrow_Down.png";



    // var table = $.parseHTML(html);
    // var items = $('#detail-table td');


    var td1 = obj["Meta Data"]["2. Symbol"];     //symbol
    var td2 = parseFloat(today["4. close"]).toFixed(2);     //Last Price
    var td3 = change.toFixed(2) + '(' + changePercent.toFixed(2) + '%)' + "<img src='" + arrowImg+ "' width='15px' height='15px'>";     //Change(Change Percent)
    var td4 = timestamp;     //timestamp
    var td5 = parseFloat(today["1. open"]).toFixed(2);          //Open
    var td6 = parseFloat(yesterday["4. close"]).toFixed(2);     //previous close
    var td7 = parseFloat(today["3. low"]).toFixed(2) + ' - ' + parseFloat(today["2. high"]).toFixed(2);
    var td8 = parseInt(today["5. volume"]).toLocaleString();


    var html = '<table class="table table-striped" id="detail-table">' +
        '<tr><th>Stock Ticker Symbol</th><td>' + td1 + '</td></tr>' +
        '<tr><th>Last Price</th><td>' + td2 + '</td></tr>' +
        '<tr><th>Change(Change Percent)</th><td>' + td3 + '</td></tr>' +
        '<tr><th>Timestamp</th><td>' + td4 + '</td></tr>' +
        '<tr><th>Open</th><td>' + td5 + '</td></tr>' +
        '<tr><th>Close</th><td>' + td6 + '</td></tr>' +
        '<tr><th>Day\'s Range</th><td>' + td7 + '</td></tr>' +
        '<tr><th>Volume</th><td>' + td8 + '</td></tr></table>';

    $('#detail-table-container').html(html);

    var obj = {};
    obj.symbol = td1;
    obj.price = td2; //real-time price
    obj.change = change;
    obj.percent = changePercent;
    obj.changeFormatted = td3;
    obj.volume = parseInt(today["5. volume"]);
    obj.volumeFormatted = td8;
    obj.close = yesterday["4. close"];//yesterday close price

    if(!localStorage.getItem("defaultOrder")) {
        localStorage.setItem("defaultOrder", 0);
    }

    if(!localStorage.getItem(obj.symbol)) {
        obj.defaultOrder = localStorage.getItem("defaultOrder");

        localStorage.setItem("defaultOrder", parseInt(obj.defaultOrder) + 1);
        sessionStorage.setItem("symbol", JSON.stringify(obj));
    }

    else sessionStorage.setItem("symbol", localStorage.getItem(obj.symbol));
    // console.log(localStorage);


    $('#btn-facebook').prop('disabled', false);
    $('#btn-fav').prop('disabled', false);

}