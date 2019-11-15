const table = $("#add-player-table");
const addPlayerBtn = $("#add-player-button");

const row = "<tr>\n" +
    "                            <td><input type=\"text\"></td>\n" +
    "                            <td><input type=\"text\"></td>\n" +
    "                            <td><input type=\"text\"></td>\n" +
    "                            <td><input type=\"text\"></td>\n" +
    "                            <td><button type='button' class=\"btn btn-danger rm-player\">Remove Player</button></td>\n" +
    "                        </tr>";

addPlayerBtn.on('click', function() {
    table.append(row);
});

table.on('click', 'td button.rm-player', function (event) {
    event.stopPropagation();
    $(this).parent().parent().remove();
});

const typeSelector = $('#type');

