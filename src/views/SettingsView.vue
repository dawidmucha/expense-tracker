<script setup>
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
  if(!user) pushWithQuery('home', '/')
})
</script>

<template>
  <div>
    <h1>This is an settings page</h1>
  </div>
</template>
