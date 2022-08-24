<script setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue'
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps(['receiptId', 'editIndex'])

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
		if(props.editIndex) { // if editing an object
			newData.items[props.editIndex] = {
				id: uuidv4(), name, price, units, amount, amountType, isDiscount, category, subcat,
			}
		} else { // if adding a new object
			newData.items.push({
				id: uuidv4(), name, price, units, amount, amountType, isDiscount, category, subcat,
			})
		}
	}
	
	await setDoc(docRef, newData)
	props.editIndex ? emit("finishEditing") : ''
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
	<form @submit.prevent="(e) => onNewReceiptItemFormSubmit(e)" class="newItemForm">
		<div>
			<label for="name">item name:</label>
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
		<div class="newItemGrid">
			<label for="price">price</label>
			<label for="units">units</label>
			<label for="amount">volume</label>

			<div>
				$<input type="number" id="price" name="price" step="any" />
			</div>
			<div>
				(<input type="number" id="units" name="units" step="any" />
			</div>
			<div>
				x<input class="volumeInput" type="number" id="amount" name="amount" step="any" />
				<input class="volumeInput" type="text" id="amountType" name="amountType" step="any" />)
			</div>
			<div class="discountContainer">
				<input class="discountInput" type="checkbox" id="isDiscount" name="isDiscount" />
				<label for=isDiscount>discount?</label>
			</div>	
		</div>

		<input class="addNewItem" type="submit" value="add new item" />
	</form>
</template>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
	padding: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
	margin: 0;
	padding: 0;
}

input[type='checkbox'] {
    -webkit-appearance:none;
    width:30px;
    height:30px;
    background:white;
    border-radius:5px;
    border:1px solid #8e8f9d;
}
input[type='checkbox']:checked {
    background: #abd;
}

/************************************************************/

.newItemForm {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.newItemGrid {
	display: grid;
	grid-template: 1.1rem 1.5rem / repeat(3, 4.5rem) 8rem;

	.discountContainer {
		grid-row: 1/3;
		grid-column: 4/5;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	input {
		width: 3rem;
		height: 1.2rem;
		padding: 0;
	}

	.volumeInput {
		width: 1.6rem;
	}

	.discountInput {
		width: 2rem;
		height: 2rem;
	}
}

.addNewItem {
	margin: 0.8rem;
	padding: 0.4rem;
}
</style>