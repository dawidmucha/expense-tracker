<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LogoutForm from '@/components/LogoutForm.vue'
import ReceiptList from '@/components/ReceiptList.vue'
import NewReceiptForm from '@/components/NewReceiptForm.vue'
import { ref } from 'vue'

const isLoggedIn = ref(false) 

const auth = getAuth()
onAuthStateChanged(auth, user => {
  if(user) {
    console.log('welcome', user)
    isLoggedIn.value = true;
  } else {
    this.$router.push('/')
  }
})
</script>

<template>
  <div>
    <h1>This is an dashboard page</h1>
    <ReceiptList />
    <NewReceiptForm />
    <LogoutForm v-if="isLoggedIn" />
  </div>
</template>