const Footer = () => {
   const today = new Date().getFullYear();

   return (
      <footer className="mt-4 shrink-0">
         <p className="text-center text-sm text-gray-500">
            &copy; {today} AI Chatbot built with ❤️ by{' '}
            <a href="https://github.com/femmor" target="_blank">
               Emmanuel Egomson
            </a>
            . All rights reserved.
         </p>
      </footer>
   );
};
export default Footer;
