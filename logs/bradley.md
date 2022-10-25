## Changelog (Bradley)

- Created basic HTML for community page (community.html)
- Linked community javascript file (community.js)
- Created an express server in javascript file (app.js)
- Created example data in a JSON file
- Created an API to allow data to be sent to client side
- Read JSON data into server side and fetched the data from client side to view posts from user on

- Created GET request which allows user friendly URLs
- Buttons can show and hide pop up form for posts
- Changed file paths to suit changes made in API
- Created POST requests to send user data to server side and save to JSON
- Used GET requests to bring JSON data to clientside
- Looped through posts and displayed them on community page
- Created input elements in posts to allow users to write comments
- Added endpoint to allow comments to be posted to the server
- Converted comments to JSON and pushed them to the relevant post
- Captured user input and POST it to server
- After data is sent the form is hidden
- Captured gif using ID and used the image source to save to JSON
- Checked if gif exists, if not save empty string otherwise save image src
- DateTime of posts saved in JSON
- Used event listener to trigger comment POST request to save data in JSON
- Passed comment element in to function so data can be saved distinctly
- Created elements for emojis and added event listeners to detect clicks
- Created a PUT request to increment reactions for posts in JSON
- Changed fetch URLs so they only request using endpoints 
- Emojis have their own event listeners but utilise the same function

