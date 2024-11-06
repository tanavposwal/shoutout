"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'
import { signIn } from "next-auth/react"
import Image from 'next/image'
import Logo from "@/public/shoutout.svg"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false)

  const resendAction = (formData: FormData) => {
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    signIn("resend", formDataObj)
    setIsMagicLinkSent(true)
  }

  const handleOAuthLogin = (provider: string) => {
    // Handle OAuth login logic here
    console.log(`Logging in with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Image src={Logo} alt="shoutout" className="w-72 select-none" width={600} draggable={false} />
          <p className="text-gray-600">connect and express yourself</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6 space-y-4">
            <Button
              onClick={() => signIn('Google', {redirectTo: "/"})}
              className="w-full font-bold text-neutral-600 transition-colors"
              variant="outline"
            >
              <FaGoogle className="mr-1" /> Continue with Google
            </Button>
            <Button
              onClick={() => handleOAuthLogin('Facebook')}
              className="w-full font-bold text-neutral-600 transition-colors"
              variant="outline"
            >
              <FaFacebook className="mr-1" /> Continue with Facebook
            </Button>
            <Button
              onClick={() => handleOAuthLogin('Twitter')}
              className="w-full font-bold text-neutral-600 transition-colors"
              variant="outline"
            >
              <FaTwitter className="mr-1" /> Continue with Twitter
            </Button>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">or</span>
            </div>
          </div>

          <form action={resendAction}>
            <div className="mb-4">
              <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Input
                id="email-resend"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              variant={"destructive"}
            >
              Send Magic Link
            </Button>
          </form>
          
          {isMagicLinkSent && (
            <p className="text-center text-[#FF6D6D] font-bold">
              Magic link sent! Check your email.
            </p>
          )}
        </div>
        
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 shoutout. All rights reserved.
        </p>
      </div>
    </div>
  )
}