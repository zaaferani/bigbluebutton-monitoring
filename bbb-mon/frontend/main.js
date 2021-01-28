function spinner(enable) {
    if (enable) {
        $('.loading-spinner').show();
    }
    else {
        $('.loading-spinner').hide();
    }
}

function addTotalRow(totalNoUsers){
    let markup = `<tr>
<td></td>
<th>total:</td>
<th>${totalNoUsers}</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>`;
    $("#meetings-body").append(markup);
}

function api_meetings() {
    spinner(true);

    $.get("./api/meetings", function(data) {
        console.log("API request: /api/meetings");
        $("#meetings-body").empty();

        let totalNoUsers = 0;
        data.forEach(function(element, i) {
            let mods = element.moderators.join(" | ");

            let creation = new Date(parseFloat(element.creation));

            let originContext = "";
            if (element.metadata['origin-context']) {
                originContext = element.metadata['origin-context'];
            }

            totalNoUsers += parseInt(element.noUsers);
            let markup = `<tr>
<td>${i + 1}</td>
<td>${element.name}</td>
<td>${element.noUsers}</td>
<td>${mods}</td>
<td>${element.metadata['origin-server']}</td>
<td>${originContext}</td>
<td>${creation.toLocaleString()}</td>
</tr>`;
            $("#meetings-body").append(markup);
            if (i == data.length - 1){
                addTotalRow(totalNoUsers);
            }
        });
        $("#text-last-refresh").html(new Date().toLocaleString());
        spinner(false);
    });
}

function api_server() {
        console.log("API request: /api/server");
        $.get("./api/server", function(data) {
            $("#text-server").html(data.server);
            $("#text-version").html(data.version);
        });
}


$(function() {
    api_server();
    api_meetings();
    setInterval(api_meetings, 15 * 1000);
});