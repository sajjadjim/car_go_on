"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function MealSearch() {
      // const [meals, getMeals] = useState([]);
      const [search, setSearch] = useState("");
  
      const router = useRouter()
      const pathName = usePathname();
      useEffect(()=>{
        const searchQuery = {search};
        const urlQueryParam = new URLSearchParams(searchQuery)
        const url = `${pathName}?${urlQueryParam}`;
        router.push(url);
      },[search])

  return (
    <div>
        <input className='border border-gray-300 rounded-md p-2 m-5 w-full md:w-1/2 lg:w-1/3'
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for meals..."
            />
    </div>
  )
}
