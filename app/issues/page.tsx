'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const IssuesPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Title' />
      <TextArea placeholder='Description' />
      <Button>Submit new Issue</Button>
    </div>
  )
}

export default IssuesPage
