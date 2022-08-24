<script setup>
import LoginForm from '@/components/LoginForm.vue'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
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
    <LoginForm />
  </div>
</template>
