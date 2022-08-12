<script>
import { setDoc, getDoc, doc } from 'firebase/firestore'
import db from '@/main'
import { getAuth } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid'

	export default {
		name: 'NewReceiptForm',
		methods: {
			async onNewShopAdd(e) {
				const shopName = e.target.shop.value
				const userId = getAuth()?.currentUser.uid

				try {
					const id = uuidv4()

					// check if there are receipts already
					const docRef = doc(db, 'receipts', `${userId}`)
					const docSnap = await getDoc(docRef)

					const newReceiptList = {
						...(docSnap.exists() && docSnap.data()), // if there are, spread them
						[id]: {
							items: [],
							shop: shopName,
							createdAt: Date.now()
						}
					}

					await setDoc(doc(db, 'receipts', `${userId}`), newReceiptList)

					this.$store.dispatch('addReceipt', newReceiptList)
				} catch (e) { console.error(e) }
			}
		}
	}
</script>

<template>
	<form @submit.prevent="(e) => onNewShopAdd(e)">
		<label for="shop" />
		<input type="text" name="shop" id="shop" />

		<input type="submit" value="add receipt" />
	</form>
</template>