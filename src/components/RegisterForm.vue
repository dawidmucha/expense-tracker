<script setup>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const onCreateUser = (e) => {
	const auth = getAuth()
	createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value).then((userCredentials) => {
		console.log('created user', userCredentials.user)
	}).catch(e => {
		console.error(e)
	})
}
</script>

<template>
	<form @submit.prevent="(e) => onCreateUser(e)">
		<label for="email">Email:</label>
		<input type="email" name="email" id="email" />

		<label for="password">Password:</label>
		<input type="password" name="password" id="password" />

		<input type="submit" value="sign up" />
	</form>
</template>