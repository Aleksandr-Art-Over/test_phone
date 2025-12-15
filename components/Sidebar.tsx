'use client'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toogleLight'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { trunks } from '@/lib/data'
import { Server, Settings } from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
    const [selectedTrunkId, setSelectedTrunkId] = useState<string>('ashkhabad') // по умолчанию первый

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
                                <p className='text-xs opacity-70'>{trunk.city.innerCity.name}</p>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Нижняя часть: тема и настройки */}
            <div className='flex flex-col gap-3 pt-4 border-t border-sidebar-border'>
                <div className='self-center'>
                    <ModeToggle />
                </div>

                <TooltipProvider>
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
                </TooltipProvider>
            </div>
        </aside>
    )
}
