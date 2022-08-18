<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { ref } from 'vue'

const uid = ref(undefined)
const errMsg = ref(null)

onAuthStateChanged(getAuth(), async (user) => {
	if(user && (uid.value === undefined)) uid.value = getAuth().currentUser.uid
})

const onNewCategoryFormSubmit = async (e) => {
	if(uid.value === undefined) return undefined
	const categoryName = e.target.categoryName.value
	let newData = {}

	const docRef = doc(db, 'categories', uid.value)
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()) {
		newData = {
			...docSnap.data(),
			[categoryName]: []
		}
	}

	setDoc(docRef, newData)
}
</script>

<template>
	<form @submit.prevent="(e) => onNewCategoryFormSubmit(e)">
		<input type="text" id="categoryName" name="categoryName">
		<input type="submit" value="+" /> {{ errMsg }}
	</form>
</template>