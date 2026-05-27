import React from 'react'
import { Search } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (

    <div className="flex items-center bg-[#345246] text-white justify-between px-20 py-4 shadow-md">

      <h1 className="text-3xl font-semibold">RentEase</h1>
      <div className="flex items-center border rounded-2xl px-4 py-2 w-[55%]">

        <input
          type="text"
          placeholder="Search furniture, appliances to rent..."
          className="outline-none w-full px-4 py-2.5 border-gray-400 text-md"
        />

        <Search className="text-gray-300 mr-2" />
      </div>

        <div className="text-gray-200 hover:text-white transition-colors duration-300">
          <Link to="/">Home</Link>
        </div>

        <div className="flex items-center gap-5 bg-[#3B5D4F] px-5 py-4 rounded-4xl hover:bg-[#2b4238]/80 transition-colors duration-300">
            <Link to="/api/auth/login">Login/Signup</Link>
            <ExternalLink />
        </div>

        <button>
            <ShoppingCart />
        </button>

    </div>
  )
}

export default Navbar
