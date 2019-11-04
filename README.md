# twitterclone-web-backend

List of API:

- POST /api/user = sign up
- POST /api/user/signin = sign in
- POST /api/user/profilepicture = set profile picture
- GET /api/user/:userid/profilepicture = get profile picture

- POST /api/message = create message
- GET /api/message?page=... = get all messages (get 10 messages per page)
- GET /api/message/:message_id = get message
- DELETE /api/message/:message_id = delete message

API that use auth:
- set profile picture
- create message
- get all messages
- delete message
