<script setup>
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pushWithQuery = (name, query) => {
	router.push({
		name: name,
		query: {
			...route[query]
		}
	})
} 

const onLoginUser = (e) => {
	console.log('login with creds', e.target.email.value, e.target.password.value)

	const auth = getAuth()
	signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value).then(userCredentials => {
		console.log('logging in as', userCredentials.user)
		pushWithQuery('dashboard', '/dashboard')
	}).catch(e => console.error(e))
}

</script>

<template>
	<form @submit.prevent="(e) => onLoginUser(e)">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />

		<label for="password">Password</label>
		<input type="password" name="password" id="password" />

		<input type="submit" value="log in" />		
	</form>
</template>