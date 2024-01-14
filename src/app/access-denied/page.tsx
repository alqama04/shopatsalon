import Link from 'next/link'
import React from 'react'

const AccessDenied = () => {
  return (
    <div className='flex justify-center items-center h-full w-full '>
      <h2>Access Denied</h2>
      <Link href='/'>Go To Home </Link>
    </div>
  )
}

export default AccessDenied