<template>
  <v-card :color="color">
    <v-card-title>
      <v-spacer></v-spacer>
      <h3 class="displa-2 font-weight-light pt-3">R$ 500,00</h3>
    </v-card-title>
    <v-card-text>
      <v-layout
        row
        wrap
        justify-end
      >

        <v-flex
          v-for="btn in buttons"
          :key="btn"
          xs4
          pa-1
        >
          <v-btn
            :color="color"
            class="headline"
          >{{ btn }}</v-btn>
        </v-flex>

        <v-flex
          xs4
          pa-1
        >
          <v-btn icon>
            <v-icon>backspace</v-icon>
          </v-btn>
        </v-flex>

      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'NumericDisplay',
  props: {
    color: String
  },
  data: () => ({
    buttons: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  })
}
</script>
