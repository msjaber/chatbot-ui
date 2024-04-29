"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { Brand } from "@/components/ui/brand"
import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div>
        <Brand theme={"light"} />
      </div>

      {/* <div className="mt-2 text-4xl font-bold">Delivery Associates</div> */}

      <Link
        className="mt-4 flex w-[200px] items-center justify-center rounded-md bg-gray-600 p-2 font-semibold text-white"
        href="/login"
      >
        Start Chatting
        <IconArrowRight className="ml-1" size={20} />
      </Link>
    </div>
  )
}
