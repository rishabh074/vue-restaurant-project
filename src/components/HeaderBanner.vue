<template>
  <header class="header">
    <nav class="nav">
      <!-- page navigation -->
      <router-link to="/" class="link">Home</router-link>
      <router-link to="/addRestaurant" class="link">Add Restaurant</router-link>
      <!-- <router-link to="/updateRestaurant" class="link">Update Restaurant</router-link> -->

      <!-- logout -->
      <a href="#" class="link logout" @click.prevent="logout">
        Logout
      </a>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('user-info')
  router.push({ name: 'login' }) // 👈 router navigation
}
</script>

<style scoped>
.header {
  background-color: #222;
  padding: 12px 20px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.link {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.link.router-link-active {
  color: #42b883;
}

.logout {
  margin-left: auto;
  background: #ff4d4d;
  padding: 6px 14px;
  border-radius: 4px;
}

.logout:hover {
  background: #e60000;
}
</style>
