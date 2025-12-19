'use client'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toogleLight'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { trunks } from '@/lib/data'
import { Phone, PhoneCall, Server, Settings, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Switch } from './ui/switch'
import { useFeatureStore } from '@/store/features.store'
import { useCalledStore } from '@/store/called.store'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
export function Sidebar() {
    const [selectedTrunkId, setSelectedTrunkId] = useState<string>('ashkhabad')
    const { offline, setOffline } = useFeatureStore()
    const { called, setCalled } = useCalledStore()
    return (
        <aside className='w-52 min-w-52 bg-sidebar p-4 flex flex-col justify-between border-r border-sidebar-border'>
            {/* Список транков */}
            <div className='flex-1 overflow-y-auto'>
                <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2'>
                    Транки
                </h3>

                <div className='space-y-2'>
                    {trunks.map(trunk => (
                        <Button
                            key={trunk.id}
                            variant={selectedTrunkId === trunk.id ? 'default' : 'ghost'}
                            className={`w-full justify-start gap-3 ${
                                selectedTrunkId === trunk.id
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    : 'hover:bg-accent'
                            }`}
                            onClick={() => setSelectedTrunkId(trunk.id)}
                        >
                            <Server className='h-5 w-5 shrink-0' />
                            <div className='text-left'>
                                <p className='font-medium'>{trunk.city.name}</p>
                                {/* <p className='text-xs opacity-70'>{trunk.city.innerCity.name}</p> */}
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
            <div className='flex gap-8 flex-col justify-center mb-20 self-center'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        'flex items-center justify-center w-28 h-20 rounded-xl bg-green-500 text-white shadow-2xl hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300'
                    )}
                    onClick={() => {
                        setCalled(true)
                    }}
                    aria-label='Принять вызов'
                >
                    <PhoneCall className='h-10 w-10' />
                </motion.button>

                {/* Кнопка "Отклонить" */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center justify-center w-28 h-20 rounded-xl bg-red-500 text-white shadow-2xl hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300'
                    onClick={() => {
                        setCalled(false)
                    }}
                    aria-label='Отклонить вызов'
                >
                    <Phone className='h-10 w-10 rotate-135' />
                </motion.button>
            </div>

            {/* Нижняя часть: тема и настройки */}
            <div className='flex flex-col gap-3 pt-4 border-t border-sidebar-border'>
                <div className='self-center'>
                    <ModeToggle />
                </div>
                <div className='self-center'>
                    <Switch checked={offline} onCheckedChange={setOffline} />
                </div>
                {/* <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' className='w-full'>
                                <Settings className='h-5 w-5 ml-2' />
                                <span className='ml-3 text-left flex-1'>Настройки</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='right'>
                            <p>Настройки</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> */}
            </div>
        </aside>
    )
}
