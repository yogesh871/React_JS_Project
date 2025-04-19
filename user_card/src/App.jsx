import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Userprofilecard from './component/userprofilecard'
import image1 from './assets/Yogesh.jpg'
import image2 from './assets/Khushal.jpg'
import image3 from './assets/jenish.jpg'
import image4 from './assets/DJsevni.jpg'
import image5 from './assets/Vishal.jpg'
import image6 from './assets/henil.png'

function App() {
 
  return (
    <div class="user_profile_card"> 
    
    <Userprofilecard image={image1} course="web development" name="Yogesh Rathod"  age={22} gender="male" contact="9465782857" email="yogesh@123gmail.com"/>
    <Userprofilecard image={image2} course="web development" name="Khushal Vaghasiya"  age={19} gender="male" contact="9895845924" email="khushal@123gmail.com"/>
    <Userprofilecard image={image3} course="web development" name="Jenish Hariyani"  age={20} gender="male" contact="9783373733" email="jenish@123gmail.com"/>
    <Userprofilecard image={image4} course="web development" name="Vivek Prajapati"  age={21} gender="male" contact="9347734437" email="Vivek@123gmail.com"/>
    <Userprofilecard image={image5} course="web development" name="vishal Solanki"  age={20} gender="male" contact="9783378964" email="vishal@123gmail.com"/>
    <Userprofilecard image={image6} course="web development" name="henil "  age={19} gender="male" contact="9123856674" email="henil@123gmail.com"/>
 
    </div>
  )
}

export default App
