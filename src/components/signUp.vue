<template>
  <div class="register-wrapper">
    <div class="register">
      <div class="signUpIcon">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnMKoc5DPbXkFiCsITqw3dfOM5mR-rXWzaug&s" />
      </div>

      <h2>Create Account</h2>

      <input type="text" placeholder="Enter your name" v-model="name" />
      <input type="text" placeholder="Enter your Email" v-model="email" />
      <input type="password" placeholder="Enter your password" v-model="password" />

      <button @click="signUp">Sign Up</button>

      <p class="login-text">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from './routes'

const name = ref('')
const email = ref('')
const password = ref('')

const signUp = async () => {
  try {
    const result = await axios.post('http://localhost:3000/users', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    console.warn(result)

    if (result.status === 201) {
      alert('sign-up done')
      localStorage.setItem('user-info', JSON.stringify(result.data))
        router.push({ name: 'Home' })   
    }
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

<style  scoped>

.register-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.55)
    ),
    url("https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80");
  background-size: cover;
  background-position: center;
}

.register {
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

.register h2 {
  color: white;
  margin-bottom: 10px;
  font-weight: 600;
}

.signUpIcon img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.register input {
  padding: 14px;
  font-size: 14px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.register input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

.register button {
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

.register button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.6);
}

.login-text {
  font-size: 14px;
  color: white;
}

.login-text a {
  color: #ffd700;
  font-weight: 600;
  text-decoration: none;
}

.login-text a:hover {
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