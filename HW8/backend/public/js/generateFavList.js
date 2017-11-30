$('#btn-fav').click(function () {
    var symbol = sessionStorage.getItem("symbol");
    symbol = JSON.parse(symbol)["symbol"];
    // console.log(symbol);
    if(localStorage.getItem(symbol)) {
        $('img', this).prop('src', './icons/star_empty.png');
        // localStorage.removeItem(symbol);
        removeFromFavList(symbol);
    }
    else {
        $('img', this).prop('src', './icons/star_filled.png');
        addToFavList(symbol);
    }
});

function addToFavList(symbol) {
    currSymbolObj = sessionStorage.getItem("symbol");
    // console.log(currSymbolObj);
    localStorage.setItem(symbol, currSymbolObj);
    var obj = JSON.parse(currSymbolObj);
    // console.log(obj);
    var symbol = obj["symbol"];
    var html = "<tr><td><a href='#' onclick='submitForm(" + '"' +symbol+ '"' + ")'>" + symbol + "</a></td><td>" +
                obj["price"] + "</td><td>" +
                obj["changeFormatted"] + "</td><td>" +
                obj["volumeFormatted"] + "</td><td>" +
                   "<button class='btn btn-default'><span class='glyphicon glyphicon-trash'></span></button>" + "</td></tr>";

    var row = $.parseHTML(html);
    $('button', row).click(function () {
        $(this).parent().parent().remove();
        localStorage.removeItem(symbol);
        if(JSON.parse(sessionStorage.getItem("symbol"))["symbol"] === symbol) {
            $('#btn-fav img').prop('src', './icons/star_empty.png');
        }
        // console.log($(this));
        console.log("remove from trash bin");
    });

    $('#fav-table').append(row);
    // console.log($('#fav-table tr'));
}


//consider both cases: click star or trash bin
function removeFromFavList(symbol) {

    localStorage.removeItem(symbol);
    // console.log(symbol);
    var table = document.getElementById('fav-table');
    var rows = table.rows;
    // console.log(rows);
    for(var i=1, len=rows.length;i<len;i++) {
        // console.log(rows[i].children[0]);
        if(rows[i].children[0].innerText === symbol) {
            // console.log("row" + i + "is to be deleted");
            table.deleteRow(i);
            break;
        }
    }

}


//load favList when the page refresh
function loadFavList() {
        // localStorage.clear();
        for (var key in localStorage) {
            if(key === 'defaultOrder') continue;
            var obj = JSON.parse(localStorage.getItem(key));
            // console.log(obj);
            var symbol = obj["symbol"];
            var html = "<tr><td><a href='#' onclick='submitForm(" + '"' +symbol+ '"' + ")'>" + symbol + "</a></td><td>" +
                obj["price"] + "</td><td>" +
                obj["changeFormatted"] + "</td><td>" +
                obj["volumeFormatted"] + "</td><td>" +
                "<button class='btn btn-default'><span class='glyphicon glyphicon-trash'></span></button>" + "</td></tr>";

            var row = $.parseHTML(html);
            $('button', row).click(function () {
                $(this).parent().parent().remove();
                localStorage.removeItem(symbol);
                if (JSON.parse(sessionStorage.getItem("symbol"))["symbol"] === symbol) {
                    $('#btn-fav img').prop('src', './icons/star_empty.png');
                }
                // console.log($(this));
                console.log("remove from trash bin");
            });

            $('#fav-table').append(row);
        }
        refresh();

}