import { headers } from 'next/headers'
import React from 'react'

const page = async() => {
    let users = []
    let res = await fetch(`${process.env.NEXTAUTH_URL}/api/customers`,{
        headers:new Headers(headers())
    })
    if (res.ok) {
        users = await res.json()
    }

    console.log(users)

  return (
    <div>page</div>
  )
}

export default page