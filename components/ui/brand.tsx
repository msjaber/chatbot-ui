"use client"

import Link from "next/link"
import { FC } from "react"
import DarkDALogo from "../icons/dark-logo.png"
import LightDALogo from "../icons/light-logo.svg"
import Image from "next/image"
import { DALogo } from "../icons/da-logo-svg"
interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <Link
      className="flex cursor-pointer flex-col items-center hover:opacity-50"
      href="https://deliveryassociates.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="mb-2">
        <DALogo theme={theme === "dark" ? "light" : "dark"} scale={0.4} />
      </div>

      <div className="text-4xl font-bold tracking-wide"></div>
    </Link>
  )
}
