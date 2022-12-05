/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';

function App() {
  return (

    <div id="appContainer">
      <section id="section1">
        <ul>
          <li>Meet Me</li>
        </ul>
      </section>

      <section id="section2">
        <div class="formArea">
          <main>
           <form method="get" action="#" id="login-form" class="login-form" autocomplete="off" role="main">
             <h1 class="a11y-hidden">Login Form</h1>
              <div>
                <label class="label-email">
                 <input type="email" class="text" name="email" placeholder="Email" tabindex="1" required />
                 <span class="required">Email</span>
                </label>
              </div>
             <input type="checkbox" name="show-password" class="show-password a11y-hidden" id="show-password" tabindex="3" />
             <label class="label-show-password" for="show-password">
                <span>Show Password</span>
             </label>
             <div>
                <label class="label-password">
                 <input type="text" class="text" name="password" placeholder="Password" tabindex="2" required />
                    <span class="required">Password</span>
               </label>
              </div>
             <input type="submit" value="Log In" />
              <div class="email">
               
               <a href="#">Forgot password?</a>
             </div>
             
            </form>
         </main>
        </div>
      </section> 
    </div>
    
  );
}

export default App;
