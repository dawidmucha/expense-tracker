<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where, deleteDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import dateFormat from 'dateformat'
import { mapState } from 'vuex'
import { ref, onMounted } from 'vue'
import Receipt from './Receipt.vue'

const receipts = ref([])

onAuthStateChanged(getAuth(), async (user) => {
	if(user) {
		const q = query(collection(db, 'receipts'), where('userId', '==', user.uid))
		onSnapshot(q, querySnapshot => {
			const data = []
			querySnapshot.forEach(datum => data.push(datum.data()))
			receipts.value = data.sort((a, b) => b.createdAt - a.createdAt)
		})
	}
})

const onRemoveReceipt = (receiptId) => {
	deleteDoc(doc(db, 'receipts', receiptId))
}
</script>

<template>
	<div class="receiptList">
		<div :key="receipt.createdAt" v-for="receipt in receipts">
			<Receipt :data='receipt' @onRemoveReceipt="(receiptId) => onRemoveReceipt(receiptId)" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.receiptList {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>