<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, reactive } from 'vue'
import db from '@/main'

const categories = ref({})
const uid = ref(undefined)

onAuthStateChanged(getAuth(), async (user) => {
	if(user && (uid.value === undefined)) uid.value = getAuth().currentUser.uid
})

// onSnapshot(doc(db, 'categories', uid.value), doc => {
onSnapshot(doc(db, 'categories', 'N07p675pXnfgsjyi02In'), doc => {
	categories.value = doc.data()
})
</script>

<template>
	<div v-for="(category, index) in categories" :key="index">
		<h2>{{ index }}</h2>
		<div v-for="(subcat, index) in category" :key="index">
			<div>{{ subcat }}</div> 
		</div>
	</div>
</template>