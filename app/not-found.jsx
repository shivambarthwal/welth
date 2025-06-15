'use client'
import { Button } from '@/components/ui/button'
import { Appassets } from '@/constants/Appassests'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen px-4'>
    <Image src={Appassets.errorPage} alt='error' height={500} width={500}/>
    <Link href="/">
    <Button className='mt-4 cursor-pointer'>Back to Home</Button>
    </Link>
    </div>
  )
}

export default NotFound