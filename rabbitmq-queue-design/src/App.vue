<template>
  <div id="app">
    <button @click="clearAll">Clear all</button>
    <button v-if="queues.length > 0" @click="consumeQueues">Consume Queues</button>
    <button @click="sendMessage">Send message</button>
    <label for="exchange-type">Exchange name</label>
    <input required type="text" name="exchange-name" id="exchange-name" v-model="exchange.name" />
    <label for="exchange-type">Exchange type</label>
    <input required type="text" name="exchange-type" id="exchange-type" v-model="exchange.type" />
    <label for="exchange-routingKey">Exchange rounting key</label>
    <input
      type="text"
      name="exchange-routingKey"
      id="exchange-routingKey"
      v-model="exchange.routingKey"
    />
    <label for="exchange-message">Message</label>
    <textarea
      name="exchange-message"
      id="exchange-message"
      maxlength="140"
      v-model="exchange.message"
    />
    <br />
    <Exchange
      :type="exchange.type"
      :routingKey="exchange.routingKey"
      :name="exchange.name"
      :message="exchange.message"
      @startAddQueue="startAddQueue($event)"
    />
    <br />
    <div v-if="showAddQueueForm">
      <label for="queue-type">Queue name</label>
      <input type="text" name="queue-name" id="queue-name" v-model="queue.name" />
      <label for="queue-routingKey">Queue rounting key</label>
      <input type="text" name="queue-routingKey" id="queue-routingKey" v-model="queue.routingKey" />
      <button @click="addQueue(queue)">Add Queue</button>
    </div>
    <br />
    <div v-for="(item, index) in queues" :key="index">
      <Queue :name="item.name" :routingKey="item.routingKey" :messages="item.messages" />
    </div>
  </div>
</template>

<script>
import Exchange from "./components/rabbit/exchange/Exchange.vue";
import Queue from "./components/rabbit/queue/Queue.vue";
import Publisher from "./rabbitmq-connections/publisher/PublisherBase";
import Subscriber from "./rabbitmq-connections/subcriber/SubscriberBase";

export default {
  name: "App",
  components: {
    Exchange,
    Queue
  },
  data() {
    return {
      exchange: {
        name: "",
        type: "",
        routingKey: "",
        options: {
          durable: false
        },
        message: ""
      },
      queue: {
        name: "",
        routingKey: ""
      },
      queues: [],
      showAddQueueForm: false
    };
  },
  methods: {
    startAddQueue() {
      this.showAddQueueForm = true;
    },
    addQueue(queue) {
      this.queues.push({
        name: queue.name,
        routingKey: queue.routingKey,
        options: {
          durable: true
        },
        consumeOptions: {
          noAck: true
        },
        messages: []
      });
      this.queue.name = "";
      this.queue.routingKey = "";
    },
    clearAll() {
      this.exchange = {
        name: "",
        type: "",
        routingKey: "",
        message: ""
      };
      this.queues = [];
    },
    consumeQueues() {
      Subscriber(this.queues);
    },
    sendMessage() {      
      Publisher(this.exchange.message, this.queues, this.exchange);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
