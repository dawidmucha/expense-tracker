<script>
import { getAuth } from 'firebase/auth'
import LogoutForm from '@/components/LogoutForm.vue'
import ReceiptList from '@/components/ReceiptList.vue'
import NewReceiptForm from '@/components/NewReceiptForm.vue'

export default {
  name: 'DashboardView',
  components: {
    LogoutForm,
    ReceiptList,
    NewReceiptForm
},
  data() {
    return {
      currentUser: getAuth().currentUser
    }
  },
  created() {
    if(!this.currentUser) this.$router.push('/') // if logged out, redirect to "/"
  }
}
</script>

<template>
  <div>
    <h1>This is an dashboard page</h1>
    <ReceiptList />
    <NewReceiptForm />
    <LogoutForm v-if="currentUser !== null" />
  </div>
</template>