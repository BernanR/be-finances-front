<template>
  <div>
    <app-toolbar v-model="drawer" />
    <app-menu v-model="drawer" />
  </div>
</template>

<script>
import AppMenu from './AppMenu.vue'
import AppToolbar from './AppToolbar.vue'

export default {
  name: 'AppLayout',
  components: {
    AppMenu,
    AppToolbar
  },
  data: () => ({
    drawer: false
  })
}
</script>
