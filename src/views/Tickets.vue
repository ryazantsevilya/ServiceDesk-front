<template>
  <div>
    <h1>Все обращения</h1>
    <table-tickets></table-tickets>
  </div>
</template>

<script>
import TableTickets from "../components/TableTickets";
export default {
  name: 'Tickets',

  components: {
    TableTickets
  },

  created() {

  },
  
  data: () => ({

  }),

  methods:{
    
  }
};
</script>