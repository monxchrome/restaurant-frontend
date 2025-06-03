import { Sidebar } from '@/components/sidebar/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-[240px] flex-1 p-6">
                {children}
            </main>
        </div>
    )
}
