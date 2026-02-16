<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="loginIcon">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnMKoc5DPbXkFiCsITqw3dfOM5mR-rXWzaug&s"
          alt="login"
        />
      </div>

      <h2>Welcome Back</h2>

      <input
        type="text"
        placeholder="Enter your Email"
        v-model="email"
      />

      <input
        type="password"
        placeholder="Enter your Password"
        v-model="password"
      />

      <button @click="login">Login</button>

      <p class="signup-text">
        Don't have an account?
        <span @click="goToSignup">Sign Up</span>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')

const router = useRouter()

const goToSignup = () => {
  router.push({ name: 'SignUp' })
}

const login = async () => {
  try {
    const result = await axios.get(
      `http://localhost:3000/users?email=${email.value}&password=${password.value}`
    )

    if (result.status === 200 && result.data.length > 0) {
      localStorage.setItem(
        'user-info',
        JSON.stringify(result.data[0])
      )
      router.push({ name: 'Home' })
    }

    console.warn(result)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  const user = localStorage.getItem('user-info')
  if (user) {
    router.push({ name: 'Home' })
  }
})
</script>


<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.55)
    ),
    url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80");
  background-size: cover;
  background-position: center;
}

.login {
  width: 100%;
  max-width: 400px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: center;
  animation: fadeIn 0.6s ease-in-out;
}

.login h2 {
  color: white;
  margin-bottom: 10px;
  font-weight: 600;
}

.loginIcon img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.login input {
  padding: 14px;
  font-size: 14px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.login input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

.login button {
  padding: 14px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.6);
}

.signup-text {
  font-size: 14px;
  color: white;
}

.signup-text span {
  color: #ffd700;
  cursor: pointer;
  font-weight: 600;
}

.signup-text span:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
