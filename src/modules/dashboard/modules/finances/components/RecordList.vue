<template>
  <v-list
    two-line
    subheader
  >
    <template v-for="(recordsList, date, index) in mappedRecords">
      <v-subheader :key="date">{{ date }}</v-subheader>
      <records-list-item
        v-for="record in recordsList"
        :key="record.id"
        :record="record"
      />
      <v-divider
        :key="`${date}-${index}`"
        v-if="showDivider(index,mappedRecords)"
      ></v-divider>
    </template>
  </v-list>
</template>

<script>

import moment from 'moment'
import { groupBy } from '@/utils'
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
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dataKey) => {
        return moment(record[dataKey]).format('DD/MM/YYYY')
      })
    }
  },
  async created () {
    this.records = await RecordsService.records()
    console.log('Records: ', this.records)
    console.log('Mapped Records: ', this.mappedRecords)
  },
  methods: {
    showDivider (index, object) {
      return index < Object.keys(object).length - 1
    }
  }
}
</script>
