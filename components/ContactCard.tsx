'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Phone } from 'lucide-react'
import type { Contact } from '@/types'

interface ContactCardProps {
    contact: Contact
    onClick: () => void // Добавляем обработчик клика
}

export function ContactCard({ contact, onClick }: ContactCardProps) {
    return (
        <Card
            className='p-4 flex flex-row bg-card border justify-between cursor-pointer transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1'
            onClick={onClick}
        >
            <div className='flex items-center gap-4 truncate'>
                <Avatar className='border-2 border-background w-14 h-14'>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='truncate'>
                    {/* Имя: используем primary-foreground для контраста на зеленом или foreground */}
                    <p className='font-sans text-xl text-card-foreground font-bold uppercase truncate leading-none'>
                        {contact.name.split(' ')[0]}
                    </p>
                    <p className='font-sans text-lg text-primary font-medium truncate'>
                        {contact.name.split(' ')[1]}
                    </p>

                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <span
                            className={`h-2 w-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)] ${
                                contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                        />
                        {contact.status === 'online' ? 'В сети' : 'Не в сети'}
                    </div>
                </div>
            </div>

            <div className='self-center text-muted-foreground hover:text-primary transition-colors'>
                <Phone size={28} />
            </div>
        </Card>
    )
}
