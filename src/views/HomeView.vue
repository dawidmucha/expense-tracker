<script setup>
import { collection, addDoc } from 'firebase/firestore'
import db from '@/main'

const test = async () => {
	console.log(process.env.VUE_APP_API_KEY)
	try {
		console.log('waiting')
		const docRef = await addDoc(collection(db, 'test'), {
			this: "works",
			i: ["hope", "it", 10035]
		})
		console.log('Document written with ID:', docRef)
	} catch (e) {
		console.error(e)
	}
}
</script>

<template>
	<div class="home">
		<button @click="test">test</button>
	</div>
</template>