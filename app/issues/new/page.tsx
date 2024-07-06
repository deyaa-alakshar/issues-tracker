'use client';
import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMdeReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string,
  description: string
}
const NewIssue = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const [error, setError] = useState('')
  const router = useRouter()
  return (
    <div className='max-w-xl'>
        {error && (<Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>)}
        <form onSubmit={handleSubmit(async (data) =>{
            try {
                await axios.post("/api/issues", data);
                router.push("/issues")
            } catch (error) {
                setError("An unexpected error occurrd")
            }

            })} className=' space-y-3'>
            <TextField.Root placeholder='Title' {...register('title')} />
            <Controller
                name="description"
                control={control}
                render={({field}) => <SimpleMdeReact placeholder='Description' {...field} />}
            />
            <Button type='submit'>Submit new Issue</Button>
        </form>
    </div>
  )
}

export default NewIssue
