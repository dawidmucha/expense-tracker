<script setup>
import { collection, doc, getDoc, setDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { defineProps } from 'vue'
import dateFormat from 'dateformat'
import NewReceiptItemForm from '@/components/NewReceiptItemForm.vue'

const props = defineProps(['data'])

const onReceiptItemRemove = async (index) => {
	const itemListWithoutDeleted = props.data.items.filter((item, index_) => index_ !== index)
	let newData = { items: [] }

	const docRef = doc(db, 'receipts', props.data.id)
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()) {
		newData = docSnap.data()
		newData.items = itemListWithoutDeleted
	}

	await setDoc(docRef, newData)
}
</script>

<template>
	<div class="receipt">
		<h3>{{ data.shop }} @ {{ dateFormat(props.data.createdAt, 'yyyy-mm-dd HH:MM:ss') }}</h3>
		<ul :v-if="props.data.items.length >= 1">
			<li :key="index" v-for="(receiptItem, index) in props.data.items">
				<h4>{{ receiptItem.name }} ({{ receiptItem.category }}/{{ receiptItem.subcat }})</h4>
				<div>${{ receiptItem.price }} ({{ receiptItem.units }}x{{ receiptItem.amount }}{{ receiptItem.amountType }})</div>
				<button @click="onReceiptItemRemove(index)">X</button>
			</li>
		</ul>
		<NewReceiptItemForm :receiptId="data.id" />
	</div>
</template>

<style scoped>
.receipt {
	margin: 2rem;
	background-color: #eee;
}
</style>