import { SignUpButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'

const ButtonSignUp = () => {
  return (
    <div>
        <SignUpButton mode="redirect">
            <Button variant={"secondary"}>
                Sign up
            </Button>
        </SignUpButton>
    </div>
  )
}

export default ButtonSignUp