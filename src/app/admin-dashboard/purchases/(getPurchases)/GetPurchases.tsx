import React from 'react'

const GetPurchases = async() => {
    let res = await fetch(`${process.env.NEXTAUTH_URL}/api/purchases`)
  return (
    <div>GetPurchases</div>
  )
}

export default GetPurchases