var presentations = [],
    sockets = require('../app.js');

exports.create = function(req, res){
    console.log(sockets.sockets);
    var presentation = {uri: req.body.iframe_uri},
        id = 0;
    presentations.push(presentation);
    id = presentations.length - 1;
    sockets.sockets.emit('push_room', {id: id, presentation: presentation});
    res.redirect('/room?id=' + id);
};

exports.view = function(req, res){
    var id = Number(req.query.id);
    if (presentations[id] === undefined)
        res.send("Room not find.");
    res.render('room', { title: 'Presentation', iframeUri: presentations[id]});
};

exports.presentations = presentations;
