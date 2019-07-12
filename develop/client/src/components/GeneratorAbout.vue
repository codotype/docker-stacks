<template>
  <Loading v-if="loading"/>
  <GeneratorStart :model="selectedModel" v-else-if="selectedModel.id" buildLink="/build" />
</template>

<script>
import Loading from '@codotype/ui/src/components/Loading'
import GeneratorStart from '@codotype/ui/src/modules/generator/components/GeneratorStart'
import GeneratorFetchMixin from './GeneratorFetchMixin'

export default {
  name: 'GeneratorAbout',
  mixins: [GeneratorFetchMixin],
  components: {
    Loading,
    GeneratorStart
  },
  metaInfo () {
    if (this.loading) {
      return {
        title: 'Loading...'
      }
    }
    return {
      title: this.selectedModel.label
    }
  }
}
</script>
