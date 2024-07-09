"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames';

const Navbar = () => {
    const currentPath = usePathname();

    const links = [
    {href: "/", label: "Dashboard"},
    {href: "/issues/list", label: "Issues"}
    ]


    return (
    <nav className='flex space-x-5 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map((link) => <li key={link.href} className={classNames({
            'text-zinc-900': link.href === currentPath,
            'text-zinc-500': link.href !== currentPath,
            'hover:text-zinc-800 transition-colors': true
        })}><Link href={link.href}>{link.label}</Link></li>)}
      </ul>
    </nav>
  )
}

export default Navbar
