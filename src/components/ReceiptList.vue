<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import dateFormat from 'dateformat'
import { mapState } from 'vuex'
import { ref, onMounted } from 'vue'
import Receipt from './Receipt.vue'

const receipts = ref({})

onAuthStateChanged(getAuth(), async (user) => {
	if(user) {
		const q = query(collection(db, 'receipts'), where('userId', '==', user.uid))
		const unsubscribe = onSnapshot(q, querySnapshot => {
			const data = []
			querySnapshot.forEach(datum => data.push(datum.data()))
			receipts.value = data
		})
	}
})
</script>

<template>
	<div>
		<div :key="receipt.createdAt" v-for="receipt in receipts">
			<Receipt :data='receipt' />
		</div>
	</div>
</template>
