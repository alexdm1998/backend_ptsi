function getJson(req,res){
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0010543&lang=PT',
        'headers': {
            'Cookie': 'JSESSIONID=BLhJ5J1rrVNxEWqGmID_RUkY87xhqETCIgBiomRe.portal-prod02; __cfduid=da126413c1ace4f341ad4c6960a2691841614699986; ineportal=77e5d0058644ef0cf7e54ce2c23f20f4'       
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.status(200).send(response.body);
        console.log(response.body);
    });
}


module.exports = {
    getJson: getJson
};