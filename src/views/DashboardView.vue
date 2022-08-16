<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LogoutForm from '@/components/LogoutForm.vue'
import ReceiptList from '@/components/ReceiptList.vue'
import NewReceiptForm from '@/components/NewReceiptForm.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pushWithQuery = (name, query) => {
	router.push({
		name: name,
		query: {
			...route[query]
		}
	})
} 

const isLoggedIn = ref(false) 

const auth = getAuth()
onAuthStateChanged(auth, user => {
  if(user) {
    isLoggedIn.value = true;
  } else {
    pushWithQuery('home', '/')
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