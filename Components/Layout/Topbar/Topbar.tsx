"use client";
import Image from 'next/image'
import React from 'react'


const Topbar = () => {

 
  return (
    <div className='fixed top-4 right-1/2 z-50 translate-x-1/2'>
        <Image src="/images/new_logo.png" alt="KAN Cosmetics" width={160} height={100}></Image>
    </div>
  )
}

export default Topbar
