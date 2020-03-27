const amqp = require('amqplib/callback_api')
const rabbitUrl = 'amqp://localhost:5671'

const rabbitProcessor = (rabbitCommand) => {    
    amqp.connect(rabbitUrl, (err, connection) => {
        if (err) throw err;
        connection.createChannel((err, channel) => {
            if (err) throw err;
            rabbitCommand(channel)
        })
        setTimeout(() => {
            connection.close();            
        }, 1000);
    })
}

module.exports = rabbitProcessor;