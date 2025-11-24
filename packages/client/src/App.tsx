import { Chatbot, Footer } from './components';

const App = () => {
   return (
      <div className="p-4 h-screen w-full flex flex-col">
         <div className="flex-1 overflow-hidden">
            <Chatbot />
         </div>
         <Footer />
      </div>
   );
};
export default App;
