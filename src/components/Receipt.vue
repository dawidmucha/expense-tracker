<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { defineProps } from 'vue'
import dateFormat from 'dateformat'
import NewReceiptItemForm from '@/components/NewReceiptItemForm.vue'

defineProps(['data'])
</script>

<template>
	<div class="receipt">
		<h3>{{ data[1].shop + ' @ ' + dateFormat(data[1].createdAt, 'yyyy-mm-dd HH:MM:ss') }}</h3>
		<ul :v-if="data[1].items.length >= 1">
			<li :key="index" v-for="(receiptItem, index) in data[1].items">{{receiptItem}}</li>
		</ul>
		<NewReceiptItemForm :receiptId="data[0]" />
	</div>
</template>

<style scoped>
.receipt {
	margin: 2rem;
	background-color: #eee;
}
</style>