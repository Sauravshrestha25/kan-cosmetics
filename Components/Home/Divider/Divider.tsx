import Image from 'next/image'
import React from 'react'

const Divider = () => {
  return (
   <section className='h-auto sm:h-auto w-full'>
    <div className='h-screen sm:h-[120vh]'>
<Image src="/images/happyfaces.png" alt="K & A Cosmetics" width={1000} height={1000} className='w-full h-[80%] sm:w-full sm:h-full object-fit mx-auto my-auto pt-40 sm:pt-0 sm:object-cover'></Image>
    </div>
    

   </section>
  )
}

export default Divider