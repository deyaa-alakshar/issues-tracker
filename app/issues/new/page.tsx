'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMdeReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) =>{
    try {
      setIsSubmiting(true);
        await axios.post("/api/issues", data);
        router.push("/issues");
        setIsSubmiting(false);
    } catch (error) {
        setError("An unexpected error occurrd");
        setIsSubmiting(false);
    }

    })

  return (
    <div className='max-w-xl'>
        {error && (<Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>)}
        <form onSubmit={onSubmit} className=' space-y-3'>
            <TextField.Root placeholder='Title' {...register('title')} />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
                name="description"
                control={control}
                render={({field}) => <SimpleMdeReact placeholder='Description' {...field} />}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmiting} type='submit'>Submit new Issue {isSubmiting && <Spinner />}</Button>
        </form>
    </div>
  )
}

export default NewIssue
