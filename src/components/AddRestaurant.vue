<template>
  <div class="page">
    <div class="overlay">
      <HeaderBanner />

      <div class="card">
        <h1>Hello {{ name }}</h1>
        <p class="subtitle">Add a New Restaurant</p>

        <form @submit.prevent="addRestaurant" class="form">
          <div class="form-group">
            <label>Restaurant Name</label>
            <input
              type="text"
              v-model="restaurant.name"
              placeholder="Enter restaurant name"
              required
            />
          </div>

          <div class="form-group">
            <label>Contact</label>
            <input
              type="text"
              v-model="restaurant.contact"
              placeholder="Enter contact number"
              required
            />
          </div>

          <div class="form-group">
            <label>Address</label>
            <input
              type="text"
              v-model="restaurant.address"
              placeholder="Enter address"
              required
            />
          </div>

          <button type="submit">Add Restaurant</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderBanner from './HeaderBanner.vue'
import axios from 'axios'

const router = useRouter()
const name = ref('')

const restaurant = ref({
  name: '',
  address: '',
  contact: ''
})

onMounted(() => {
  const user = localStorage.getItem('user-info')

  if (!user) {
    router.replace({ name: 'SignUp' })
    return
  }

  const userData = JSON.parse(user)
  name.value = userData.name
})

const addRestaurant = async () => {
  const result = await axios.post('http://localhost:3000/restaurants', {
    name: restaurant.value.name,
    address: restaurant.value.address,
    contact: restaurant.value.contact
  })

  if (result.status === 201) {
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5") no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  padding: 35px;
  border-radius: 12px;
  width: 420px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.6s ease-in-out;
}

h1 {
  text-align: center;
  margin-bottom: 5px;
  color: #2c3e50;
}

.subtitle {
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #2c3e50;
}

input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 14px;
}

input:focus {
  border-color: #ff7a18;
  box-shadow: 0 0 0 3px rgba(255, 122, 24, 0.2);
  outline: none;
}

button {
  margin-top: 10px;
  padding: 12px;
  width: 100%;
  background: linear-gradient(135deg, #ff7a18, #ff512f);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
