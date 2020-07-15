<template>
  <div>
    <div v-if="ticket">
      <h1>{{ticket.id}}</h1>
      <h1>{{ticket.title}}</h1>
      <h1>{{ticket.content}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketInfo",

  props: {
    ticketId: {
      required: true
    },
  },

  watch: {
    ticketId (newTicketID) {
      this.getTicketInfo(newTicketID);
    }
  },

  created() {
    this.getTicketInfo(this.ticketId);
  },

  data: () => ({
    ticket: null
  }),

  methods: {
    getTicketInfo (ticketId) {
      this.$http.get(`tickets/${ticketId}`).then((response)=>{
        this.ticket = response.data.data;
      }).catch(()=>{
        this.ticket = null;
      })
    }
  }
}
</script>

<style scoped>

</style>