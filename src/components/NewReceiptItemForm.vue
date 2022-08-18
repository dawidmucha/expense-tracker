<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps(['receiptId'])

const uid = ref(undefined)
const categories = ref({})
const currentCategory = ref({})

onAuthStateChanged(getAuth(), async (user) => {
	if(user && (uid.value === undefined)) uid.value = getAuth().currentUser.uid

	const docRef = doc(db, 'categories', uid.value)
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()) {
		categories.value = docSnap.data()
	}
})

const onNewReceiptItemFormSubmit = async (e) => {
	if(uid.value === undefined) return undefined
	let newData = { items: [] }

	const itemName = e.target.name.value
	e.target.name.value = ''

	const docRef = doc(db, 'receipts', props.receiptId)
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()) {
		newData = docSnap.data()
		newData.items.push({
			id: uuidv4(),
			name: itemName,
			price: '4.99',
			units: 1,
			amount: 1,
			amountType: 'kg',
			isDiscount: false,
			category: 'foo',
			subcat: 'bar',
		})
	}

	console.log('adding', newData)
	await setDoc(docRef, newData)
}

const getCategories = () => { // without it categories.value is a Proxy and v-for doesn't like it (why?)
	return JSON.parse(JSON.stringify(categories.value))
}

const onSelectCategoryChange = (e) => {
	console.log('current category', e.target.value)
	currentCategory.value = e.target.value
}
</script>

<template>
	<form @submit.prevent="(e) => onNewReceiptItemFormSubmit(e)">
		<div>
			<input type="text" id="name" name="name" />
			<select id="category" name="category" @change="(e) => onSelectCategoryChange(e)">
				<option disabled selected value style="display:none">[category]</option>
				<option v-for="category in Object.keys(getCategories())" :key="category" :value="category">{{ category }}</option>
			</select>
			<select id="subcat" name="subcat">
				<option disabled selected value style="display:none">[subcategory]</option>
				<option v-for="subcat in getCategories()[currentCategory]" :key="subcat" :value="category">{{ subcat }}</option>
			</select>	
		</div>
		<div>
			$<input type="number" id="price" name="price" />
			(<input type="number" id="units" name="units" />
			x<input type="number" id="amount" name="amount" />
			<input type="number" id="amountType" name="amountType" />)
			discount? <input type="checkbox" id="isDiscount" name="isDiscount" />
		</div>
		<input type="submit" value="+" />
	</form>
</template>