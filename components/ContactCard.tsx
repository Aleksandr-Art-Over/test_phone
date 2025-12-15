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
            className='p-4 flex flex-row justify-between cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1'
            onClick={onClick}
        >
            <div className='flex items-center gap-4 truncate'>
                <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='truncate'>
                    <p className='font-semibold text-gray-800 dark:text-gray-200 truncate'>
                        {contact.name}
                    </p>
                    <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span
                            className={`h-2 w-2 rounded-full ${
                                contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                        />
                        {contact.status === 'online' ? 'В сети' : 'Не в сети'}
                    </div>
                </div>
            </div>

            {/* Маленькая иконка звонка в углу */}
            <div className='self-center opacity-60'>
                <Phone className='h-5 w-5' />
            </div>
        </Card>
    )
}
