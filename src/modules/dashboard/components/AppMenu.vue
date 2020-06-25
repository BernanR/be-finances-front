<template>
  <!----
 <v-navigation-drawer
    :value="value"
    :color="color"
    @input="$emit('input', $event)"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    :right="right"
    :permanent="permanent"
    :src="bg"
    absolute
    dark
  > --->

  <v-navigation-drawer
    :value="value"
    :color="color"
    @input="$emit('input', $event)"
    :mini-variant="miniVariant"
    :right="right"
    temporary
    absolute
    dark
  >
    <v-list>
      <v-list-item
        v-if="miniVariant"
        @click.stop="miniVariant = !miniVariant"
      >
        <v-list-item-action>
          <v-icon>chevron_right</v-icon>
        </v-list-item-action>
      </v-list-item>

      <v-list-item
        avatar
        tag="div"
      >
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{user.name}}</v-list-item-title>
          <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            color="pink"
            @click.stop="miniVariant = !miniVariant"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider light></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.url"
        :exact="item.exact"
        @click.stop="$emit('input',false)"
        link
        dense
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import AuthService from '@/modules/auth/services/auth-services'

export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data: () => ({
    items: [
      { title: 'Home', icon: 'dashboard', url: '/dashboard', exact: true },
      { title: 'Outher', icon: 'dashboard', url: '/outher', exact: true }
    ],
    miniVariant: false
  }),
  async created () {
    this.user = await AuthService.user()
  }
}
</script>
