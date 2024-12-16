"use client";

import { useState, useRef, useEffect } from "react";
import { Wand2, Sparkles, Clock, Mic, Play, Pause, RotateCcw, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { storyService } from "@/app/api/storyService";

export default function StoryGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("15");
  const [voiceType, setVoiceType] = useState("alloy");
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dots, setDots] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add dots animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? "" : prev + ".");
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
      setDots("");
    };
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);

      const videoUrl = await storyService.generateStory({
        headline: topic,
        target_duration: duration,
        voice_type: voiceType
      });

      setVideoUrl(videoUrl);
      setVideoGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setVideoGenerated(false);
    setIsPlaying(false);
    setVideoUrl(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleDownload = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 flex items-center justify-center">
      <Card className="w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 flex flex-col justify-center">
            <CardHeader className="p-0">
              <CardTitle className="text-4xl font-bold mb-4">
                AI Story Generator
              </CardTitle>
            </CardHeader>
            <p className="text-lg mb-6">Create engaging Instagram stories in seconds with the power of AI</p>
            <div className="flex space-x-2">
              <Sparkles className="w-6 h-6" />
              <Clock className="w-6 h-6" />
              <Mic className="w-6 h-6" />
            </div>
          </div>
          <CardContent className="lg:w-3/5 p-8 space-y-6">
            {error && (
              <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="topic" className="text-sm font-medium text-gray-700">
                Enter your topic
              </label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What's your story about?"
                className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Video Duration
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 transition-colors">
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
              <label className="text-sm font-medium text-gray-700">
                Voice Style
              </label>
              <Select value={voiceType} onValueChange={setVoiceType}>
                <SelectTrigger className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 transition-colors">
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
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating || videoGenerated}
            >
              <Wand2 className="mr-2 h-5 w-5" />
              {isGenerating ? `Generating${dots}` : "Generate Story"}
            </Button>

            {videoGenerated && videoUrl && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Generated Video</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls
                    src={videoUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={handlePlayPause}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Play
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
