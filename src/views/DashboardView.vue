<script>
import { getAuth } from 'firebase/auth'
import LogoutForm from '@/components/LogoutForm.vue'

export default {
  name: 'DashboardView',
  components: {
    LogoutForm
  },
  data() {
    return {
      currentUser: getAuth().currentUser
    }
  }
}
</script>

<template>
  <div>
    <h1>This is an dashboard page</h1>
    <LogoutForm v-if="currentUser !== null" />
  </div>
</template>