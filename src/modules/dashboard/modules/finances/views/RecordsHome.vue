<template>
  <div>
    <h1>Lancamentos</h1>

    <records-list />
  </div>
</template>

<script>
import RecordsList from './../components/RecordList.vue'

export default {
  name: 'RecordsHome',
  components: {
    RecordsList
  }
}
</script>
