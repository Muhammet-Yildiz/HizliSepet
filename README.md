
<h1 align ="center" >  

![logooo](https://user-images.githubusercontent.com/72153125/227736868-6ff93d47-2f11-432b-a502-3b5adc6c054b.png)</h1>



<h5  align ="center"> 
Full Stack open source mobile e-commerce application made with MongoDB, Express, React Native and Nodejs</h5>
<br/>


  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend (Mobile) ](#frontend-mobile)
      - [Backend](#backend)
      - [Database](#database)
  * [📸 Mockups](#mockups)
   * [🎥 Project Video](#project-video)
  * [Author](#author)
  * [License](#license)



## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- First you need to run the ngrok server. This server should not be shut down for project work
- Then open a different terminal. Split your terminal in half (run Server in one terminal and Client in the other)

<br>


ℹ️ Ngrok is a software that allows us to open our applications that we run on localhost on our own computer, over the cloud, under the xxx.ngrok.io sub-domain. [ngrok setup].

[ngrok setup]: https://www.npmjs.com/package/ngrok

<br>

1- To expose the server using ngrok ; 

```
$ ngrok http 5000
```

- Then copy the ngrok url on the server being run
- cd Client and paste NGROK_URL in .env under ./client
- Now the connection with the client is ensured
```
NGROK_URL  = "http://_______.ngrok.io"
```



2- In a different terminal ;
 <br>  <br>
  In the first half of the terminal

```
$ cd Client
$ npm install (to install client-side dependencies)
$ expo r -c
```


  In the second half of the terminal

- cd Server and Set environment variables in config.env under ./Config/env
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  ---  Config.env  ---

NODE_ENV = development
PORT =5000
MONGO_URI =
JWT_SECRET_KEY = 

```


```
# --- Terminal ---

$ npm install (to install server-side dependencies)
$ npm start (to start the server)
```






##  Key Features



- ✔️ User registration and login
- ✔️ Authentication using JWT Tokens 
- ✔️ Favorite, comment and add products to cart
- ✔️ Select products according to color and size information and add them to the cart
- ✔️ Showing the latest products you have looked at and similar product recommendations
- ✔️ Product categories page and display of subcategories
- ✔️ Search for products by name, brand, and category
- ✔️ Increase, decrease or delete the quantity of each item in the cart
- ✔️ Receiving orders by selecting delivery address and bank card
- ✔️ Detail page showing all orders placed and the latest status of products (shipping time, delivery date) for each order
- ✔️ Email and password change pages
- ✔️ Attention was paid to error handling 
- 🛠️ Forgot password page and password reset
- 🛠️ Adding photos to comments 
- 🛠️ Login with google account
- 🛠️ Creating a custom page for each brand
- 🛠️ Addition of payment system (Stripe)
- ❌ Requests are sometimes processed slowly and cause problems when they are fired at the same time (Could microservice architecture be the solution?.)




##  Technologies used

This project was created using the following technologies.

####  Frontend (Mobile)

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [React Hooks  ](https://reactjs.org/docs/hooks-intro.html) - For managing and centralizing application state
- [React Native ](https://reactnative.dev/) - a cross-platform mobile application development framework
- [React Navigation v6](https://reactnavigation.org/) - Routing and navigation for Expo and React Native apps
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [react-native-bouncy-checkbox](https://www.npmjs.com/package/react-native-bouncy-checkbox)   `7.2.1`
- [react-native-element-textinput](https://www.npmjs.com/package/react-native-element-textinput)   `2.2.0`
- [react-native-gesture-bottom-sheet](https://github.com/kcotias/react-native-gesture-bottom-sheet)   `1.1.0`
- [react-native-indicators](https://www.npmjs.com/package/react-native-indicators)   `0.17.0`
- [react-native-modal](https://www.npmjs.com/package//react-native-modal)   `13.0.1`
- [react-native-popup-menu](https://www.npmjs.com/package/react-native-popup-menu)   `0.16.1`
- [react-native-progress](https://www.npmjs.com/package/react-native-progress)   `5.0.0`
- [react-native-ratings](https://www.npmjs.com/package/react-native-ratings)   `8.1.0`
- [react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context)   `4.4.1`
- [react-native-simple-dialogs](https://www.npmjs.com/package/react-native-simple-dialogs)   `1.5.0`
- [react-native-step-indicator](https://www.npmjs.com/package/react-native-step-indicator)   `1.0.3`
- [react-native-toast-message](https://www.npmjs.com/package/react-native-toast-message)   `2.1.6`
- [react-textarea-autosize](https://www.npmjs.com/package/react-native-toast-message)   `2.1.6`





####  Backend 


- [Node js](https://nodejs.org/en/) - A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose  ](https://www.npmjs.com/package/mongoose) - For modeling and mapping MongoDB data to JavaScript
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers 
- [jsonwebtoken  ](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For data encryption
- [dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [multer](https://github.com/expressjs/multer#readme) - Node.js middleware for uploading files 
- [cors](https://github.com/expressjs/cors#readme) - Provides a Connect/Express middleware
- [uuid](https://github.com/thenativeweb/uuidv4#readme) -  For random id generator


####  Database 

 - [MongoDB ](https://www.npmjs.com/package/uuid) - It provides a free cloud service to store MongoDB collections.
 

## Mockups
<img src="https://user-images.githubusercontent.com/72153125/227718265-f235de48-ce77-4abd-853d-f9a0ee7a3839.png" alt="Search TextInput" width="265px" height="490px" /> &nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227708303-0b641233-13e9-45da-82e6-ef716f7a41eb.png" alt="Search TextInput" width="265px" height="490px" /> &nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227707798-6dbe8f2f-4265-479d-a098-7c613ec6fd24.png" alt="Search TextInput" width="265px" height="490px" /> &nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227708822-4040136e-57e7-49f6-ab37-989406078380.png" alt="Search TextInput" width="265px" height="490px" /> &nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227709836-fca5ccb6-ddab-4f3f-a216-b75516a12f6d.png" alt="Search TextInput" width="265px" height="490px" />&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227706391-cef8f7e0-82d7-41c4-8e55-d7c226bd8eb6.png" alt="Search TextInput" width="270px" height="490px" />&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227710577-dd834abf-18c1-42b6-a11a-9c521a1351a8.png" alt="Search TextInput" width="270px" height="490px" />&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227710876-4a88e67f-5292-44c0-9563-f30fad61faea.png" alt="Search TextInput" width="265px" height="490px" />&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227711945-42f554ae-39e5-42d3-91be-2cbb15625bc9.png" alt="Search TextInput" width="275px" height="490px" />&nbsp;

<img src="https://user-images.githubusercontent.com/72153125/227712355-2f75bece-09d0-4101-a866-a500735337d4.png" alt="Search TextInput" width="270px" height="490px" />&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227713431-5891441b-2075-4343-91c1-d3444b7ec93b.png" alt="Search TextInput" width="265px" height="490px" />&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227719913-ff941b2a-ad6f-49b2-a845-727b47659d3d.png" alt="Search TextInput" width="265px" height="490px" 
/>&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227720109-d50eb28e-a280-4d46-8989-75102078dd0b.png" alt="Search TextInput" width="268px" height="490px" 
/>&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227718589-67a3e8aa-3be2-495b-b2b3-ed4daa433eb8.png" alt="Search TextInput" width="265px" height="490px" 
/>&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227718678-44ec4cf9-8858-4a69-993e-2c234a96f9be.png" alt="Search TextInput" width="265px" height="490px" 
/>&nbsp;
 <img src="https://user-images.githubusercontent.com/72153125/227717397-a8420047-e4f7-40a8-b53f-f074d3063960.png" alt="Search TextInput" width="265px" height="490px" />&nbsp;
<img src="https://user-images.githubusercontent.com/72153125/227717526-a8048dbe-5f0f-4658-b28e-814ce997f60b.png" alt="Search TextInput" width="270px" height="490px" 
/>&nbsp;




## Author

- Github: [@Muhammet-Yildiz](https://github.com/Muhammet-Yildiz)
- Linkedin: [@muhammet-yildiz](https://www.linkedin.com/in/muhammet-yildiz1/)
- Email: [yildiz.m.muhammet@gmail.com](mailto:yildiz.m.muhammet@gmail.com)

- If you like the project, do not forget to give star ⭐⭐⭐ 

## License

```
Copyright 2023 Muhammet Yıldız
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0
    
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## Project Video 

<video src="https://user-images.githubusercontent.com/72153125/227774201-042d58db-2fe6-4464-937e-1eacb5ac084a.mp4" width=800/>


