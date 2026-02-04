import Hero from '@/Components/Home/Hero/Hero'
import About from './About/page'
import ProductShowcase from '@/Components/Home/Products/ProductShowcase'
import Benefits from '@/Components/Home/Benefits/Benefits'
import Testimonial from '@/Components/Home/Testimonial/Testimonial'
import Footer from '@/Components/Layout/Footer/Footer'

const page = () => {
  return (
    <div className='font-saolDisplay '>
        <Hero />
        <ProductShowcase />
        <About />
        <Benefits />
        <Testimonial />
        <Footer />
        
    </div>
  )
}

export default page

