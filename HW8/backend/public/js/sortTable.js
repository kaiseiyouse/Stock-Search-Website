function sortTable(method) {

    var table, rows, x, y, shouldSwitch, switching, asc;
    table = document.getElementById("fav-table");
    switching = true;
    asc = ($('#select-order').val() === 'Ascending');
    console.log("ascending is " + asc);

    while(switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");
        for(var i = 1,len = rows.length - 1; i < len; i++ ) {
            shouldSwitch = false;
            switch (method) {
                case "Symbol":
                    // console.log($('td', rows[i]));
                    x = $('td', rows[i])[0].firstChild.innerHTML;
                    y = $('td', rows[i + 1])[0].firstChild.innerHTML;
                    // console.log("x = " + x);
                    // console.log("y = " + y);
                    break;
                case "Price":
                    x = parseFloat($('td', rows[i])[1].innerHTML);
                    y = parseFloat($('td', rows[i + 1])[1].innerHTML);
                    break;
                case "Change":
                    x = parseFloat($('td', rows[i])[2].innerHTML.split('(')[0]);
                    y = parseFloat($('td', rows[i + 1])[2].innerHTML.split('(')[0]);
                    break;
                case "Change Percent":
                    x = parseFloat($('td', rows[i])[2].innerHTML.split('%')[0].split('(')[1]);
                    y = parseFloat($('td', rows[i+1])[2].innerHTML.split('%')[0].split('(')[1]);
                    break;
                case "Volume":
                    x = parseInt($('td', rows[i])[3].innerHTML.replace(/,/g , ''));
                    y = parseInt($('td', rows[i + 1])[3].innerHTML.replace(/,/g , ''));
                    break;
                default:
                    x = JSON.parse(localStorage.getItem($('td', rows[i])[0].firstChild.innerHTML))["defaultOrder"];
                    y = JSON.parse(localStorage.getItem($('td', rows[i+1])[0].firstChild.innerHTML))["defaultOrder"];
                    asc = true;
                    break;
            }

            if (asc) {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
            if(shouldSwitch) {
                // console.log(rows[i].parentNode);
                rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                // console.log(table);
                switching = true;
            }
    }


}

$('#select-method').change(function () {
    var method = $(this).val();
    if(method === 'Default') {
        $('#select-order').prop('disabled', true);
        sortTable('default');
    }
    else {
        $('#select-order').prop('disabled', false);
        sortTable(method);
    }
    $('#select-order').selectpicker('refresh');


});

$('#select-order').change(function () {
    var method = $('#select-method').val();
    sortTable(method);
});