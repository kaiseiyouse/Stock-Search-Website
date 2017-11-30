function refresh() {
    $.each($('#fav-table tr'), function (i, row) {
        if(i != 0) {
            var symbol = row.children[0].innerText;
            // console.log(symbol);
            requestData(symbol, row);
        }
    });
    console.log("Is Refreshing...");
}

function requestData(symbol, row) {
    const url = "https://stock-183802.appspot.com";
    $.ajax({
        url: url + "/api/refresh",
        method: "GET",
        data: {

            symbol: symbol

        }
    })
        .done(function (msg) {
            if(msg === '') {
                return;
            }
            // console.log(msg);
            var today = JSON.parse(msg.split('@')[0]);
            var yesterday = JSON.parse(msg.split('@')[1]);
            // console.log(today);
            // console.log(yesterday);
            var volume = today["5. volume"]; //volume as string with no thousand seperator
            var price = parseFloat(today["4. close"]);
            // console.log(data);
            //var prevObj = JSON.parse(localStorage.getItem(symbol));
            var prevClose = parseFloat(yesterday["4. close"]);
            var change = price - prevClose;
            var changePercent = change / prevClose * 100;
            changePercent = changePercent.toFixed(2) + '%';
            var img = (change >= 0) ? "<img src='./icons/Green_Arrow_Up.png' width='15px' height='15px'>" :
                                        "<img src='./icons/Red_Arrow_Down.png' width='15px' height='15px'>";
            row.children[1].innerHTML = price.toFixed(2);
            row.children[2].innerHTML = change.toFixed(2) + '(' + changePercent + ')' + img;
            row.children[3].innerHTML = parseInt(volume).toLocaleString();



        })
        .fail(function (xhr, status) {
            console.log(xhr);
            console.log("Refresh request failed: " + status);
        });
}

// function autoRefresh() {
//     setInterval(refresh, 5000);
// }