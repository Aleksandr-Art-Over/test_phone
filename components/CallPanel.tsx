'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { PhoneOff, MicIcon, Speaker, VolumeOff } from 'lucide-react'
import type { Contact } from '@/types'
import { motion } from 'framer-motion'
import { useClickAway } from '@reactuses/core'
import { useRef, useState } from 'react'

interface CallPanelProps {
    contact: Contact
    onEndCall: () => void
}

export function CallPanel({ contact, onEndCall }: CallPanelProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    useClickAway(modalRef, () => onEndCall())
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'tween', duration: 0.3 }}
                className='fixed inset-0 z-40 bg-black/50'
            />
            <motion.div
                ref={modalRef}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className='fixed inset-x-0 bottom-0 h-1/2 bg-background border-t-2 border-primary rounded-t-3xl shadow-2xl flex flex-col items-center justify-center gap-8 z-50'
            >
                <div className='w-16 h-2 bg-gray-400 rounded-full -mt-2' />{' '}
                {/* "ручка" для свайпа */}
                <Avatar className='h-32 w-32 ring-8 ring-primary/20'>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className='text-5xl'>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='text-center'>
                    <h2 className='text-3xl font-semibold'>{contact.name}</h2>
                    <p className='text-lg text-muted-foreground mt-2'>Звонок...</p>
                </div>
                <div className='flex gap-8'>
                    <Button size='icon' variant='ghost' className='h-12 w-12 rounded-full'>
                        <MicIcon className='h-7 w-7' />
                    </Button>
                    <Button size='icon' variant='ghost' className='h-12 w-12 rounded-full'>
                        <Speaker className='h-7 w-7' />
                    </Button>
                    <Button size='icon' variant='ghost' className='h-12 w-12 rounded-full'>
                        <VolumeOff className='h-7 w-7' />
                    </Button>
                </div>
                <Button
                    size='lg'
                    variant='destructive'
                    className='rounded-full w-16 h-16'
                    onClick={onEndCall}
                >
                    <PhoneOff className='h-7 w-7' />
                </Button>
            </motion.div>
        </>
    )
}
