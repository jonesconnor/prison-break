"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface Product {
  id: string
  title: string
  description: string
  link: string
  image?: string
  keyContributor: "Cole" | "Harry" | "Connor"
}

const products: Product[] = [
  {
    id: "1",
    title: "Barebones",
    description: "Project Management - Minimalist Edition",
    link: "https://barebones-h1.vercel.app",
    image: "/barebones.png",
    keyContributor: "Harry"
  },
  {
    id: "2",
    title: "ParaNoia",
    description:
      "A secure, self-hosted tool for sharing secrets that vanish after a single view. Quickly transfer sensitive information with end-to-end encryption and one-time access, giving you full control over your data.",
    link: "https://ultraparanoia.vercel.app",
    image: "/paranoia-fullscreen.gif",
    keyContributor: "Connor"
  }
]

const contributorColors = {
  Cole: "bg-blue-500",
  Harry: "bg-purple-500", 
  Connor: "bg-green-500"
}

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const currentProduct = products[currentIndex]

  return (
    <section className="space-y-6">
      <SectionHeader>Built by Us</SectionHeader>
      <p className="text-muted-foreground text-left">Products and applications crafted by our team members</p>

      <div className="relative">
        <Card className="bg-card border-border overflow-hidden">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Product Image */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                {currentProduct.image ? (
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.title}
                    width={600}
                    height={337}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <span className="text-sm">Product Screenshot</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {currentProduct.title}    
                    </h3>
                    <span className={`${contributorColors[currentProduct.keyContributor]} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                      {currentProduct.keyContributor}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentProduct.description}
                  </p>
                </div>

                <Button
                  onClick={() => window.open(currentProduct.link, '_blank')}
                  variant="link"
                >
                  View Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Arrows */}
        {products.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border hover:bg-background/90"
              onClick={prevProduct}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border hover:bg-background/90"
              onClick={nextProduct}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Pagination Dots */}
        {products.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {products.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
