function generateEverything(symbol) {
    // showProgress();
    const url = "https://stock-183802.appspot.com";
    $.ajax({
        url: url + "/api/daily",
        method: "GET",
        data: {

            symbol: symbol

        }
    })
        .done(function (msg) {
            // console.log(msg);
            var data = JSON.parse(msg);

            if(!data.hasOwnProperty("Meta Data")) {
                showAlert("detail-table-container", "stock");
                showAlert("Price", "Price");
                showAlert("chart", "historical charts");
                return;
            }

            generateStockDetailsTable(data);
            replace_chart_Price(data);

            /*Historical Charts tab*/
            generateHistorical(data, symbol);


        })
        .fail(function (xhr, status) {
            console.log(xhr);
            console.log("Request failed: " + status);
            showAlert("detail-table-container", "stock");
            showAlert("Price", "Price");
            showAlert("chart", "historical charts");
        });

    var indicators = ["SMA", "EMA", "STOCH", "RSI", "ADX", "CCI", "BBANDS", "MACD"];
    for( var ind in indicators) {
        requestIndicators(symbol, indicators[ind]);
    }
    requestNews(symbol);
    $("#chart-tabs a[data-toggle='tab']").on('shown.bs.tab', function () {
        var currTab = $(this).text();
        var disabled = true;
        switch (currTab) {
            case "Price":
                disabled = PRICEchart;
                break;
            case "SMA":
                disabled = SMAchart;
                break;
            case "EMA":
                disabled = EMAchart;
                break;
            case "STOCH":
                disabled = STOCHchart;
                break;
            case "RSI":
                disabled = RSIchart;
                break;
            case "ADX":
                disabled = ADXchart;
                break;
            case "CCI":
                disabled = CCIchart;
                break;
            case "BBANDS":
                disabled = BBANDSchart;
                break;
            case "MACD":
                disabled = MACDchart;
                break;
            default:
                break;
        }
        if(disabled === undefined) disabled = true;
        else disabled = false;
        $("#btn-facebook").prop("disabled", disabled);
    });
    $("#btn-facebook").click(function () {
        var selected = $("#chart-tabs > .active").text();
        var selectedChart = PRICEchart;
        switch (selected) {
            case "Price":
                selectedChart = PRICEchart;
                break;
            case "SMA":
                selectedChart = SMAchart;
                break;
            case "EMA":
                selectedChart = EMAchart;
                break;
            case "STOCH":
                selectedChart = STOCHchart;
                break;
            case "RSI":
                selectedChart = RSIchart;
                break;
            case "ADX":
                selectedChart = ADXchart;
                break;
            case "CCI":
                selectedChart = CCIchart;
                break;
            case "BBANDS":
                selectedChart = BBANDSchart;
                break;
            case "MACD":
                selectedChart = MACDchart;
                break;
            default:
                break;
        }
        var exportUrl = 'https://export.highcharts.com/';
        var optionsStr = JSON.stringify(selectedChart["options"]);
        dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
        $.ajax({
            type: 'POST',
            data: dataString,
            url: exportUrl,
            success: function (data) {
                console.log('get the file from url: ', exportUrl+data);
                FB.ui({
                    method: 'feed',
                    app_id: '906998979470166',
                    picture: exportUrl + data
                }, function(response){

                });
            },
            error: function (err) {
                debugger;
                console.log('error', err.statusText)
            }
        });

    });
}

function requestIndicators(symbol, indicator) {
    var url = "https://stock-183802.appspot.com";
    $.ajax({
        url: url + "/api/indicators",
        method: "GET",
        data: {

            symbol: symbol,
            indicator: indicator

        }
    })
        .done(function (msg) {
            var data = JSON.parse(msg);
            // console.log(data);
            if(!data.hasOwnProperty("Meta Data")) {
                showAlert(indicator, indicator);
                return;
            }
            switch (indicator) {
                case "SMA":
                    replace_chart_SMA(data);
                    break;
                case "EMA":
                    replace_chart_EMA(data);
                    break;
                case "STOCH":
                    replace_chart_STOCH(data);
                    break;
                case "RSI":
                    replace_chart_RSI(data);
                    break;
                case "ADX":
                    replace_chart_ADX(data);
                    break;
                case "CCI":
                    replace_chart_CCI(data);
                    break;
                case "BBANDS":
                    replace_chart_BBANDS(data);
                    break;
                case "MACD":
                    replace_chart_MACD(data);
                    break;
                default:
                    break;
            }
        })
        .fail(function (xhr, status) {
            console.log(xhr);
            console.log("Request failed: " + status);
            showAlert(indicator, indicator);
        });
}

function requestNews(symbol) {
    const url = "https://stock-183802.appspot.com";
    $.ajax({
        url: url + "/api/news",
        method: "GET",
        data: {

            symbol: symbol

        }
    })
        .done(function (msg) {
            // console.log(msg);
            // var data = JSON.parse(msg);
            // console.log(msg);
            generateNews(msg);

        })
        .fail(function (xhr, status) {
            console.log(xhr);
            console.log("Request failed: " + status);
            showAlert("news", "news feed");
        });
}