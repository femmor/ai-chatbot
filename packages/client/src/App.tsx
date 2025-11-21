import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';

const App = () => {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/status')
         .then((res) => res.json())
         .then((data) => setMessage(data.status));
   }, []);

   return (
      <div className="flex flex-col justify-center items-center h-screen">
         <p className="text-green-600 text-center text-2xl">{message}</p>
         <div className="mt-4">
            <Button onClick={() => console.log('Button Clicked!')}>
               Click Me Boy!!
            </Button>
         </div>
      </div>
   );
};
export default App;
