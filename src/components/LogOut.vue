<!-- LogOut.vue -->
<template>
  <button class="logout-button" @click="logout">
    <i class="fas fa-sign-out-alt"></i>
  </button>
</template>

<script>
  import axios from 'axios'

  export default {
    methods: {
      logout() {
        axios
          .post('http://localhost:8081/logout')
          .then(() => {
            // Clear any stored token or user information in your Vue app
            // Redirect to the login page
            this.$router.push('/login')
          })
          .catch((error) => {
            console.error('Failed to logout:', error)
            // Handle error if needed
          })
      }
    }
  }
</script>

<style scoped>
  .logout-button {
    padding: 5px;
    background: none;
    border: none;
    font-size: 24px;
    color: #0c0b0b;
    cursor: pointer;
  }

  .logout-button:hover {
    color: #ff4081; /* Adjust the color for the hover effect */
  }
</style>
