'use client';
import { API_URL } from '@/lib/api';

import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';
import { useLocale, useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const locale = useLocale();
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    phone: '',
    address: '',
    paymentMethod: 'cash',
  });
  
  const [deliveryCities, setDeliveryCities] = useState<Array<{ id: number; city_name: string; delivery_price: number }>>([]);
  const [selectedDeliveryCity, setSelectedDeliveryCity] = useState<{ id: number; city_name: string; delivery_price: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !showSuccessModal) {
      router.push('/cart');
    }
  }, [items.length, router, showSuccessModal]);

  // Fetch delivery cities from API
  useEffect(() => {
    const fetchDeliveryCities = async () => {
      try {
        const response = await fetch(`${API_URL}/delivery`);
        if (response.ok) {
          const cities = await response.json();
          setDeliveryCities(cities);
        }
      } catch (error) {
        console.error('Error fetching delivery cities:', error);
      }
    };

    fetchDeliveryCities();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.delivery-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من رقم الجوال
    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('يرجى إدخال رقم جوال صحيح (10 أرقام تبدأ بـ 05)\nمثال: 0501234567');
      return;
    }
    
    // التحقق من اختيار مدينة التوصيل
    if (!selectedDeliveryCity) {
      alert('يرجى اختيار مدينة التوصيل');
      return;
    }
    
    try {
      const orderData = {
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        customer_city: selectedDeliveryCity.city_name,
        customer_address: formData.address,
        shipping_method: 'express',
        shipping_cost: Number(selectedDeliveryCity.delivery_price),
        payment_method: formData.paymentMethod,
        subtotal: totalPrice,
        total: totalPrice + Number(selectedDeliveryCity.delivery_price),
        items: items.map(item => ({
          product_id: item.id,
          product_name: item.name,
          product_price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
      };


      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setOrderId(result.orderId);
        setShowSuccessModal(true);
        clearCart();
      } else {
        
        // إذا كانت هناك منتجات غير متوفرة، عرض تفاصيلها
        if (result.unavailableProducts && result.unavailableProducts.length > 0) {
          let errorMessage = result.message + '\n\n';
          result.unavailableProducts.forEach((product: any) => {
            errorMessage += `• ${product.name}: ${product.reason}\n`;
          });
          errorMessage += '\nيرجى تحديث السلة والمحاولة مرة أخرى.';
          alert(errorMessage);
        } else {
          alert('حدث خطأ أثناء إرسال الطلب: ' + (result.message || 'خطأ غير معروف') + '\n' + (result.error || ''));
        }
      }
    } catch (error: any) {
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.\nالخطأ: ' + (error?.message || error));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCitySelect = (city: { id: number; city_name: string; delivery_price: number }) => {
    setSelectedDeliveryCity(city);
    setFormData({
      ...formData,
      city: city.city_name,
    });
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const filteredCities = deliveryCities.filter(city =>
    city.city_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shippingCost = selectedDeliveryCity ? Number(selectedDeliveryCity.delivery_price) : 0;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0 && !showSuccessModal) {
    return null;
  }


  return (
    <>
      {showSuccessModal && orderId ? (
        <SuccessModal
          orderId={orderId}
          onClose={() => {
            setShowSuccessModal(false);
            router.push('/');
          }}
        />
      ) : null}
      <div className="min-h-screen bg-gray-50">
        <Header />
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2c2c2c] mb-8 text-center">
          {t('title')}
        </h1>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* قسم ملخص الطلب */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#2c2c2c] mb-4">{t('orderSummary')}</h2>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color_name || 'default'}`} className="flex gap-3 pb-3 border-b">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {(item.color_image_url || item.image_url) ? (
                        <Image
                          src={`${API_URL}${item.color_image_url || item.image_url}`}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl opacity-20">📦</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-[#2c2c2c] line-clamp-1">
                        {item.name}
                      </h3>
                      {item.color_name && (
                        <p className="text-xs text-gray-500">اللون: {item.color_name}</p>
                      )}
                      <p className="text-xs text-gray-500">{tCommon('quantity')}: {item.quantity}</p>
                      <p className="text-sm font-bold text-[#2c2c2c]">
                        {(Number(item.price) * item.quantity).toFixed(2)} ₪
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} ₪</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('shipping')}</span>
                  <span className="font-semibold">{shippingCost.toFixed(2)} ₪</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#2c2c2c] pt-2 border-t">
                  <span>{t('totalAmount')}</span>
                  <span className="text-[#d4af37]">{finalTotal.toFixed(2)} ₪</span>
                </div>
              </div>
            </div>
          </div>

          {/* قسم الفاتورة والشحن */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* معلومات الفاتورة والشحن */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-[#2c2c2c] mb-6">{t('billingShipping')}</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent outline-none transition-all"
                      placeholder={t('enterFullName')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      {t('deliveryCity')} *
                    </label>
                    <div className="relative delivery-dropdown">
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent outline-none transition-all cursor-pointer flex items-center justify-between bg-white"
                      >
                        <span className={selectedDeliveryCity ? 'text-gray-900' : 'text-gray-500'}>
                          {selectedDeliveryCity ? selectedDeliveryCity.city_name : t('selectDeliveryCity')}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                          <div className="p-3 border-b border-gray-200">
                            <div className="relative">
                              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder={t('searchCity')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10 pl-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent outline-none"
                              />
                            </div>
                          </div>
                          <div className="max-h-40 overflow-y-auto">
                            {filteredCities.length > 0 ? (
                              filteredCities.map((city) => (
                                <div
                                  key={city.id}
                                  onClick={() => handleCitySelect(city)}
                                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-b-0"
                                >
                                  <span className="text-gray-900">{city.city_name}</span>
                                  <span className="text-sm text-gray-600">₪ {Number(city.delivery_price).toFixed(2)}</span>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-gray-500 text-center">
                                لا توجد مدن متاحة
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      {t('address')} *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent outline-none transition-all resize-none"
                      placeholder={t('enterAddress')}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      {t('phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="^05\d{8}$"
                      maxLength={10}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent outline-none transition-all"
                      placeholder="05xxxxxxxx"
                      title="يرجى إدخال رقم جوال صحيح (10 أرقام تبدأ بـ 05)"
                    />
                  </div>
                </div>
              </div>

              {/* معلومات التوصيل */}
              {selectedDeliveryCity && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-[#2c2c2c] mb-6">معلومات التوصيل</h2>
                  
                  <div className="flex items-center gap-3 p-4 border-2 border-[#d4af37] bg-green-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#2c2c2c]" />
                    <div className="flex-1">
                      <div className="font-semibold text-[#2c2c2c]">{selectedDeliveryCity.city_name}</div>
                      <div className="text-sm text-gray-600">تكلفة التوصيل: ₪ {Number(selectedDeliveryCity.delivery_price).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* رسالة تنبيه إذا لم يتم اختيار مدينة */}
              {!selectedDeliveryCity && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-[#2c2c2c] mb-6">{t('deliveryAreas')}</h2>
                  
                  <div className="flex items-center gap-3 p-4 border-2 border-orange-300 bg-orange-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-orange-800">{t('pleaseSelectCity')}</div>
                      <div className="text-sm text-orange-600">{t('selectCityToKnowCost')}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* معلومات الدفع */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-[#2c2c2c] mb-6">{t('paymentInfo')}</h2>
                
                <label className="flex items-start gap-3 p-4 border-2 border-[#d4af37] bg-purple-50 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#2c2c2c] focus:ring-[#2c2c2c] mt-1"
                  />
                  <div>
                    <div className="font-semibold text-[#2c2c2c] mb-1">{t('cashOnDelivery')}</div>
                    <div className="text-sm text-gray-600">
                      {t('cashOnDeliveryDesc')}
                    </div>
                  </div>
                </label>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.push('/cart')}
                  className="flex-1 py-3 border-2 border-[#2c2c2c] text-[#2c2c2c] rounded-full hover:bg-gray-50 transition-colors font-semibold"
                >
                  {t('backToCart')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#2c2c2c] text-white rounded-full hover:bg-[#1a1a1a] transition-colors font-semibold text-lg"
                >
                  {t('placeOrder')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
