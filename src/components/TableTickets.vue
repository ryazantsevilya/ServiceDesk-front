<template>
	<v-data-table :headers="headers"
			:items="tickets"
			:items-per-page="10"
			:loading="loading"
			class="elevation-1">
		<template v-slot:item="{ item }">
			<tr>
				<td v-for="el in item" :key="el.id">{{el}}</td>
				<td>
					<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
					<v-icon small @click="deleteTicket(item.id)">mdi-delete</v-icon>
				</td>
			</tr>
		</template>
	</v-data-table>
</template>

<script>
export default {
  name: "TableTickets",

  data: () => ({
    tickets: [],
    loading: false,
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Title', value: 'title' },
      { text: 'Content', value: 'content' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]
  }),
  
  mounted() {
    this.getTickets();
  },
  
  methods:{
    getTickets() {
      const {$http} = this
      this.loading = true;
      
      $http.get("tickets").then((response)=>{
        this.tickets = response.data.data;
      }).finally(()=>{
        this.loading = false;
      })
    },
    
    deleteTicket(ticketId) {
      const {$http, GetTickets} = this

      let AgreeDelete = confirm('Are you sure you want to delete this item?');
      
      if (AgreeDelete){
        this.loading = true;
        
        $http.delete(`tickets/${ticketId}`)
        .then(()=>{
          GetTickets();
        }).finally(()=>{
          this.loading = false;
        })
      }
    }
  }
}
</script>