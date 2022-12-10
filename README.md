# NFTY

## Live App
https://nftyclub.live/
<hr/>

## Project type: 
eCommerce (auction house)

## Web Frameworks
- Frontend: ReactJS
- Backend: ExpressJS (https://expressjs.com/)

## Project Reports
1. Express.js - Parsing HTTP headers: https://docs.google.com/document/d/1u6s63CZZHbggd5Vg_qx4KFPtO-iwiSc6lRuxYBE3MuU/edit?usp=sharing
2. Express.js - TCP Connections: https://docs.google.com/document/d/1uAvJ3lFTj4nUT-TqS1IXLZx-LTc09tJS/edit?usp=sharing&ouid=117659263580279431224&rtpof=true&sd=true
3. Socket.IO - WebSockets: [https://docs.google.com/document/d/1uAvJ3lFTj4nUT-TqS1IXLZx-LTc09tJS/edit?usp=sharing&ouid=117659263580279431224&rtpof=true&sd=true](https://docs.google.com/document/d/1aX6lp75rZK4lzIdaSRAqmmKKYTSCOpcs/edit?usp=sharing&ouid=117659263580279431224&rtpof=true&sd=true)

## Security
All the requests sent to the server are validated as follows

- When receiving request:
  - Check if user is authenticated using the cookie and crosschecking with the user model in the database.
  - Check if all the fields are valid for POST and PUT requests, and sending error/response codes and message accordingly, and showing in frontend.
  - Check if the object requested from the server exists in the database, and if the owner and other fields are valid.
  
- When sending response:
  - Created a utility function to filter out unwanted fields (principle: only send what the client asks for, and validate).
  - Changes the owner/bidder/seller etc. which uses user model to the plain string with their email when sending response to avoid sending UserID or hashed and salted passwords to frontend.
  - Used bcrypt to salt and hash passwords, and used high-order authentication tokens for maximum security.


## Contributors
- stirfrysushi (An Nguyen)
- Prakshal-Jain and Prakshal Pro (Prakshal Jain)
- SolarFlaries (James)
- ericidy (Eric)
