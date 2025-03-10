import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient, Role } from '@prisma/client'
import { customSession, openAPI } from 'better-auth/plugins'
import { resend } from './email'

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: 'fortheloveoftrivia@resend.dev',
        to: user.email,
        subject: 'Reset your password',
        text: `Click the link to reset your password: ${url}`
      })
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`
      resend.emails.send({
        from: 'fortheloveoftrivia@resend.dev',
        subject: 'For the Love of Trivia - Verify Your Email',
        to: user.email,
        text: `Click this link to verify your email: ${verificationUrl}`
      })
    }
  },
  plugins: [
    openAPI(),
    customSession(async ({ user, session }) => {
      const role = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      })
      return {
        user: {
          ...user,
          role: role?.role
        },
        session
      }
    })
  ]
})
