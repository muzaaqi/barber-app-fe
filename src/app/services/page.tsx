"use client"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { useState } from "react"

const SevicesPage = () => {
  const [servicePage, setServicePage] = useState("POTONG")
  const handleSwitch = (page: string) => {
    setServicePage(page)    
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <ButtonGroup>
        <Button onClick={() => handleSwitch("POTONG")} variant={servicePage === "POTONG" ? "default" : "secondary"}>POTONG</Button>
        <Button onClick={() => handleSwitch("PRODUK")} variant={servicePage === "PRODUK" ? "default" : "secondary"}>PRODUK</Button>
      </ButtonGroup>
    </div>
  )
}

export default SevicesPage