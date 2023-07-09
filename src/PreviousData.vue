<template>
  <div>
    <h2>Previous Data</h2>
    <ul>
      <li v-for="item in emoticonData" :key="item._id">
        Emoticon: {{ item.emoticon }}, Message: {{ item.message }}
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'PreviousData',
    data() {
      return {
        emoticonData: [] // Correctly initializing emoticonData array
      }
    },
    created() {
      this.fetchEmoticonData()
    },
    methods: {
      fetchEmoticonData() {
        axios
          .get('http://localhost:8081/emoticons') // Update the URL here
          .then((response) => {
            console.log('Emoticon data retrieved:', response.data)
            this.emoticonData = response.data
          })
          .catch((error) => {
            console.error('Failed to fetch emoticon data:', error)
          })
      }
    }
  }
</script>

<style scoped>
  /* PreviousData component styles */
</style>
