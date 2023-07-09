<template>
  <div class="container">
    <!-- Include the LogoutButton component here -->
    <div class="emoticon-container">
      <!-- Emoticon buttons -->
      <div class="emoticon-buttons">
        <button
          v-for="emoticon in emoticons"
          :key="emoticon"
          class="emoticon-button"
          :class="{ selected: selectedEmoticon === emoticon }"
          @click="selectEmoticon(emoticon)"
        >
          {{ emoticon }}
        </button>
      </div>

      <!-- Message input field -->
      <input type="text" v-model="message" placeholder="Enter your message" />

      <!-- Save button -->
      <button @click="saveMessage" class="save-button">Save</button>
    </div>

    <div class="previous-data">
      <h2 class="previous-data-heading">Previous Data</h2>
      <div :class="['data-grid', { 'edit-mode': editItemId !== null }]">
        <div v-for="item in emoticonData" :key="item._id" class="data-item">
          <div class="card-content">
            <div class="date">{{ item.date }}</div>
            <div class="emoticon-container">
              <div v-if="item._id === editItemId">
                <button
                  v-for="emoticon in emoticons"
                  :key="emoticon"
                  class="emoticon-button"
                  @click="selectEmoticonForEdit(emoticon)"
                  :class="{ selected: emoticon === editedEmoticon }"
                >
                  {{ emoticon }}
                </button>
              </div>
              <div v-else>
                <span class="emoticon">{{ item.emoticon }}</span>
              </div>
            </div>
            <div v-if="item._id === editItemId" class="edit-panel">
              <input v-model="editedMessage" type="text" />
              <div>
                <button @click="updateEmoticon(item)">
                  <i class="fas fa-save"></i>
                </button>
                <button class="cancel-button" @click="cancelEdit">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div v-else class="message">{{ item.message }}</div>
          </div>
          <div class="edit-delete-button-container">
            <button
              v-if="item._id !== editItemId"
              @click="editEmoticon(item)"
              class="edit-button"
            >
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button
              v-if="item._id !== editItemId"
              @click="deleteEmoticon(item._id)"
              class="delete-button"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { DateTime } from 'luxon'

  export default {
    name: 'EmoticonSelection',
    data() {
      return {
        selectedEmoticon: null,
        message: '',
        emoticonData: [],
        emoticons: ['😄', '😢', '😃', '🤔', '😌', '😕', '😮', '😬', '😊'],
        editItemId: null,
        editedEmoticon: '',
        editedMessage: ''
      }
    },

    methods: {
      selectEmoticon(emoticon) {
        this.selectedEmoticon = emoticon
        if (this.editItemId !== null) {
          this.editedEmoticon = emoticon
        }
      },
      selectEmoticonForEdit(emoticon) {
        this.editedEmoticon = emoticon
      },
      saveMessage() {
        const token = localStorage.getItem('token') // Assuming the JWT token is stored in localStorage

        axios
          .post(
            'http://localhost:8081/emoticons/',
            {
              emoticon: this.selectedEmoticon,
              message: this.message
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(() => {
            console.log('Emoticon and message data sent to the backend')
            this.message = ''
            this.refreshEmoticonData()
            this.$toast.info('Message saved successfully', {
              position: 'top-right',
              duration: 1427,
              max: false
            })
          })
          .catch((error) => {
            console.error(error)
            this.$toast.error('Failed to save message', {
              position: 'top-right',
              duration: 1427,
              max: false
            })
          })
      },

      refreshEmoticonData() {
        axios
          .get('http://localhost:8081/emoticons')
          .then((response) => {
            console.log('Emoticon data retrieved:', response.data)

            this.emoticonData = response.data.map((item) => ({
              ...item,
              date: DateTime.fromISO(item.date)
                .setZone('Europe/Stockholm')
                .toLocaleString({
                  locale: 'en-GB',
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })
            }))
          })
          .catch((error) => {
            console.error('Failed to fetch emoticon data:', error)
            this.$toast.error('Failed to fetch emoticon data', {
              position: 'top-right',
              duration: 1427,
              max: false
            })
          })
      },
      deleteEmoticon(id) {
        axios
          .delete(`http://localhost:8081/emoticons/${id}`)
          .then(() => {
            console.log('Emoticon and message data deleted from the backend')
            this.refreshEmoticonData()
            this.$toast.warning('Emoticon deleted successfully', {
              position: 'top-right',
              duration: 1427,
              max: false
            })
          })
          .catch((error) => {
            console.error(error)
            this.$toast.error('Failed to delete emoticon', {
              position: 'top-right',
              duration: 1427,
              max: false
            })
          })
      },
      editEmoticon(item) {
        this.editItemId = item._id
        this.editedEmoticon = item.emoticon
        this.editedMessage = item.message
      },
      cancelEdit() {
        this.editItemId = null
        this.editedEmoticon = ''
        this.editedMessage = ''
      },
      updateEmoticon(item) {
        axios
          .put(`http://localhost:8081/emoticons/${item._id}`, {
            emoticon: this.editedEmoticon,
            message: this.editedMessage
          })
          .then(() => {
            console.log('Emoticon and message data updated')
            this.editItemId = null
            this.editedEmoticon = ''
            this.editedMessage = ''
            this.refreshEmoticonData()
            this.$toast.success('Emoticon updated successfully', {
              position: 'top-right',
              duration: 1427,
              max: false
            })
          })
          .catch((error) => {
            console.error(error)
            this.$toast.error('Failed to update emoticon')
          })
      }
    },
    mounted() {
      this.refreshEmoticonData()
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .emoticon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .emoticon-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }

  .emoticon-button {
    margin: 5px;
    font-size: 24px;
    padding: 5px 10px;
  }

  input[type='text'] {
    width: 300px;
    height: 30px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
  }

  .previous-data {
    width: 100%;
    max-width: 800px; /* Adjust this value to control the maximum width of the data section */
    margin-top: 20px;
    text-align: center;
  }

  .previous-data-heading {
    margin-bottom: 20px;
  }

  .data-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
  }

  .data-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
  }

  .data-grid.edit-mode {
    grid-template-columns: 1fr;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  .emoticon {
    font-size: 40px;
  }

  .message {
    margin-top: 5px;
  }

  .date {
    margin-top: 5px;
    color: #888;
    font-size: 12px;
  }

  .edit-delete-button-container {
    display: flex;
    justify-content: center;
  }

  .edit-button,
  .delete-button {
    padding: 5px;
    margin: 0 5px;
    font-size: 16px;
  }

  .edit-button:hover,
  .delete-button:hover {
    color: #ff4081; /* Adjust the color for the hover effect */
  }
</style>
