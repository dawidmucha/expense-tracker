<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LogoutForm from '@/components/LogoutForm.vue'
import ReceiptList from '@/components/ReceiptList.vue'
import NewReceiptForm from '@/components/NewReceiptForm.vue'
import { ref } from 'vue'
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

const isLoggedIn = ref(false) 
const email = ref(undefined) 

const auth = getAuth()
onAuthStateChanged(auth, user => {
  if(user) {
    isLoggedIn.value = true
    email.value = user.email
    console.log(user)
  } else {
    pushWithQuery('home', '/')
  }
})
</script>

<template>
  <nav v-if="isLoggedIn">
    <router-link to="/dashboard">Dashboard</router-link> | 
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/settings">Settings</router-link> |
    {{ email }}
    <LogoutForm v-if="isLoggedIn" />
  </nav>
  <nav v-else>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> | 
    <router-link to="/register">Register</router-link> |
  </nav>
  <router-view/>
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  padding: 2rem 0;
  width: 100%;
  background-color: #eb644f;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ccc;
    }
  }
}
</style>
