<template>
  <div>
    <TotalBalance class="mb-2" />
    <ToolbarByMonth
      class="mb-2"
      format="MM-YYYY"
      @monthChange="changeMonth"
      :color="toolbarColor"
      :month="$route.query.month"
    />
    <v-card>
      <v-card-text
        v-if="mappedRecordsLenght === 0"
        class="text-lg-center"
      >
        <v-icon
          size="100"
          color="grey"
        >assignment</v-icon>
        <p class="font-weight-light grey--text subheading">Nehum lançamento para o período</p>
      </v-card-text>
      <v-list
        two-line
        subheader
        v-else
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
import TotalBalance from './TotalBalance.vue'

export default {
  name: 'RecordList',
  components: {
    RecordsListItem,
    ToolbarByMonth,
    TotalBalance
  },
  mixins: [amountColorMixin, formatCurrencyMixin],
  data: () => ({
    records: []
  }),
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dataKey) => {
        return moment(record[dataKey]).format('DD/MM/YYYY')
      })
    },
    mappedRecordsLenght () {
      return Object.keys(this.mappedRecords).length
    },
    totalAmount () {
      return this.records.reduce((sum, record) => sum + record.amount, 0)
    },
    toolbarColor () {
      return this.totalAmount < 0 ? 'error' : 'primary'
    }
  },
  methods: {
    showDivider (index, object) {
      return index < Object.keys(object).length - 1
    },
    changeMonth (month) {
      console.log('chegou aqui agora', this.$router.path)
      this.$router.push({
        path: this.$router.path,
        query: { month }
      })
      this.setRecords(month)
    },
    async setRecords (month) {
      console.log('Get Records by month: ', month)
      this.records = await RecordsService.records({ month })
    }
  }
}
</script>
