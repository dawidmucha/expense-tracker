<script setup>
import { collection, doc, getDoc, setDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { defineProps, ref, onMounted } from 'vue'
import dateFormat from 'dateformat'
import NewReceiptItemForm from '@/components/NewReceiptItemForm.vue'

const props = defineProps(['data'])

const receiptSum = ref(0)
const editReceipt = ref(false)

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

const getReceiptSum = () => {
	let currentSum = 0;
	props.data.items.map(item => {
		currentSum += parseFloat(item.price)
	})
	if(receiptSum.value !== currentSum) receiptSum.value = currentSum
}

const onReceiptEdit = async (e) => {
	const date = new Date(e.target.receiptDate.value)

	let newData = { shop: '', createdAt: null }

	const docRef = doc(db, 'receipts', props.data.id)
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()) {
		newData = docSnap.data()
		newData.shop = e.target.shopName.value
		newData.createdAt = date.getTime()
	}

	await setDoc(docRef, newData)

	console.log('filling up with', newData)
	editReceipt.value = false
	e.target.shopName.value = ""
	e.target.receiptDate.value = ""
}
</script>

<template>
	<div class="receipt">
		<h3 v-if="editReceipt == true">
			<form @submit.prevent="(e) => onReceiptEdit(e)">
				<input type="text" id="shopName" name="shopName" /> @
				<input type="date" id="receiptDate" name="receiptDate" />
				<input type="submit" value="&#128190;" /> <!-- floppy disk icon -->
			</form>
		</h3>
		<h3 v-else>
			{{ props.data.shop }} @ {{ dateFormat(props.data.createdAt, 'yyyy-mm-dd') }} (${{ receiptSum }}) 
			<button @click="editReceipt = true">&#x270E; <!-- pencil icon --></button>
			<button @click="$emit('onRemoveReceipt', props.data.id)">X</button>
		</h3>
		<ul :v-if="props.data.items.length >= 1">
			<li class="receiptItem" :key="index" v-for="(receiptItem, index) in props.data.items">
				<div><strong>{{ receiptItem.name }} ({{ receiptItem.category }}/{{ receiptItem.subcat }})</strong></div>
				<div>${{ receiptItem.price }} ({{ receiptItem.units }}x{{ receiptItem.amount }}{{ receiptItem.amountType }})</div>
				<button @click="onReceiptItemRemove(index)">X</button>
			</li>
		</ul>
		<NewReceiptItemForm :receiptId="data.id" :getReceiptSum="getReceiptSum()" />
	</div>
</template>

<style lang="scss" scoped>
.receipt {
	margin: 1rem;
	background-color: #eee;
	width: 30rem;

	.receiptItem {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 0.5rem 0;

		& > * {
			margin: 0 0.3rem;
		}
	}
}
</style>