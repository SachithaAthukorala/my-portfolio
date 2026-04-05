import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1120] flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen" style={{ marginLeft: '240px' }}>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
