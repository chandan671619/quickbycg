import React from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { NavLink } from 'react-router-dom'
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  Users,
} from 'lucide-react'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review', label: 'Review Resume', Icon: FileText },
 
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt="User avatar"
          className="w-16 h-16 rounded-full mx-auto"
        />

        <h1 className="mt-2 text-center font-medium">
          {user?.fullName}
        </h1>

        <div className="px-6 mt-5 text-sm text-gray-600 font-medium ">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded-lg transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : ''
                    }`}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full p-4 border-t border-gray-200 flex flex-col gap-2">
        <button
          onClick={() => openUserProfile()}
          className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Profile
        </button>

        <button
          onClick={() => signOut()}
          className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar