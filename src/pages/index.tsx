import NavBar from "../components/commons/Navbar"
import SwipeableTempDrawer from "../components/commons/SwipeableTempDrawer"
import HomePage from "../components/pages/HomePage"

const Home = () => {
  return (
    <>
      <SwipeableTempDrawer />
      <NavBar />
      <HomePage />
    </>
  )
}

export default Home