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
            <form action="/#">
              <label for="fname">First Name:</label><br></br>
              <input type="text" id="fname" name="fname" value="First Name" /><br></br>
            </form>
          </main>
        </div>
      </section> 
    </div>
    
  );
}

export default App;
