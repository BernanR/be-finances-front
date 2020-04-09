<template>
  <v-container fill-height >
    <v-layout justify-center align-center>

      <v-flex xs12 sm6 md4 xl3>
        <v-card class="elevation-1">

          <v-toolbar color="primary" dark >
              <v-toolbar-title>{{ texts.toobar }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
               <v-text-field
               v-if="!isLogin"
                prepend-icon="person"
                name="name"
                label="Nome"
                type="text"
                :error-messages="nameErros"
                :success="$v.user.name.$invalid"
                v-model.trim="$v.user.name.$model"
              ></v-text-field>

              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="email"
                :error-messages="emailErrors"
                :success="$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Senha"
                type="password"
                :error-messages="passwordErros"
                :success="$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              ></v-text-field>
            </v-form>
            <v-btn
              block
              depressed
              @click="isLogin = !isLogin"
            >
              {{ texts.button }}
            </v-btn>

          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              color="primary"
              large
              @click="submit"
            >{{ texts.toobar }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

import { required, email, minLength } from 'vuelidate/lib/validators'
import AuthService from './../services/auth-services'

export default {
  name: 'Login',
  data: () => ({
    isLogin: true,
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),
  validations () {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(4)
        }
      }
    }

    if (this.isLogin) { return validations }

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(10)
        }
      }
    }
  },
  computed: {
    texts () {
      return this.isLogin
        ? { toobar: 'Entrar', button: 'Criar Conta' }
        : { toobar: 'Criar conta', button: 'Já tenho uma Conta' }
    },
    nameErros () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) { return errors }
      !name.required && errors.push('Nome é obrigatória!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('Email é obrigatório!')
      !email.email && errors.push('Insira um email válido!')

      return errors
    },
    passwordErros () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Senha é obrigatória!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)

      return errors
    }
  },
  methods: {
    async submit () {
      const authData = this.isLogin
        ? await AuthService.login(this.user)
        : await AuthService.signup(this.user)
      console.log('authData: ', authData)
    }
  }
}
</script>
