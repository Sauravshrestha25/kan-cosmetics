import Image from 'next/image';
import React from 'react'

const AboutPhotocard = ({ className, title, imageUrl, width, height }: { className?: string, title?: string, imageUrl: string, width: number; height: number }) => {
  return (
    <div className='font-saolDisplay'>
      <div className='flex flex-col gap-4 justify-center'>
        <div className='flex flex-col '>
          <Image src={imageUrl} alt="KAN" className={className} width={width} height={height}></Image>
          <p className='text-sm text-white'>{title}</p>
        </div>

      </div>

    </div>
  )
}

export default AboutPhotocard
