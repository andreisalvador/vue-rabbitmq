<template>
  <div class="exchange">
    <p>Name: {{ name }}</p>
    <p>Type: {{ type }}</p>
    <p>Routing Key: {{ routingKey }}</p>
    <button v-if="type !== '' && name !== ''" @click="startAddQueue">Start add queues</button>
  </div>
</template>

<script>

export default {
  name: "Exchange", 
  props: {
    name: String,
    type: String,
    routingKey: String,    
    message: String
  },
  data() {
    return {
      bindedQueues: [],
      options: {
        durable: false
      }
    };
  },
  methods: {
    startAddQueue() {
        this.$emit('startAddQueue', this);
    }
  }
};
</script>

<style>
</style>