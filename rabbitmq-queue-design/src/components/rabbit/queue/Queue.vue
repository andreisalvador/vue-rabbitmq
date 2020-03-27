<template>
  <div>
    <p>Queue name: {{ name }}</p>
    <p>Queue routing key: {{ routingKey }}</p>
    <div class="messages">
        <div v-for="(item, index) in messages" :key="index">
            <Message :queueName="name" :messageContent="item.content" />
        </div>
    </div>
  </div>
</template>

<script>
import Message from './../message/Message.vue'
export default {
  name: "Queue",
  components:{
      Message
  },
  props: {
    name: String,
    routingKey: String,
    messages: Array
  } 
};
</script>

<style>
</style>