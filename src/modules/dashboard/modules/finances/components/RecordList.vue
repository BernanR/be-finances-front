<template>
  <div>
    <ToolbarByMonth
      class="mb-2"
      format="MM-YYYY"
      @monthChange="changeMonth"
    />
    <v-card>
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
      <v-footer class="pa-2">
        <v-flex
          text-md-right
          text-center
        >
          <h3 class="font-weight-light">
            <span>Saldo do mês:</span>
            <strong
              class="ml-5"
              :class="amountColor(totalAmount)"
            >{{ formatCurrency(totalAmount) }}</strong>
          </h3>
        </v-flex>
      </v-footer>
    </v-card>
  </div>
</template>

<script>

import moment from 'moment'
import { groupBy } from '@/utils'
import amountColorMixin from './../mixins/amount-color'
import formatCurrencyMixin from '@/mixins/format-currency'
import RecordsService from './../services/records-service'
import RecordsListItem from './RecordsListItem.vue'
import ToolbarByMonth from './ToolbarByMonth.vue'

export default {
  name: 'RecordList',
  components: {
    RecordsListItem,
    ToolbarByMonth
  },
  mixins: [
    amountColorMixin,
    formatCurrencyMixin
  ],
  data: () => ({
    records: []
  }),
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dataKey) => {
        return moment(record[dataKey]).format('DD/MM/YYYY')
      })
    },
    totalAmount () {
      return this.records.reduce((sum, record) => sum + record.amount, 0)
    }
  },
  methods: {
    showDivider (index, object) {
      return index < Object.keys(object).length - 1
    },
    changeMonth (month) {
      this.setRecords(month)
      console.log('month', month)
    },
    async setRecords (month) {
      console.log('month', month)
      this.records = await RecordsService.records({ month })
    }

  }
}
</script>
