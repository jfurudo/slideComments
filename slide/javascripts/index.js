var socket = io.connect(location.protocol + "//" + location.host);
$().ready(function () {
    socket.on("push_room", function (room) {
        console.log(room);
        appendRoom(room);
    });
    var appendRoom = function (room) {
        $("ul#roomList").append("<li><a href=room?id=" + room.id + ">Room-" + (room.id + 1) + "</a></li>");;
    };
});
