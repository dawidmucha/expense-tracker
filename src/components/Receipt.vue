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
		<h3>{{ data.shop }} @ {{ dateFormat(data.createdAt, 'yyyy-mm-dd HH:MM:ss') }}</h3>
		<ul :v-if="data.items.length >= 1">
			<li :key="receiptItem.id" v-for="receiptItem in data.items">{{receiptItem}}</li>
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