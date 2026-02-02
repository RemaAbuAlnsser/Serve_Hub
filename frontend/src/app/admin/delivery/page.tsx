'use client';
import { API_URL } from '@/lib/api';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Truck,
  MapPin,
  Banknote,
} from 'lucide-react';
import AdminToast from '@/components/AdminToast';

interface DeliveryCity {
  id: number;
  city_name: string;
  city_name_en?: string;
  delivery_price: number;
  created_at: string;
  updated_at: string;
}

export default function DeliveryPage() {
  const [cities, setCities] = useState<DeliveryCity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCity, setEditingCity] = useState<DeliveryCity | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    city_name: '',
    city_name_en: '',
    delivery_price: '',
  });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_URL}/delivery`);
      const data = await response.json();
      setCities(Array.isArray(data) ? data : []);
    } catch (error) {
      setCities([]);
      showToastMessage('فشل تحميل المدن', 'error');
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingCity 
        ? `${API_URL}/delivery/${editingCity.id}`
        : `${API_URL}/delivery`;
      
      const method = editingCity ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city_name: formData.city_name,
          city_name_en: formData.city_name_en,
          delivery_price: parseFloat(formData.delivery_price),
        }),
      });

      const result = await response.json();

      if (result.success) {
        showToastMessage(
          editingCity ? 'تم تحديث المدينة بنجاح!' : 'تم إضافة المدينة بنجاح!',
          'success'
        );
        setIsModalOpen(false);
        setFormData({ city_name: '', city_name_en: '', delivery_price: '' });
        setEditingCity(null);
        fetchCities();
      } else {
        showToastMessage(result.message || 'حدث خطأ', 'error');
      }
    } catch (error) {
      showToastMessage('حدث خطأ أثناء حفظ المدينة', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (city: DeliveryCity) => {
    setEditingCity(city);
    setFormData({
      city_name: city.city_name,
      city_name_en: city.city_name_en || '',
      delivery_price: city.delivery_price.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه المدينة؟')) return;

    try {
      const response = await fetch(`${API_URL}/delivery/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        showToastMessage('تم حذف المدينة بنجاح!', 'success');
        fetchCities();
      } else {
        showToastMessage(result.message || 'فشل حذف المدينة', 'error');
      }
    } catch (error) {
      showToastMessage('فشل حذف المدينة', 'error');
    }
  };

  const resetForm = () => {
    setFormData({ city_name: '', city_name_en: '', delivery_price: '' });
    setEditingCity(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-black">إدارة التوصيل</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">إضافة وتعديل مدن التوصيل وأسعارها</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm md:text-base"
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          <span>إضافة مدينة</span>
        </button>
      </div>

      {/* Cities Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse" dir="rtl">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-5 text-right text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[15%]">
                  الرقم
                </th>
                <th className="px-6 py-5 text-right text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[35%]">
                  اسم المدينة
                </th>
                <th className="px-6 py-5 text-right text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[25%]">
                  سعر التوصيل
                </th>
                <th className="px-6 py-5 text-center text-sm font-bold text-black uppercase tracking-wider border-b-2 border-gray-200 w-[25%]">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {cities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-600">
                    <Truck size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">لا توجد مدن حالياً</p>
                    <p className="text-sm mt-2">اضغط على "إضافة مدينة" لإنشاء مدينة جديدة</p>
                  </td>
                </tr>
              ) : (
                cities.map((city, index) => (
                  <tr
                    key={city.id}
                    className={`hover:bg-blue-50 transition-all duration-200 border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    {/* ID */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                          #
                        </span>
                        <span className="font-bold text-black">{city.id}</span>
                      </div>
                    </td>

                    {/* City Name */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <MapPin size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-black text-lg">{city.city_name}</p>
                          <p className="text-sm text-gray-600">
                            تم الإنشاء: {new Date(city.created_at).toLocaleDateString('ar-EG')}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Delivery Price */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Banknote size={20} className="text-blue-600" />
                        <span className="text-xl font-bold text-black">
                          ₪{Number(city.delivery_price).toFixed(2)}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(city)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                        >
                          <Edit size={16} />
                          <span>تعديل</span>
                        </button>
                        <button
                          onClick={() => handleDelete(city.id)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          <span>حذف</span>
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
          {cities.length === 0 ? (
            <div className="text-center py-12">
              <Truck size={48} className="mx-auto mb-4 opacity-50 text-gray-500" />
              <p className="text-lg font-medium text-gray-600">لا توجد مدن حالياً</p>
              <p className="text-sm mt-2 text-gray-500">اضغط على "إضافة مدينة" لإنشاء مدينة جديدة</p>
            </div>
          ) : (
            cities.map((city, index) => (
              <div key={city.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                {/* City Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                      #
                    </span>
                    <span className="font-bold text-black">مدينة رقم {city.id}</span>
                  </div>
                </div>

                {/* City Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-black">{city.city_name}</p>
                      <p className="text-xs text-gray-600">
                        تم الإنشاء: {new Date(city.created_at).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Banknote size={16} className="text-blue-600" />
                    <span className="text-sm text-gray-600">سعر التوصيل:</span>
                    <span className="text-lg font-bold text-black">
                      ₪{Number(city.delivery_price).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-200 mt-3">
                  <button
                    onClick={() => handleEdit(city)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit size={14} />
                    <span>تعديل</span>
                  </button>
                  <button
                    onClick={() => handleDelete(city.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit City Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">
                {editingCity ? 'تعديل مدينة' : 'إضافة مدينة جديدة'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-600 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* City Name Arabic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المدينة (عربي) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city_name}
                  onChange={(e) => setFormData({ ...formData, city_name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="مثال: عمان"
                />
              </div>

              {/* City Name English */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City Name (English)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={formData.city_name_en}
                  onChange={(e) => setFormData({ ...formData, city_name_en: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Example: Amman"
                />
              </div>

              {/* Delivery Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  سعر التوصيل ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.delivery_price}
                  onChange={(e) => setFormData({ ...formData, delivery_price: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="0.00"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium disabled:opacity-50"
                >
                  {isLoading ? 'جاري الحفظ...' : editingCity ? 'تحديث' : 'إضافة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <AdminToast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
