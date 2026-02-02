'use client';
import { API_URL } from '@/lib/api';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Package,
  CheckCircle,
  Clock,
  Banknote,
  Eye,
  Trash2,
  Search,
  Filter,
  Phone,
  MapPin,
} from 'lucide-react';

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  customer_address: string;
  shipping_method: string;
  shipping_cost: number;
  payment_method: string;
  subtotal: number;
  total: number;
  status: string;
  items_count: number;
  created_at: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, selectedStatus, searchQuery]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_phone.includes(searchQuery) ||
        order.id.toString().includes(searchQuery)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('تم حذف الطلب بنجاح!');
        fetchOrders();
      }
    } catch (error) {
      alert('حدث خطأ أثناء حذف الطلب');
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert('تم تحديث حالة الطلب بنجاح!');
        fetchOrders();
      }
    } catch (error) {
      alert('حدث خطأ أثناء تحديث حالة الطلب');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'processing':
        return 'قيد المعالجة';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التوصيل';
      case 'cancelled':
        return 'ملغية';
      default:
        return status;
    }
  };

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + Number(o.total), 0),
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-black">إدارة الطلبات</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">متابعة وإدارة طلبات العملاء</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs md:text-sm mb-1 font-medium">إجمالي الطلبات</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-2 md:p-3 rounded-lg md:rounded-xl">
              <Package size={20} className="md:w-7 md:h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm mb-1 font-medium">قيد الانتظار</p>
              <p className="text-3xl font-bold text-blue-700">{stats.pending}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Clock size={28} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm mb-1 font-medium">مكتملة</p>
              <p className="text-3xl font-bold text-blue-700">{stats.completed}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <CheckCircle size={28} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm mb-1 font-medium">إجمالي المبيعات</p>
              <p className="text-3xl font-bold text-blue-700">₪{stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Banknote size={28} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="بحث برقم الطلب، اسم العميل، أو رقم الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-64">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="processing">قيد المعالجة</option>
              <option value="shipped">تم الشحن</option>
              <option value="delivered">تم التوصيل</option>
              <option value="cancelled">ملغية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse" dir="rtl">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-5 text-right text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[10%]">
                  رقم الطلب
                </th>
                <th className="px-6 py-5 text-right text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[20%]">
                  معلومات العميل
                </th>
                <th className="px-6 py-5 text-right text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[15%]">
                  المجموع
                </th>
                <th className="px-6 py-5 text-right text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[15%]">
                  الحالة
                </th>
                <th className="px-6 py-5 text-right text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[20%]">
                  تاريخ الطلب
                </th>
                <th className="px-6 py-5 text-center text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[20%]">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                    <Package size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">لا توجد طلبات</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-blue-50 transition-all duration-200 border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    {/* Order ID */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                          #
                        </span>
                        <span className="font-bold text-black">{order.id}</span>
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="font-bold text-black">{order.customer_name}</p>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone size={14} />
                          <span>{order.customer_phone}</span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{order.customer_city}</span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin size={14} />
                          <span className="line-clamp-1">{order.customer_address}</span>
                        </div>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-black">
                          ₪{Number(order.total).toFixed(2)}
                        </span>
                        <div className="text-sm text-gray-600">
                          {order.items_count} منتج
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-4 py-2 rounded-full text-sm font-bold border-2 focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="processing">قيد المعالجة</option>
                        <option value="shipped">تم الشحن</option>
                        <option value="delivered">تم التوصيل</option>
                        <option value="cancelled">ملغية</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <div className="text-lg font-bold text-black">
                          {new Date(order.created_at).toLocaleDateString('ar-EG')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleTimeString('ar-EG', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/admin/orders/${order.id}`)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-2"
                        >
                          <Eye size={16} />
                          <span className="text-sm">عرض التفاصيل</span>
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          <span className="text-sm">حذف</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden p-4 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto mb-4 opacity-50 text-gray-500" />
              <p className="text-lg font-medium text-gray-600">لا توجد طلبات</p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                      #
                    </span>
                    <span className="font-bold text-black">طلب رقم {order.id}</span>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border focus:outline-none ${getStatusColor(order.status)}`}
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="processing">قيد المعالجة</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="delivered">تم التوصيل</option>
                    <option value="cancelled">ملغية</option>
                  </select>
                </div>

                {/* Customer Info */}
                <div className="mb-3">
                  <h4 className="font-bold text-black mb-2">{order.customer_name}</h4>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Phone size={14} />
                      <span>{order.customer_phone}</span>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{order.customer_city}</span>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin size={14} />
                      <span className="line-clamp-2">{order.customer_address}</span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <span className="text-xs text-gray-500 block">المبلغ الإجمالي</span>
                    <span className="text-lg font-bold text-black">
                      ₪{Number(order.total).toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-600 block">
                      {order.items_count} منتج
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">تاريخ الطلب</span>
                    <div className="text-lg font-bold text-black">
                      {new Date(order.created_at).toLocaleDateString('ar-EG')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleTimeString('ar-EG', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    <Eye size={14} />
                    <span>عرض التفاصيل</span>
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="حذف"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
