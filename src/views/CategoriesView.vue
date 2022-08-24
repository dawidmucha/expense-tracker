<script setup>
import CategoriesList from '@/components/CategoriesList.vue'
import { collection, doc, getDoc, setDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
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
		<CategoriesList />
  </div>
</template>
