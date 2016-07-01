// http://en.sat24.com/image?type=infraPolair&region=dz&timestamp=201606291115
// http://en.sat24.com/image?type=visual&region=dz&timestamp=201606291315

var http = require('http'),
    fs = require('fs'),
    options_vis,
    options_infra




function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = Math.floor(min / 15) * 15
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + month + day + hour + min;
}

    options_vis = {
        host: 'en.sat24.com',
        port: 80,
        path: ''
    }

    options_infra = {
        host: 'en.sat24.com',
        port: 80,
        path: ''
    }

setInterval(function() {

    options_infra.path='/image?type=infraPolair&region=dz&timestamp=' + getDateTime()
    options_vis.path='/image?type=visual&region=dz&timestamp=' + getDateTime()
    
    var request = http.get(options_vis, function(res) {
        var imagedata = ''
        res.setEncoding('binary')

        res.on('data', function(chunk) {
            imagedata += chunk
        })

        res.on('end', function() {
            fs.writeFile('visual/visual' + getDateTime() + '.jpg', imagedata, 'binary', function(err) {
                if (err) throw err
                console.log('visual' + getDateTime() + '.jpg file saved.')
            })
        })

    })

    var request = http.get(options_infra, function(res) {
        var imagedata = ''
        res.setEncoding('binary')

        res.on('data', function(chunk) {
            imagedata += chunk
        })

        res.on('end', function() {
            fs.writeFile('infrared/infrared' + getDateTime() + '.jpg', imagedata, 'binary', function(err) {
                if (err) throw err
                console.log('infrared' + getDateTime() + '.jpg file saved.')
            })
        })

    })

},  15*60 * 1000);
