<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, reactive } from 'vue'
import db from '@/main'
import NewCategoryForm from '@/components/NewCategoryForm.vue'
import NewSubcatForm from '@/components/NewSubcatForm.vue'

const categories = ref({})
const uid = ref(undefined)

onAuthStateChanged(getAuth(), async (user) => {
	if(user && (uid.value === undefined)) uid.value = getAuth().currentUser.uid
	console.log(uid.value)

	onSnapshot(doc(db, 'categories', uid.value), doc => {
		if(uid.value !== undefined) {
			categories.value = doc.data()
		}
	})
})
</script>

<template>
	<h2><NewCategoryForm /></h2>
	<div v-for="(category, key, index) in categories" :key="index">
		<h2>{{ key }}</h2>
		<div v-for="(subcat, index) in category" :key="index">
			<div>{{ subcat }}</div>
		</div>
		<div><NewSubcatForm :category="key" /></div>
	</div>
</template>