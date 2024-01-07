import Navbar from '@/components/Navbar'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <div 
         style={{
            background: 'radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)',
          }}
        > 

        <Navbar />
        </div>
        {children}
        </div>
  )
}

export default Layout