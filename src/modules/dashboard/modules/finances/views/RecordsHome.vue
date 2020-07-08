<template>
  <RecordsList />
</template>

<script>

import { mapActions } from 'vuex'
import RecordsList from './../components/RecordList.vue'

export default {
  name: 'RecordsHome',
  components: {
    RecordsList
  },
  created () {
    this.setTitle({ title: 'Lançamentos' })
  },
  methods: {
    ...mapActions(['setTitle'])
  }
}
</script>
