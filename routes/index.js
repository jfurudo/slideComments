
/*
 * GET home page.
 */



exports.index = function(req, res){
    var presentations = require('./room').presentations;
    res.render('index', { title: 'Slide Comments', presentations: presentations });
};

exports.sample = function(req, res) {
    res.render('room', { title: 'Presentation', iframeUri: {uri: "https://docs.google.com/presentation/d/1GUuTPyv2BLekAqFJb1SYXPIr0NN4aY83Hv_jHU-JZ5g/embed?start=false&loop=false&delayms=3000"}});
};
