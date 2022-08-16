<script setup>
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/main'
import { defineProps } from 'vue'
import dateFormat from 'dateformat'

const props = defineProps(['data'])
</script>

<template>
	<div>
		<h3>{{ data[1].shop + ' @ ' + dateFormat(data[1].createdAt, 'yyyy-mm-dd HH:MM:ss') }}</h3>
	</div>
</template>

