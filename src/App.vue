<template>
  <div class="app-container">
    <LogOut v-if="shouldDisplayLogout" />
    <div class="header">
      <img src="@/assets/logo.png" alt="Logo" class="app-logo" />
      <h1 class="app-title">Feelings Tracker</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import LogOut from './components/LogOut.vue'

  export default {
    name: 'App',
    components: {
      LogOut
    },
    computed: {
      shouldDisplayLogout() {
        const restrictedRoutes = ['/login', '/register']
        const currentRoute = this.$route.path
        return !restrictedRoutes.includes(currentRoute)
      }
    }
  }
</script>

<style scoped>
  /* Import the Lato font from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

  /* App component styles */
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    /* Set a gradient background to the whole page */
    background: linear-gradient(
      to bottom,
      #ffb199,
      #ff8d80
    ); /* Replace with your desired colors */
    min-height: 100vh; /* Ensure the gradient covers the whole viewport */
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }

  .app-logo {
    /* Adjust the logo size as needed */
    width: 100px;
    height: 100px;
  }

  .app-title {
    font-family: 'Lato', sans-serif; /* Use the Lato font */
    font-size: 24px;
    margin-left: 20px;
  }

  .header > *:last-child {
    margin-right: 20px;
  }
</style>
