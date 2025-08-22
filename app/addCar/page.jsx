import React from 'react'
import AddCarPage from './components/AddCarPage'
import AuthGuard from '../components/AuthGuard'

export default function page() {
  return (
    <div>
     <AuthGuard>
       <AddCarPage></AddCarPage>
     </AuthGuard>
    </div>
  )
}
