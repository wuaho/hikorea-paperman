import { useEffect, useState } from 'react';
import { AlienRegistrationFlow } from './components/alien-registration-flow';
import { Button } from './components/ui/button';
import axios from 'axios';

async function helloWorld() {
  try {
    const response = await axios.get('/api');
    const data = response.data;
    console.log('Response from backend:', data); // Debería imprimir "Hello World!"
  } catch (error) {
    console.error('Something went wrong when calling the backend:', error);
  }
}

function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then(setGreeting);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1>{greeting}</h1>

      <Button onClick={() => helloWorld()}></Button>

      <AlienRegistrationFlow />
    </div>
  );
}

export default App;
