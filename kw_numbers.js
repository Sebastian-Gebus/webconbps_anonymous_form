const ck = require('./control_number.js');

generateKWNumbers = function(min, max, code){
    var KW = [];
    if(ck.checkCode(code)){
        for(var i = min; i <= max; i++){
            var num = String(i).padStart(8, '0')
            var ck_num = ck.calculateControlNumber(code, num)
            KW.push({'kodWydzialu': code, 'numerKsiegi': num, 'cyfraKontrolna': String(ck_num)})
        }
    }
    return KW;
}

module.exports = {generateKWNumbers}