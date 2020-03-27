const rabbitProcessor = require('./../RabbitConnector.js')

const publisherBase = (message, queues = [], exchange = {}) => {
    rabbitProcessor((channel) => {
        if (exchange) {
            channel.assertExchange(exchange.name, exchange.type, exchange.options)

            queues.forEach(queue => {
                channel.assertQueue(queue.name, queue.options)
                channel.bindQueue(queue.name, exchange.name, queue.routingKey)
            })

            resultLog(channel.publish(exchange.name, exchange.routingKey, Buffer.from(message)))

        } else {
            queues.forEach(queue => {
                channel.assertQueue(queue.name, queue.options)
                resultLog(channel.sendToQueue(queue.name, Buffer.from(message)))
            })
        }
    })
}

const resultLog = (success) => {
    if (success)
        console.log(`Message sent with sucessfull.`)
    else
        console.error('Message didnt send');
}

module.exports = publisherBase