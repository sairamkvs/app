import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { db } from "./firebase";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserData, setShowUserData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await db.collection("users").get();
        const result = data.docs.map((doc) => doc.data());
        setUsers(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    console.log('Submitted:', { name, email, mobile });
    console.log('Users:', users);

    if (isLoading) {
      alert('Data is still loading. Please wait.');
      return;
    }

    const isUserVerified = users.some((user) => user.name === name && user.email === email && user.mobile === mobile);

    console.log('Is User Verified:', isUserVerified);

    if (isUserVerified) {
      setIsVerified(true);
      setShowUserData(false); // Hide user data after submission
      alert('You are verified! Proceed with authorization.');
    } else {
      alert('User not found. Please check your input.');
    }

    setName('');
    setEmail('');
    setMobile('');
  };

  const handleAuthorize = () => {
    if (isVerified) {
      // Perform any authorization logic here if needed

      // Redirect to another webpage
      window.location.href = 'https://www.google.com'; // Replace with your desired URL
    } else {
      alert('You need to be verified first.');
    }
  };

  return (
    <>
      <h1>Single Page Application</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <input
          type="phone"
          name="mobile"
          placeholder="mobile"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />
        <br />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div>
        <button type="button" onClick={handleAuthorize}>
          Authorize
        </button>

        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          showUserData && (
            users.map((user) => (
              <div key={user.id}>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.mobile}</p>
              </div>
            ))
          )
        )}
      </div>
    </>
  );
}

export default App;
