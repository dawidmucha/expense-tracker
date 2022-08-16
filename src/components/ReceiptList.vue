<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import dateFormat from 'dateformat'
import { mapState } from 'vuex'
import { ref, onMounted } from 'vue'
import ReceiptItem from './ReceiptItem.vue'

onAuthStateChanged(getAuth(), async (user) => {
	if(user) {
		onSnapshot(doc(db, 'receipts', `${getAuth().currentUser.uid}`), doc => {
			const dataSorted = Object.entries(doc.data()).sort((d1, d2) => {
				return d1[1].createdAt > d2[1].createdAt ? -1 : 1
			})
			receipts.value = dataSorted
		})
	}
})

const receipts = ref({})
</script>

<template>
	<div>
		<div v-bind:key="receipt.createdAt" v-for="receipt in receipts">
			<!-- <h2>{{ receipt[1].shop + ' @ ' + dateFormat(receipt[1].createdAt, 'yyyy-mm-dd HH:MM:ss')  }}</h2> -->
			<ReceiptItem :data='receipt' />
		</div>
	</div>
</template>
