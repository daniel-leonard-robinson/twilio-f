var qs = require('qs');
var twilio = require('twilio');
var util = require('util');

/**
* Your function call
* @param {string} forwardTo
* @param {string} forwardFrom
* @param {string} forwardType
* @param {string} message
* @returns {any}
*/
module.exports = (forwardTo = '707'
                , forwardFrom = '808'
                , forwardType = 'call'
                , message = 'Ahoy there!'
                , context, callback) => {
    console.log('Welcome to the Twilio forwarder')
    console.log(context)
    var params = context.params
    // var formData = params.buffer && params.buffer.toString() || '';
    // var formParams = formData && formData.length && qs.parse(formData) || {};
    // var options = Object.assign({}, params.kwargs, formParams);

    // console.log(options)

    // var toNumber =  options.forward_to || options['ForwardTo'] /*|| params.args[1]*/ || 'bad-number';
    // var fromNumber =  options.From || options['From'] /*|| params.args[2]*/ || '';

    // var messageBody = options.Body || options.body /*|| params.args[3]*/ || '';
    // var forwardType = options.type || options.Type /*|| params.args[0]*/ || '';

    var toNumber =  params.forwardTo || 'bad-number';
    var fromNumber =  params.forwardFrom || 'bad-number';

    var messageBody = params.message || 'bad-message';
    var forwardType = params.forwardType || 'bad-type';

    var response = new twilio.TwimlResponse();

    console.log('var response = new twilio.TwimlResponse();')

    if (forwardType.toLowerCase() === 'call') {
        response.dial(toNumber);
    } else {
        var message = util.format("%s: %s", fromNumber, messageBody);

        response.message(message, {
            to: toNumber
        });
    }

    var res = response.toString()
    var buf = Buffer.alloc(res.length)
    buf.write(res)
    callback(null, buf);
    // callback(null, response)
};
