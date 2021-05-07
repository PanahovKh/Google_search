import { useSelector } from "react-redux";
import Blogs from "./Components/Blogs";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import { selectSignedIn } from "./features/userSlice";
import './styling/app.css'


function App() {
  const isSignedIn = useSelector(selectSignedIn)

  return (
    <>
    <Navbar />
    <HomePage />
    { isSignedIn && <Blogs />}
    </>
  );
}

export default App;
