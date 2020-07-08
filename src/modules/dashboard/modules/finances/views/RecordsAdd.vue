<template>
  <v-container text-sm-center>
    <v-layout
      row
      wrap
    >
      <v-flex
        lg12
        sm6
        md4
        lg4
      >
        <p>Amout</p>
      </v-flex>
      <v-flex
        lg12
        sm6
        md8
        lg8
      >
        <v-card>
          <v-card-text>
            <v-form>
              <v-select
                name="account"
                label="Conta"
                prepend-icon="account_balance"
              ></v-select>
              <v-select
                name="category"
                label="Categoria"
                prepend-icon="class"
              ></v-select>
              <v-text-field
                name="description"
                label="Descrição"
                prepend-icon="description"
                type="text"
              ></v-text-field>
              <v-text-field
                name="tags"
                label="Tags (Separadas por vírgula)"
                prepend-icon="label"
                type="text"
              ></v-text-field>
              <v-text-field
                name="note"
                label="Observação"
                prepend-icon="note"
                type="text"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { decimal, minLength, required } from 'vuelidate/lib/validators'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'RecordsAdd',
  data () {
    return {
      record: {
        type: this.$route.query.type.toUpperCase(),
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
        accoundId: '',
        categoryId: '',
        description: '',
        tags: '',
        note: ''
      }
    }
  },
  validations: {
    rercord: {
      type: { required },
      amount: { required, decimal, different: value => value !== 0 },
      date: { required },
      accoundId: { required },
      categoryId: { required },
      description: { required, minLength: minLength(6) }
    }
  },
  created () {
    this.changeTitle(this.$route.query.type)
  },
  beforeRouteUpdate (to, from, next) {
    const { type } = to.query
    this.changeTitle(type)
    this.record.type = type.toUpperCase()
    next()
  },
  methods: {
    ...mapActions(['setTitle']),
    changeTitle (recordType) {
      let title
      switch (recordType) {
        case 'credit':
          title = 'Nova Receita'
          break
        case 'debit':
          title = 'Nova Despesa'
          break
        default:
          title = 'Novo Lançamento'
      }
      this.setTitle({ title })
    },
    log () {
      console.log('Form :', this.record)
    }
  }
}
</script>