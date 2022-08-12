<script setup>
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import dateFormat from 'dateformat'
import { mapState } from 'vuex'
import { ref, onMounted } from 'vue'

onAuthStateChanged(getAuth(), user => {
	if(user) {
		onSnapshot(doc(db, 'receipts', `${getAuth().currentUser.uid}`), doc => {
			console.log(doc.data())
			receipts.value = doc.data()
		})
	}
})

const receipts = ref({})
</script>

<template>
	<div>
		<h1>from store</h1>
		<ol>
			<li v-bind:key="receipt.createdAt" v-for="receipt in receipts">
				{{ receipt.shop }}
			</li>
		</ol>
	</div>
</template>
