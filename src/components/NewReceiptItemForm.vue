<script setup>
import { defineProps } from 'vue'
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { ref } from 'vue'

const props = defineProps(['receiptId'])

const uid = ref(undefined)

onAuthStateChanged(getAuth(), async (user) => {
	if(user && (uid.value === undefined)) uid.value = getAuth().currentUser.uid
})

const onNewReceiptItemFormSubmit = async (e) => {
	if(uid.value === undefined) return undefined

	const itemName = e.target.itemName.value
	e.target.itemName.value = ''

	const docRef = doc(db, 'receipts', uid.value)
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()) {
		const data = docSnap.data()
		const newData = data
		for(const [key, value] of Object.entries(data)) {
			newData[key] = value
			if(key === props.receiptId) {
				newData[key].items = [...value.items, itemName]
			}
		}

		setDoc(docRef, newData)
	}
}
</script>

<template>
	<form @submit.prevent="(e) => onNewReceiptItemFormSubmit(e)">
		<input type="text" id="itemName" name="itemName" />
		<input type="submit" value="+" />
	</form>
	{{ receiptId }}
</template>