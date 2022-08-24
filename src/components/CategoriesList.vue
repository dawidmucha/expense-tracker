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
			categories.value = Object.keys(doc.data()).sort().reduce(
				(obj, key) => {
					obj[key] = doc.data()[key]
					return obj
				},
				{}
			)
		}
	})
})

const onRemoveCategory = (name) => {
	let newData = {...categories.value}
	delete newData[name]

	const docRef = doc(db, 'categories', uid.value)
	setDoc(docRef, newData)
}

const onRemoveSubcat = (categoryName, subcat) => {
	let newData = {...categories.value}
	console.log(categoryName, subcat)
	newData[categoryName] = newData[categoryName].filter(subcat_ => subcat_ != subcat)

	const docRef = doc(db, 'categories', uid.value)
	setDoc(docRef, newData)
}
</script>

<template>
	<h2><NewCategoryForm /></h2>
	<div v-for="(category, categoryName, index) in categories" :key="index">
		<h2>{{ categoryName }} <button @click="onRemoveCategory(categoryName)">X</button></h2>
		<div v-for="(subcat, index) in category" :key="index">
			<div>{{ subcat }} <button @click="onRemoveSubcat(categoryName, subcat)">x</button></div>
		</div>
		<div><NewSubcatForm :category="categoryName" /></div>
	</div>
</template>