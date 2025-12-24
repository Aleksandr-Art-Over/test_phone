import { Sidebar } from '@/components/Sidebar'
import { ContactGrid } from '@/components/ContactGrid'

export default function Home() {
    return (
        <div className='flex h-screen bg-background'>
            <Sidebar />
            <main className='flex-1 flex flex-col p-4 sm:p-6 lg:p-2 overflow-hidden'>
                <ContactGrid />
            </main>
        </div>
    )
}
