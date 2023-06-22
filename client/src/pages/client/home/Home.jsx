import './home.css'
import Featured from '../../../components/featured/Featured'
import Header from '../../../components/header/Header'
import Navbar from '../../../components/navbar/Navbar'
import PropertyList from '../../../components/propertyList/PropertyList'
import FeaturedProperties from '../../../components/featuredProperties/FeaturedProperties'
import Footer from '../../../components/footer/Footer'

const Home = () => {
  return (
    <div className='mainContainer'>
      <Navbar />
      <Header />
      <div className='homeContainer'>
        <Featured />
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList />
        <h1 className='homeTitle'>Home guests love</h1>
        <FeaturedProperties />
        <Footer />
      </div>
    </div>
  )
}

export default Home