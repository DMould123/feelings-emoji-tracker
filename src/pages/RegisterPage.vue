<template>
  <div class="register-container">
    <h2 class="register-title">Register</h2>
    <form @submit="registerUser">
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

      <button type="submit" class="register-button">Register</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RegisterPage',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async registerUser(event) {
        event.preventDefault()

        try {
          const response = await axios.post('http://localhost:8081/register', {
            email: this.email,
            password: this.password
          })

          console.log('User registered:', response.data)

          // Show success message to the user
          this.$toast.success('Registration successful. Please log in.')

          // Redirect the user to the login page
          this.$router.push('/login')
        } catch (error) {
          console.error('Failed to register user:', error)
          // Show error message to the user
          this.$toast.error('Failed to register user. Please try again.')
        }
      }
    }
  }
</script>

<style scoped>
  /* Register component styles */
  .register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ff6666; /* Specify the border color */
    padding: 20px; /* Increase the padding to make the content appear bigger */
    border-radius: 5px;
  }

  .register-container .register-title {
    font-size: 24px; /* Increase the font size for the title */
    margin-bottom: 10px;
  }

  .register-container .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #ff6666;
    padding: 10px; /* Increase the padding to make the input fields bigger */
    border-radius: 5px;
  }

  .register-container .input-container i {
    margin-right: 10px;
  }

  .register-container input[type='email'],
  .register-container input[type='password'] {
    border: none;
    outline: none;
    width: 250px; /* Increase the width of the input fields */
    padding: 10px; /* Increase the padding to make the input fields bigger */
  }

  .register-container button.register-button {
    padding: 10px 20px;
    background-color: #ff6666; /* Replace with your desired button color */
    color: #fff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    font-size: 15px;
  }

  .register-container p {
    margin-top: 10px;
  }
</style>
