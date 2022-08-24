<script setup>
import RegisterForm from '@/components/RegisterForm'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
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

const auth = getAuth()
onAuthStateChanged(auth, user => {
  if(user) {
    pushWithQuery('dashboard', '/dashboard')
	}
})
</script>

<template>
  <div>
    <RegisterForm />
  </div>
</template>