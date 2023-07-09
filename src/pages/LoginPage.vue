<template>
  <div class="login-container">
    <h2 class="login-title">Login</h2>
    <form @submit="loginUser">
      <div class="input-container">
        <i class="fas fa-user"></i>
        <input type="email" v-model="email" placeholder="Email" required />
      </div>

      <div class="input-container">
        <i class="fas fa-lock"></i>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>

      <button type="submit" class="login-button">Login</button>

      <p class="register-text">
        If you don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async loginUser(event) {
        event.preventDefault()

        try {
          const response = await axios.post('http://localhost:8081/login', {
            email: this.email,
            password: this.password
          })

          const token = response.data.token // eslint-disable-line no-unused-vars

          // Store the token in local storage or Vuex store

          // Redirect the user to the /emoticons page
          this.$router.push('/emoticons')

          // Show success toast message
          this.$toast.success('Login successful.')
        } catch (error) {
          console.error('Failed to login:', error)
          // Handle error and show error message to the user
          this.$toast.error('Failed to login. Please try again.')
        }
      }
    }
  }
</script>

<style scoped>
  /* Login component styles */
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ff6666; /* Specify the border color */
    padding: 20px; /* Increase the padding to make the content appear bigger */
    border-radius: 5px;
  }

  .login-container .login-title {
    font-size: 24px; /* Increase the font size for the title */
    margin-bottom: 10px;
  }

  .login-container .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #ff6666;
    padding: 10px; /* Increase the padding to make the input fields bigger */
    border-radius: 5px;
  }

  .login-container .input-container i {
    margin-right: 10px;
  }

  .login-container input[type='email'],
  .login-container input[type='password'] {
    border: none;
    outline: none;
    width: 250px; /* Increase the width of the input fields */
    padding: 10px; /* Increase the padding to make the input fields bigger */
  }

  .login-container button.login-button {
    padding: 10px 20px;
    background-color: #ff6666; /* Replace with your desired button color */
    color: #fff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 15px;
  }

  .login-container .register-text {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 16px;
  }

  .login-container .register-text a {
    margin-left: 5px;
    color: #b366ff; /* Adjust the color of the register link */
  }
</style>
