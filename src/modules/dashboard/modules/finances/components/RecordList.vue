<template>
  <v-list two-line>
    <records-list-item
      v-for="record in records"
      :key="record.id"
      :record="record"
    />
  </v-list>
</template>

<script>

import RecordsListItem from './RecordsListItem.vue'
import RecordsService from './../services/records-service'

export default {
  name: 'RecordList',
  components: {
    RecordsListItem
  },
  data: () => ({
    records: []
  }),
  async created () {
    this.records = await RecordsService.records()
    console.log('records:', this.records)
  }
}
</script>
