var socket = io.connect(location.protocol + "//" + location.host);
$().ready(function () {
    var width = $(document).width();

    var createCommentConsole = function () {
        var $container = $("<div class='console container col-sm-offset-1 col-sm-8' />"),
            $row = $("<div class='row' />"),
            $form = $("<form class='form-inline' />"),
            $formGroup = $("<div class='form-group' />");
        

        $formGroup.append("<input id='poster' class='form-control' type='text' value='' placeholder='Name' />");
        $formGroup.append("<input id='color' class='form-control' type='text' value='black' placeholder='Color' />");
        $formGroup.append("<input id='inputComment' class='form-control' type='text' placeholder='Comment' />");
        $formGroup.append("<input id='submitComment' class='form-control btn btn-default' type='button' value='Submit' />");
        $formGroup.append("<span>Comment</span><input id='toggleDisplayComments' class='form-control' type='checkbox' checked />");
        $container.append($row);
        $row.append($form);
        $form.append($formGroup);
        $('body').append($container);
    };
    createCommentConsole();

    var createCommentLogger = function () {
        var $loggerContainer = $("<div id='loggerContainer' />"),
            $loggerHeader = $("<div id='loggerHeader'><span>Comments</span><span id='minimizeLogger' class='glyphicon glyphicon-minus'></span></div>"),
            $loggerBody = $("<div id='loggerBody' />"),
            $logger = $("<textarea id='logger' disabled />");
        $loggerContainer.append([$loggerHeader, $loggerBody]);
        $loggerBody.append($logger);
        $('body').append($loggerContainer);
    };
    createCommentLogger();
    $("div#loggerContainer").draggable();

    $("#submitComment").click(function () {
        var comment = {
            poster: $("#poster").val() || "Unknown",
            text: $("#inputComment").val(),
            style: {color: $("#color").val()},
            page: location.hash
        };
        socket.emit('comment', comment);

        $("#inputComment").val("");
        // $("#inputComment").focus();
    });

    $("#toggleDisplayComments").click(function () {
        if ($("#" + this.id + ':checked').val() === 'on') {
            // show comments
            $('body').removeClass("hideComments");
        } else {
            // hide comments
            $('body').addClass("hideComments");
        }
    });

    $("#minimizeLogger").click(function () {
        $("#loggerContainer").toggleClass("minimize");
    });

    socket.on('comment', function (comment) {
        var text = comment.text,
            style = comment.style,
            poster = comment.poster,
            $comment = $("<p class='comment'>" + text + "</p>");
        style.top = "100px";
        $('#slide').append($comment);
        $('#logger').val($('#logger').val() + comment.poster + " : " + comment.text + '\n');
        $comment.css(comment.style);
        // $comment.addClass("mine");
        setTimeout(function () {
            $comment.css({right: width + $comment.width()});
        }, 200);
    });
});
