<template>
  <div >
      <p>From queue: {{ queueName }}</p>
      <p>Message: {{ messageContent }}</p>
  </div>
</template>
    
<script>
export default {
    name: "Message",
    props: {
        queueName: String,
        messageContent: String
    }
}
</script>

<style>
.queue{
    height: 100%;
    width: 100%;
    border-radius: 3%;
    background-color: lightblue;
    border-color: black;
    border: 1px;
}
</style>