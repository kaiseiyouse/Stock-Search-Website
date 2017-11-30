function showAlert(id, word) {
    // $errordiv = $('<div>', {class: "alert alert-danger"});
    // $errordiv.append("Error! Failed to get " + word + " data");
    // $errordiv.css('margin-top', '25%');

    var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get ' + word + ' data</div>';
    $('#' + id).html(error);
}

function showProgress() {


    var progress = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>';
    $('#detail-table-container').html(progress);

    var indicators = ["Price", "SMA", "EMA", "STOCH", "RSI", "ADX", "CCI", "BBANDS", "MACD"];
    for(var i in indicators) {
        $('#' + indicators[i]).html(progress);
    }



    // $progressDiv.css('margin-top', '0');
    $('#chart').html(progress);
    $('#news').html(progress);
}