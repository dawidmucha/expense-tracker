<script setup>
import { setDoc, getDoc, addDoc, doc, collection } from 'firebase/firestore'
import db from '@/main'
import { getAuth } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid'

const onNewShopAdd = async (e) => {
	const shopName = e.target.shop.value
	e.target.shop.value = ''
	const userId = getAuth()?.currentUser.uid
	const id = uuidv4()

	try {
		const newReceipt = {
			id: id,
			userId: userId,
			items: [],
			shop: shopName,
			createdAt: Date.now()
		}

		await setDoc(doc(db, 'receipts', id), newReceipt)
	} catch (e) { console.error(e) }
}
</script>

<template>
	<form @submit.prevent="(e) => onNewShopAdd(e)">
		<label for="shop" />
		<input type="text" name="shop" id="shop" />

		<input type="submit" value="add receipt" />
	</form>
</template>