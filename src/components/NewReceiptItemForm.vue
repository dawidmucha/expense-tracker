<script setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue'
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps(['receiptId'])

const emit = defineEmits(['getReceiptSum'])

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

	const name = e.target.name.value
	const price = e.target.price.value
	const units = e.target.units.value
	const amount = e.target.amount.value
	const amountType = e.target.amountType.value
	const isDiscount = e.target.isDiscount.checked
	const category = e.target.category.value
	const subcat = e.target.subcat.value

	// reset all fields in a form
	e.target.name.value = e.target.price.value = e.target.units.value = e.target.amount.value = e.target.amountType.value = e.target.category.value = e.target.subcat.value = ''	
	e.target.isDiscount.checked = false

	const docRef = doc(db, 'receipts', props.receiptId)
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()) {
		newData = docSnap.data()
		newData.items.push({
			id: uuidv4(), name, price, units, amount, amountType, isDiscount, category, subcat,
		})
	}
	
	await setDoc(docRef, newData)

	emit('getReceiptSum')
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
			$<input type="number" id="price" name="price" step="any" />
			(<input type="number" id="units" name="units" step="any" />
			x<input type="number" id="amount" name="amount" step="any" />
			<input type="text" id="amountType" name="amountType" step="any" />)
			discount? <input type="checkbox" id="isDiscount" name="isDiscount" />
		</div>
		<input type="submit" value="+" />
	</form>
</template>