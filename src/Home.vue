<template>
  <div class="home-wrapper">
    <HeaderBanner />

    <div class="home-content">
      <h1>Hello {{ name }}, Welcome Back 👋</h1>

      <div class="table-container">
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>

          <tr v-for="item in restaurant" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.contact }}</td>
            <td>{{ item.address }}</td>
            <td class="action-cell">
              <router-link
                :to="{ name: 'UpdateRestaurant', params: { id: item.id } }"
                class="update-btn"
              >
                Update
              </router-link>

              <button
                @click="deleteRestaurant(item.id)"
                class="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import HeaderBanner from './components/HeaderBanner.vue'

const name = ref('')
const restaurant = ref([])

const router = useRouter()

/* ✅ LOAD DATA FUNCTION */
const loadData = async () => {
  const user = localStorage.getItem('user-info')

  if (!user) {
    router.push({ name: 'SignUp' })
    return
  }

  name.value = JSON.parse(user).name

  const result = await axios.get('http://localhost:3000/restaurants')
  restaurant.value = result.data
}

/* ✅ DELETE FUNCTION */
const deleteRestaurant = async (id) => {
  const result = await axios.delete(
    `http://localhost:3000/restaurants/${id}`
  )

  if (result.status === 200) {
    await loadData()   // reload list after delete
  }
}

/* ✅ onMounted (loadData inside) */
onMounted(async () => {
  await loadData()
})
</script>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80");
  background-size: cover;
  background-position: center;
  padding: 40px;
}

.home-content {
  max-width: 1100px;
  margin: auto;
  color: white;
}

.home-content h1 {
  margin-bottom: 30px;
  font-weight: 600;
}

.table-container {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

th, td {
  padding: 14px 16px;
  text-align: left;
}

th {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

tr:hover {
  background: rgba(255, 255, 255, 0.1);
}

.action-cell {
  display: flex;
  gap: 10px;
}

.update-btn {
  padding: 6px 12px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.3s ease;
}

.update-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(79, 70, 229, 0.6);
}

.delete-btn {
  padding: 6px 12px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(220, 38, 38, 0.6);
}

</style>
