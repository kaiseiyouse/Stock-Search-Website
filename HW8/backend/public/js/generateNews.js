function generateNews(obj) {
    const items = obj["rss"]["channel"][0]["item"];
    // console.log(items);
    $newsdiv = $("<div>");
    for(var i=0, len=items.length; i < len; i++) {
        var link = items[i]["link"][0];
        var author = items[i]["sa:author_name"][0];
        var title = items[i]["title"][0];
        var date = items[i]["pubDate"][0];
        date = date.slice(0, date.length-5) + "EDT";
        var $div = $("<div>", {class: "well well-lg"});
        $div.html("<div style='font-size: medium; padding-bottom: 15px'><a target='_blank' href='" + link + "'>" + title + "</a></div>" +
            "<div style='font-weight: bold;'>" + author + "</div>" +
            "<div style='font-weight: bold;'>" + date + "</div>"
        );
        $newsdiv.append($div);
    }
    $('#news').html($newsdiv);
}