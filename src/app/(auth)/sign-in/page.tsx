'use client'

import { FormEvent, useState } from 'react'
import { authClient } from '../../../../client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    await authClient.signIn.email(
      { email, password },
      {
        onRequest: () => {
          setPending(true)
        },
        onError: (error) => {
          setPending(false)
          setError(error.error.message)
        },
        onSuccess: () => {
          setPending(false)
          router.push('/') // Redirect after successful sign-up
        }
      }
    )
  }

  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <div className='max-w-md p-6 bg-white rounded-lg shadow-md text-black flex-col flex gap-4'>
        <h2 className='text-2xl font-bold '>Sign In</h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full p-2 border border-gray-300 rounded'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full p-2 border border-gray-300 rounded'
          />
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
            Sign In
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link className='text-blue-600' href={'/sign-up'}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
