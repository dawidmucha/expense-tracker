<script setup>
import { getAuth, signOut } from 'firebase/auth'

const onLogoutUser = () => {
	const auth = getAuth()
	const user = auth.currentUser
	console.log('logging out user', user)

	signOut(auth).then(() => {
		console.log('logging out')
		this.$router.push('/')
	}).catch(e => console.error(e))
}

</script>

<template>
	<button @click="onLogoutUser">Log out</button>
</template>