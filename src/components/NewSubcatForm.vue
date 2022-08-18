<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { ref, defineProps } from 'vue'

const uid = ref(undefined)
const errMsg = ref(null)

const props = defineProps(["category"])

onAuthStateChanged(getAuth(), async (user) => {
	if(user && (uid.value === undefined)) uid.value = getAuth().currentUser.uid
})

const onNewSubcatFormSubmit = async (e) => {
	if(uid.value === undefined) return undefined
	const subcatName = e.target.subcatName.value
	e.target.subcatName.value = ''
	let newData = {}

	const docRef = doc(db, 'categories', uid.value)
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()) {
		newData = { ...docSnap.data() }
		const categoryName = props.category
		newData[categoryName].push(subcatName)
	}

	setDoc(docRef, newData)
}
</script>

<template>
	<form @submit.prevent="(e) => onNewSubcatFormSubmit(e)">
		<input type="text" id="subcatName" name="subcatName">
		<input type="submit" value="+" /> {{ errMsg }}
	</form>
</template>