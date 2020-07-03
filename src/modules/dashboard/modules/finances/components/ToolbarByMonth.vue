<template>
  <v-toolbar
    color="primary"
    elevation-9
  >
    <v-layout align-center>
      <v-flex xs1>
        <div class="text-xs-left">
          <v-btn
            icon
            flat
            @click="decrement"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs10>
        <v-toolbar-title class="text-center"><span> {{ currentMonht }} </span></v-toolbar-title>
      </v-flex>
      <v-flex xs1>
        <div class="text-xs-right">
          <v-btn
            icon
            flat
            @click="increment"
          >
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>

import moment from 'moment'

export default {
  name: 'ToolbarByMonth',
  props: {
    formart: String
  },
  data: () => ({
    date: moment()
  }),
  computed: {
    currentMonht () {
      console.log('moment: ', this.date)
      return this.date.format('MMMM YYYY')
    }
  },
  created () {
    this.emit()
  },
  methods: {
    emit () {
      this.$emit('monthChange', this.date.format(this.format))
    },
    decrement () {
      this.date = this.date.clone().subtract(1, 'month')
    },
    increment () {
      this.date = this.date.clone().add(1, 'month')
      this.emit()
    }
  }
}
</script>
