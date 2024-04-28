import React from 'react'

interface MaxWidthWrapperProps{
    children: React.ReactNode;
}

const MaxWidthWrapper:React.FC<MaxWidthWrapperProps> = ({
    children,
}) => {
  return (
        <div className='mx-auto w-full  max-w-screen-xl px-2.5 md:px-20 lg:px-2'>
            {children}
        </div>
  )
}

export default MaxWidthWrapper