"use client"

import Link from "next/link"
import clsx from "clsx"
import Image from "next/image"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items = [], className = "" }: BreadcrumbProps) {
  return (
  <section className="">
  <nav
    className={clsx(
      "flex items-center text-[14px] md:text-[16px] xl:text-[18px] text-[#919191] py-4 overflow-x-auto scrollbar-none whitespace-nowrap space-x-2",
      className
    )}
    aria-label="breadcrumb"
  >
    {items.map((item, index) => {
      const isLast = index === items.length - 1

      return (
        <div key={index} className="flex items-center gap-2 text-[14px] md:text-[16px] xl:text-[18px] shrink-0">
          {/* Separator */}
          {index !== 0 && <span className="text-gray-400">|</span>}

          {/* Link or Text */}
          {item.href && !isLast ? (
            <Link
              href={item.href}
              className="text-black dark:text-white  hover:text-[#EFB24D] transition-colors duration-300 font-light"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-black dark:text-white ">{item.label}</span>
          )}
        </div>
      )
    })}
  </nav>
</section>

  )
}
