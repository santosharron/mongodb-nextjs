'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronDownIcon, HomeIcon, FolderIcon, ClipboardIcon } from 'lucide-react'
import { JobSearchInterfaceComponent } from './job-search-interface'

export function Page() {
  return (
    <div className="font-sans">
      {/* Desktop Navbar */}
      <nav className="bg-white shadow-md border-b border-gray-200 lg:block hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image className="h-8 w-auto" src="/logo.svg" alt="Cuvette" width={32} height={32} />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="ml-4 flex items-center">
                <div className="flex items-center border border-gray-300 rounded-lg py-1 px-3">
                  <Image className="h-8 w-8 rounded-full" src="/user.png" alt="Profile" width={32} height={32} />
                  <span className="ml-2 text-sm font-medium text-gray-700">Santosh VP</span>
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-white shadow-md border-b border-gray-200 fixed inset-x-0 top-0 z-50">
        <div className="flex justify-between h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex-shrink-0">
            <Image className="h-8 w-auto" src="/logo.svg" alt="Cuvette" width={32} height={32} />
          </Link>
          <div className="flex items-center">
            <div className="ml-4 flex items-center">
              <div className="flex items-center border border-gray-300 rounded-lg py-1 px-3">
                <Image className="h-8 w-8 rounded-full" src="/user.png" alt="Profile" width={32} height={32} />
                <span className="ml-2 text-sm font-medium text-gray-700">Santosh VP</span>
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-64 bg-white border-r border-gray-200 h-screen sticky top-0 lg:block hidden">
          <nav className="mt-5 px-2">
            <Link href="#" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-600 bg-gray-100">
              <HomeIcon className="mr-4 h-6 w-6 text-blue-600" />
              Fulltime Jobs
            </Link>
            <Link href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              <FolderIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              Other Jobs
              <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-green-100 text-green-800">
                New
              </span>
            </Link>
            <Link href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              <ClipboardIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              Applied
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-10">
          <JobSearchInterfaceComponent />
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2">
          <Link href="#" className="flex flex-col items-center">
            <HomeIcon className="h-6 w-6 text-blue-600" />
            <span className="text-xs text-gray-600">Jobs</span>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <FolderIcon className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600">Other</span>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <ClipboardIcon className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600">Applied</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
