# Feelings Tracker
Feelings Tracker is a web application that allows users to track and record their emotions using emoticons. Users can select an emoticon that represents their current feeling and add a corresponding message. The app provides a history of previously recorded emotions and allows users to update or delete their entries.

## Features
- Emoticon selection: Users can choose from a range of emoticons to represent their current emotion.
- Message recording: Users can add a message to provide context or additional details about their emotions.
- History tracking: The app maintains a history of previously recorded emotions for each user.
- Update and delete: Users can update or delete their previously recorded entries.
- User authentication: The app provides user authentication to ensure privacy and data security.

## Technologies Used
- Frontend: HTML, CSS, JavaScript, Vue.js
- Backend: Node.js, Express.js
- Database: MongoDB

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running

### Installation
1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies for both the backend and frontend:
cd server
npm install
cd src
npm install

4. Configure the environment variables:
Backend: Create a `.env` file in the `/backend` directory and specify the required variables such as database connection details and JWT secret key.

5. Start the backend server:
cd backend
npm start

6. Start the frontend development server:
cd src
npm run serve

7. Access the app in your web browser:
http://localhost:8080


## Usage
- Register a new user account or login with an existing account.
- Select an emoticon that represents your current feeling.
- Add a message to provide context or details about your emotion.
- Click the "Save" button to record your emotion.
- View your previously recorded emotions in the history section.
- Edit or delete any entry in the history section as needed.
- Use the logout button to securely log out from your account.

## Contributing
Contributions to Feelings Tracker are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

## License
Feelings Tracker is open source and released under the [MIT License](LICENSE).

