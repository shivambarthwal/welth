import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'

const Header = async() => {
  await checkUser()
  return (
    <div className='fixed top-0 border-b w-full bg-white/80 backdrop-blur-md z-50 '>
      <nav className='container mx-auto flex justify-between items-center py-4 px-4'>
        <Link href="/" className='relative'>
        <Image src={"/logo-sm.png"} alt="Logo" width={100} height={100} className="cursor-pointer h-10 w-auto object-contain px-2" />
        <span className='absolute text-xl font-bold left-10 top-5 font-ganache'>EALTH</span>
        </Link>

       <div className='flex items-center space-x-4'>
  <SignedIn>
    <Link href="/dashboard" className='cursor-pointer text-gray-500 hover:text-blue-500 flex items-center gap-2'>
      <Button variant="outline" className="cursor-pointer">
        <LayoutDashboard className='mr-2' size={20} /> 
        <span className='hidden md:block'>DashBoard</span>
      </Button>
    </Link>
    <Link href="/transaction/create" className='cursor-pointer text-gray-500 hover:text-blue-500 flex items-center gap-2'>
      <Button className="cursor-pointer">
        <PenBox className='mr-2' size={20} /> 
        <span className='hidden md:block'>Transaction</span>
      </Button>
    </Link>
    <UserButton appearance={{
      elements: {
        avatarBox: "h-10 w-10",
      },
    }} />
  </SignedIn>

  <SignedOut>
    <SignInButton fallbackRedirectUrl='/dashboard'>
      <Button variant="outline" className="cursor-pointer">Sign In</Button>
    </SignInButton>
  </SignedOut>
</div>

             </nav>
    </div>
  )
}

export default Header