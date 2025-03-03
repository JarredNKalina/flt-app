'use client'

import Link from 'next/link'

export default function EmailVerifiedPage() {
  return (
    <div>
      <h1>Email verified</h1>
      <p>Your email has been verified.</p>
      <Link href='/'>Go to home</Link>
    </div>
  )
}
