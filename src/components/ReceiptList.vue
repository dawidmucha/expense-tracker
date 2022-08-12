<script>
import { collection, doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import db from '@/main'
import dateFormat from 'dateformat'
import { mapState } from 'vuex'

export default {
	name: "ReceiptList",
	data() {
		return {
			receipts: {}
		}
	},
	methods: {
		dateFormat,
		getTodo(e) {
			this.$store.dispatch('getTodo', e.target.value)
		},
		addTodo() {
			this.$store.dispatch('addTodo')
			this.$store.dispatch('clearTodo')
		}
	},
	computed: {
		newReceipt() {
			return this.$store.getters.newReceipt
		}
	},
	async created() {
		const user = getAuth().currentUser

		const docRef = doc(db, 'receipts', `${user?.uid}`)
		const docSnap = await getDoc(docRef)

		if(docSnap.exists()) {
			console.log('document data:', docSnap.data())
			this.receipts = { ...docSnap.data() }
			this.$store.commit('addReceipt', docSnap.data())
		} else console.log('no such doc!')
	},
}
</script>

<template>
	<div>
		<h1>from store</h1>
		{{ getAllReceipts }}
		<ol>
			<li>list</li>
			<li v-bind:key="receipt.createdAt" v-for="receipt in receipts">
				{{ receipt.shop }}
			</li>
		</ol>
	</div>
	<!-- <div>
		<div v-bind:key="receipt.createdAt" v-for="receipt in receipts">
			<h3>{{ receipt.shop }}</h3>
			<h4>{{ dateFormat(receipt.createdAt, "DDDD, dd/mm/yyyy @ HH:MM") }}</h4>
		</div>
	</div> -->
</template>
