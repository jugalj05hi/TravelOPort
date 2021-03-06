# TravelOPort
A Comprehensive Travel Portal Prototype.

# What is TravelOPort?
- TravelOPort is a prototype travel portal created from scratch with the help of [MERN](https://www.mongodb.com/mern-stack) (Mongo, Express, React, Node) stack. One can check real time flights and hourly currency rates through this application. While the hotels availability is seasonal, it shows accurate information for one to call the hotel and reserve the rooms.  The only reason to term this application as "Prototype" is because of lack of payment integration(You need license to do that and your business needs to be registered). There are different types of Users. Admin, Agent and normal user. Admin has the super-power to make changes to Normal users and Agent users. Checkout the links below to try out the application. 
# Application Link

1. [Firebase link](https://travel-o-port.web.app) -- Faster Link 
2. [Heroku Link](https://traveloport.herokuapp.com/) -- Slower link (Backup)
    - While loading the Heroku Link it'll take some time since non premium customers have their thread sleeping if not active than a certain amount of time. 
3. **NOTE: After clicking on the links above, please spare 2-3 mins for the backend to wake-up. The backend is hosted on Heroku hence it faces the same issue as the frontend heroku app i.e. making inactive sessions sleep. There is 
no bug in the application but rather it is an annoying pay-wall from Heroku. For more read [here](https://devcenter.heroku.com/articles/dynos#dyno-sleeping).**

# Tech Stack
1. Frontend 
    - [HTML](https://en.wikipedia.org/wiki/HTML5)
    - [CSS](https://en.wikipedia.org/wiki/CSS)
    - [Javascript ES-6](https://developer.mozilla.org/en-US/docs/Web/javascript)
    - [React](https://reactjs.org/)
    - [Redux](https://redux.js.org/) for state management 
    - [React hooks](https://reactjs.org/docs/hooks-intro.html) for state management
2. Backend
    - [Node.JS](https://nodejs.org/en/) for runtime
    - [Express.JS](https://expressjs.com/) for providing internal API calls through middleware
    - Various NPM packages such as [Mongoose](https://mongoosejs.com/), [Crypto-js](https://www.npmjs.com/package/crypto-js), [bcrypt](https://en.wikipedia.org/wiki/Bcrypt), and more. 
3. Database
    - [MongoDB](https://www.mongodb.com/) 
        - Hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

# External APIs 
1. [Amadeus](https://developers.amadeus.com/)
2. [Exchange Rates API](https://api.exchangeratesapi.io/)

# Application Architecture 
![Image](/media/mern.png)
<br><sub><sup>Picture credit: https://damianfallon.blogspot.com/2021/01/the-ultimate-guide-to-mern-stack.html</sup></sub>

# Application Snapshots
### User Dashboard
![Image](/media/User-Dashboard.png)
### Admin Dashboard
![Image](/media/Admin-Dashboard.png)
### Flight Booking
![Image](/media/Flights.png)

### Currency Conversion
![Image](/media/Currency.png)
### Hotel Booking
![Image](/media/Hotels.png)
