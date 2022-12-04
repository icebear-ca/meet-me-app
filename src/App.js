import React, {useState, useEffect} from 'react' 
import axios from 'axios';
const App = function () {
const [users, setUsers] = useState(null);
const [username, setUsername] = useState("");
useEffect(() => {
axios
.get("/api/users")
.then((users) => setUsers(users))
.catch((err) => console.log(err));
}, []);
function submitForm() {
if (username === "") {
alert("Please enter a username");
return;
}
if (email === "") {
alert("Please enter your email address.");
return;
}
axios
.post("/api/users", {
username: username,
email: email,
})
.then(function () {
alert("Account created successfully");
window.location.reload();
})
.catch(function () {
alert("Unable to create account. Please try again.");
});
}
return (
<>
<h1>Meet Me</h1>
{users === null ? (
<p>Loading...</p>
) : users.length === 0 ? (
<p>No user available</p>
) : (
<>
<h2>Available Users</h2>
<ol>
{users.map((user, index) => (
<li key={index}>
Name: {user.name} - Email: {user.email}
</li>
))}
</ol>
</>
)}
<form onSubmit={submitFOrm}>
<input
onChange={(e) => setUsername(e.target.value)}
type="text"
placeholder="Username"
/>
<input 
onChange={(e) => setEmail(e.target.value)}
type="text"
placeholder="Email address"
/>
<input type="submit" />
</form>
</>
);
};
export default App;
