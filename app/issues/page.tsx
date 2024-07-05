'use client';
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMdeReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";


const IssuesPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Title' />
      <SimpleMdeReact placeholder='Description' />
      <Button>Submit new Issue</Button>
    </div>
  )
}

export default IssuesPage
