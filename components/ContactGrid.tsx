'use client'

import { useState } from 'react'
import { contacts } from '@/lib/data'
import { ContactCard } from './ContactCard'
import { PaginationControls } from './PaginationControls'
import { AnimatePresence, motion } from 'framer-motion'
import type { Contact } from '@/types'

const ITEMS_PER_PAGE = 21

export function ContactGrid() {
    const [currentPage, setCurrentPage] = useState(1)
    const [callingContact, setCallingContact] = useState<Contact | null>(null)

    const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE)

    const currentContacts = contacts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const handleContactClick = (contact: Contact) => {
        setCallingContact(contact)
    }

    const handleEndCall = () => {
        setCallingContact(null)
    }

    const pageKey = currentPage

    return (
        <>
            <div className='flex-1 flex flex-col'>
                <div className='flex-1 mb-4 p-2 overflow-y-auto'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={pageKey}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className='grid grid-cols-[repeat(auto-fill,minmax(550px,1fr))] gap-6'
                        >
                            {currentContacts.map((contact, idx) => (
                                <motion.div
                                    key={`${pageKey}-${idx}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                                >
                                    <ContactCard
                                        contact={contact}
                                        onClick={() => handleContactClick(contact)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className='flex justify-center pt-5 pb-[23px] border-t border-sidebar-border'>
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* Панель звонка */}
            <AnimatePresence></AnimatePresence>
        </>
    )
}
