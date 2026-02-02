'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  LayoutDashboard,
  FileText,
  Building2,
  Package,
  ShoppingCart,
  Settings,
  ChevronRight,
  LogOut,
  Store,
  Truck,
} from 'lucide-react';
import { API_URL } from '@/lib/api';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [unreadOrdersCount, setUnreadOrdersCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // تحميل اسم الموقع من API
    const loadSiteName = async () => {
      try {
        const response = await fetch(`${API_URL}/settings`);
        const data = await response.json();
        setSiteName(data.site_name || 'Sprint Store');
      } catch (error) {
        setSiteName('Sprint Store');
      }
    };

    // تحميل عدد الطلبات غير المقروءة
    const loadUnreadCount = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/unread/count`);
        const data = await response.json();
        setUnreadOrdersCount(data.unread_count || 0);
      } catch (error) {
        setUnreadOrdersCount(0);
      }
    };

    loadSiteName();
    loadUnreadCount();

    // تحديث العدد كل 30 ثانية للحصول على تحديثات في الوقت الفعلي
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const isLoginPage = pathname === '/admin';

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'categories', label: 'الفئات', icon: FileText, path: '/admin/categories' },
    { id: 'companies', label: 'الشركات', icon: Building2, path: '/admin/companies' },
    { id: 'products', label: 'المنتجات', icon: Package, path: '/admin/products' },
    { id: 'orders', label: 'الطلبات', icon: ShoppingCart, path: '/admin/orders' },
    { id: 'delivery', label: 'التوصيل', icon: Truck, path: '/admin/delivery' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, path: '/admin/settings' },
  ];

  const handleMenuClick = async (item: any) => {
    setActiveMenu(item.id);
    
    // إذا كان المستخدم يضغط على الطلبات، قم بتحديد جميع الطلبات كمقروءة
    if (item.id === 'orders' && unreadOrdersCount > 0) {
      try {
        await fetch(`${API_URL}/orders/mark-read`, {
          method: 'PUT',
        });
        setUnreadOrdersCount(0);
      } catch (error) {
        console.error('Error marking orders as read:', error);
      }
    }
    
    if (item.path) {
      router.push(item.path);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute redirectTo="/admin">
    <div className="flex flex-row-reverse min-h-screen bg-white">
      {/* Sidebar */}
      <aside className={`bg-white shadow-xl flex flex-col border-r border-gray-200 fixed right-0 top-0 h-screen transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}>
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <ChevronRight size={24} />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-black">{siteName}</h1>
              <p className="text-sm text-gray-600 mt-1">لوحة التحكم</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = mounted && pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gray-100 text-black shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={isActive ? 'text-black' : 'text-gray-600'}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.id === 'orders' && unreadOrdersCount > 0 && (
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                      {unreadOrdersCount}
                    </div>
                  )}
                  {isActive && (
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-white bg-black hover:bg-gray-800 transition-all duration-300 mb-3 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Store size={20} />
              <span className="font-medium">عرض المتجر</span>
            </div>
          </button>

          <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1">
              <p className="text-black font-medium text-sm">{user?.name || 'Admin'}</p>
              <p className="text-gray-600 text-xs">{user?.role === 'admin' ? 'مدير' : 'مستخدم'}</p>
            </div>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 mt-3 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <span className="font-medium">تسجيل الخروج</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Toggle Button when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 right-4 z-50 p-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        >
          <ChevronRight size={24} className="rotate-180" />
        </button>
      )}

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-0'}`}>
        {children}
      </main>
    </div>
    </ProtectedRoute>
  );
}
