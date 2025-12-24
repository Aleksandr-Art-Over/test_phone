'use client'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toogleLight'
import { trunks } from '@/lib/data'
import { Phone, PhoneCall, Server, X } from 'lucide-react'
import { useState } from 'react'
import { useCalledStore } from '@/store/called.store'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Sidebar() {
    const [selectedInboundId, setSelectedInboundId] = useState<string>('ashkhabad')
    const [selectedOutboundId, setSelectedOutboundId] = useState<string>('mary')

    const { called, setCalled } = useCalledStore()

    // Состояние для диалпада
    const [isDialpadOpen, setIsDialpadOpen] = useState(false)
    const [dialedNumber, setDialedNumber] = useState('')

    // Кнопки диалпада
    const dialpadKeys = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['*', '0', '#'],
    ]

    const handleDialKey = (key: string) => {
        if (key === '⌫') {
            setDialedNumber(prev => prev.slice(0, -1))
        } else {
            setDialedNumber(prev => prev + key)
        }
    }

    const handleCall = () => {
        if (dialedNumber) {
            console.log('Исходящий вызов на:', dialedNumber)
            setCalled(true) // можно имитировать входящий/исходящий
            setIsDialpadOpen(false)
            // Здесь можно добавить реальную логику звонка
        }
    }

    return (
        <>
            <aside className='relative flex h-screen w-96 flex-col justify-between bg-sidebar px-6 py-8 border-r border-sidebar-border'>
                {/* Два потока транков */}
                <div className='flex gap-6'>
                    <div className='flex-1'>
                        <h3 className='mb-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                            Trunks
                        </h3>
                        <div className='space-y-1.5'>
                            {trunks.map(trunk => (
                                <Button
                                    key={trunk.id}
                                    variant={selectedInboundId === trunk.id ? 'default' : 'ghost'}
                                    size='lg'
                                    className={cn(
                                        'w-full justify-start gap-3 rounded-lg px-4 py-5 text-left',
                                        selectedInboundId === trunk.id
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'hover:bg-accent'
                                    )}
                                    onClick={() => setSelectedInboundId(trunk.id)}
                                >
                                    <Server className='h-5 w-5 shrink-0' />
                                    <span className='font-medium truncate'>{trunk.city.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className='flex-1'>
                        <h3 className='mb-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                            Trunks
                        </h3>
                        <div className='space-y-1.5'>
                            {trunks.map(trunk => (
                                <Button
                                    key={trunk.id}
                                    variant={selectedOutboundId === trunk.id ? 'default' : 'ghost'}
                                    size='lg'
                                    className={cn(
                                        'w-full justify-start gap-3 rounded-lg px-4 py-5 text-left',
                                        selectedOutboundId === trunk.id
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'hover:bg-accent'
                                    )}
                                    onClick={() => setSelectedOutboundId(trunk.id)}
                                >
                                    <Server className='h-5 w-5 shrink-0' />
                                    <span className='font-medium truncate'>{trunk.city.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Кнопки входящего звонка + статус */}
                <div className='mb-10 flex flex-col items-center gap-6'>
                    <div className='ring-8 ring-green-500/30 rounded-full'>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                'flex h-20 w-20 items-center justify-center rounded-full shadow-2xl',
                                called ? 'bg-green-500' : 'bg-green-500/80 hover:bg-green-500'
                            )}
                            onClick={() => setCalled(true)}
                        >
                            <PhoneCall className='h-10 w-10 text-white' />
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-white shadow-2xl hover:bg-red-600'
                        onClick={() => setCalled(false)}
                    >
                        <Phone className='h-10 w-10 rotate-135' />
                    </motion.button>
                </div>

                {/* Нижняя панель: набор номера + тема */}
                <div className='border-t border-sidebar-border pt-6'>
                    <div className='flex flex-col items-center gap-6'>
                        {/* Кнопка открытия диалпада */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsDialpadOpen(true)}
                            className='flex items-center gap-3 rounded-lg bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/80'
                        >
                            <PhoneCall className='h-5 w-5' />
                            <span className='font-medium'>Набор номера</span>
                        </motion.button>

                        <ModeToggle />
                    </div>
                </div>
            </aside>

            {/* Диалпад — оверлей по центру */}
            <AnimatePresence>
                {isDialpadOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'
                        onClick={() => setIsDialpadOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className='relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl'
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Крестик закрытия */}
                            <button
                                onClick={() => setIsDialpadOpen(false)}
                                className='absolute right-4 top-4 rounded-full p-2 hover:bg-accent'
                            >
                                <X className='h-5 w-5 text-muted-foreground' />
                            </button>

                            {/* Поле набранного номера */}
                            <div className='mb-8 text-center'>
                                <input
                                    type='text'
                                    value={dialedNumber || ' '}
                                    readOnly
                                    className='w-full bg-transparent text-center text-3xl font-light tracking-widest text-foreground outline-none'
                                    placeholder='Наберите номер'
                                />
                                {dialedNumber && (
                                    <button
                                        onClick={() => setDialedNumber('')}
                                        className='mt-2 text-sm text-muted-foreground hover:text-foreground'
                                    >
                                        Очистить
                                    </button>
                                )}
                            </div>

                            {/* Кнопки диалпада */}
                            <div className='grid grid-cols-3 gap-4'>
                                {dialpadKeys.flat().map(key => (
                                    <motion.button
                                        key={key}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDialKey(key === '⌫' ? '⌫' : key)}
                                        className='flex h-16 items-center justify-center rounded-full bg-accent text-2xl font-medium text-foreground hover:bg-accent/80'
                                    >
                                        {key === '⌫' ? '⌫' : key}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Кнопка вызова */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCall}
                                disabled={!dialedNumber}
                                className={cn(
                                    'mt-8 flex w-full items-center justify-center gap-3 rounded-full py-4 font-medium text-white shadow-lg transition-all',
                                    dialedNumber
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-gray-400 cursor-not-allowed'
                                )}
                            >
                                <PhoneCall className='h-6 w-6' />
                                Позвонить
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
