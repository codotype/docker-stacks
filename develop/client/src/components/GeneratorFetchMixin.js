export default {
  computed: {
    loading() {
      return this.$store.getters['generator/fetching']
    },
    selectedModel () {
      return this.$store.getters['generator/collection'][0]
    }
  }
}


