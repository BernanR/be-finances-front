<template>

  <v-speed-dial
    v-model="fab"
    fixed
    bottom
    right
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon v-if="fab">add</v-icon>
        <v-icon v-else>close</v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="green"
      title="Nova Receita"
      @click="addRecord('debit')"
    >
      <v-icon>
        add
      </v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="red"
      title="Nova Despesa"
      @click="addRecord('credit')"
    >
      <v-icon>remove</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'AppFloatingButton',
  data: () => ({
    fab: false
  }),
  methods: {
    addRecord (type) {
      this.$router.push({
        name: 'recordsAdd',
        query: { type }
      })
    }
  }
}
</script>
