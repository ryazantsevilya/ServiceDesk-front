<template>
  <v-alert v-model="active" dense dismissible transition="scale-transition" :type="type">
    {{text}}
  </v-alert>
</template>

<script>
export default {
  name: "Alert",

  data: ()=>({
    text: "",
    type: "error",
    active: false
  }),

  mounted() {
    this.$bus.$on("alert", (text, type) => {
      this.active = false;
      this.text = text;
      this.type = type;
      this.active = true;
    });
  }
}
</script>

<style scoped>

</style>