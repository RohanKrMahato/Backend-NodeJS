## Problems in Statefull Authentication
=> If server restart or some reason server lost , all users get logged out.

=> Memory intensive

## Stateless Authentication

=> No states (now we don't require any MAP or other data structure on the server to store the state)
=> We use JWT(JSON Web Tokens) Tokens 
=> Maintain the state on local browser using encoded msg of payload(token) and `secret key`.
=> `Secret` should be secret.

![state_in_the_ticket](./images/State_in_the_ticket.png)

- Anyone can read, but no one change the ticket.

- Jwt will generate a token, we will put the token in the cookie of the user

[auth.js](./service/auth.js)
[uer.js](./controllers/user.js)