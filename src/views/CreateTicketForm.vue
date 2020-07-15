<template>
	<form>
		<h1>Создать обращение</h1>
		<v-text-field
			v-model="title"
			label="Тема"
			required
			:error-messages="titleErrors"
			@input="$v.title.$touch()"
			@blur="$v.title.$touch()"></v-text-field>
			
		<v-textarea
			v-model="content"
			required
			outlined
			:error-messages="contentErrors"
			@input="$v.content.$touch()"
			@blur="$v.content.$touch()"
			label="Описание"
			name="input-7-4"></v-textarea>
		<v-btn class="mr-4" @click="submit">Создать</v-btn>
	</form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength} from 'vuelidate/lib/validators'

export default {
	mixins: [validationMixin],

	name: "CreateTicketForm",

	validations: {
		title: { required, maxLength: maxLength(255) },
		content: { required, maxLength: maxLength(2555) },
	},

	data: () => ({
		title: "",
		content: ""
	}),

	computed:{
		titleErrors () {
			const errors = []
			if (!this.$v.title.$dirty) return errors
			!this.$v.title.maxLength && errors.push('Title must be at most 255 characters long')
			!this.$v.title.required && errors.push('Title is required.')
			return errors
		},

		contentErrors () {
			const errors = []
			if (!this.$v.content.$dirty) return errors
			!this.$v.content.maxLength && errors.push('content must be at most 2555 characters long')
			!this.$v.content.required && errors.push('content is required.')
			return errors
		},
	},
	methods:{
		submit () {
			this.$v.$touch()
			if (!this.$v.$invalid){
				this.$http.post("tickets",{
					title: this.title,
					content: this.content
				}).then((response)=>{
					this.title = "";
					this.content = "";
					this.$router.push({name:"ticket-info",params:{ticket_id: response.data.data.id}})
				});
			}
		},
	}
}
</script>

<style scoped>

</style>