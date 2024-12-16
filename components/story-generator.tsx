"use client"

import { useState } from "react"
import { Wand2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function StoryGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Story Generator
          </CardTitle>
          <CardDescription className="text-lg">
            Create engaging Instagram stories in seconds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Enter your topic
            </label>
            <Input
              id="topic"
              placeholder="What's your story about?"
              className="h-12 text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Video Duration
            </label>
            <Select defaultValue="15">
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Duration in seconds</SelectLabel>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="45">45 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Voice Style
            </label>
            <Select defaultValue="alloy">
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available voices</SelectLabel>
                  <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
                  <SelectItem value="echo">Echo (Male)</SelectItem>
                  <SelectItem value="fable">Fable (Female)</SelectItem>
                  <SelectItem value="onyx">Onyx (Male)</SelectItem>
                  <SelectItem value="nova">Nova (Female)</SelectItem>
                  <SelectItem value="shimmer">Shimmer (Female)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full h-12 text-lg font-medium"
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Wand2 className="mr-2 h-5 w-5" />
            {isGenerating ? "Generating..." : "Generate Story"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

