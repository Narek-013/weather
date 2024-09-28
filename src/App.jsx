import Weather from "./components/Weather";
import "./App.css";
import { useEffect } from "react";

function App() {
  const hour = new Date().getHours();
     
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.keyCode === 123) {
          event.preventDefault();
        }

        if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) {
          event.preventDefault();
        }

        if (event.ctrlKey && event.keyCode === 85) {
          event.preventDefault();
        }

        if (event.ctrlKey && event.shiftKey && event.keyCode === 75) {
          event.preventDefault();
        }
      };

    
      // document.addEventListener("contextmenu",(ev) => {
      //   ev.preventDefault()
      // })
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
   
  return (
    <div
      className="App no-select"
      style={{
        backgroundImage:
          hour < 5 || hour > 20
            ? "url(https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?cs=srgb&dl=pexels-felixmittermeier-956981.jpg&fm=jpg)"
            : "url(https://img.freepik.com/free-photo/blue-sky-with-clouds_1417-1532.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725494400&semt=ais_hybrid)",
      }}
    >
     <Weather />
    </div>
  );
}

export default App;
