import { SignInButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'

const ButtonSignIn = () => {
  return (
    <div>
        <SignInButton>
            <Button variant={"mainaccent"}>Sign in</Button>
        </SignInButton>
    </div>
  )
}

export default ButtonSignIn