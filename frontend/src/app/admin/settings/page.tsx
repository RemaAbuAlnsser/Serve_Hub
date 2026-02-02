'use client';
import { API_URL } from '@/lib/api';

import { useState, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  X,
  Save,
  RefreshCw,
  Globe,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
} from 'lucide-react';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Site Images State (multiple images)
  const [currentSiteImages, setCurrentSiteImages] = useState<Array<{id?: number; url: string}>>([]);
  const [newSiteImages, setNewSiteImages] = useState<Array<{url: string; preview: string}>>([]);
  
  // Logo State
  const [currentLogo, setCurrentLogo] = useState<string>('');
  const [newLogo, setNewLogo] = useState<string>('');
  const [logoPreview, setLogoPreview] = useState<string>('');

  // Website Information State
  const [siteInfo, setSiteInfo] = useState({
    site_name: '',
    site_description: '',
    contact_phone: '',
    address: '',
    facebook_url: '',
    instagram_url: '',
    whatsapp_url: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/settings`);
      const data = await response.json();
      
      // Load site images (assuming backend returns array)
      if (data.site_images && Array.isArray(data.site_images)) {
        setCurrentSiteImages(data.site_images);
      }
      setCurrentLogo(data.site_logo || '');
      
      // Load website information
      setSiteInfo({
        site_name: data.site_name ?? '',
        site_description: data.site_description ?? '',
        contact_phone: data.contact_phone ?? '',
        address: data.address ?? '',
        facebook_url: data.facebook_url ?? '',
        instagram_url: data.instagram_url ?? '',
        whatsapp_url: data.whatsapp_url ?? ''
      });
    } catch (error) {
    }
  };

  const handleSiteImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          const preview = reader.result as string;
          
          // Upload to server
          const formData = new FormData();
          formData.append('image', file);

          try {
            const response = await fetch(`${API_URL}/upload/category-image`, {
              method: 'POST',
              body: formData,
            });

            const result = await response.json();
            if (result.success) {
              setNewSiteImages(prev => [...prev, { url: result.imageUrl, preview }]);
            }
          } catch (error) {
          }
        };
        
        reader.readAsDataURL(file);
      }
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(`${API_URL}/upload/company-logo`, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          setNewLogo(result.imageUrl);
        }
      } catch (error) {
      }
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);

    try {
      const updateData: any = {};
      
      // Always include site images - either new ones or current ones
      if (newSiteImages.length > 0) {
        updateData.site_images = newSiteImages.map(img => img.url);
      } else if (currentSiteImages.length > 0) {
        updateData.site_images = currentSiteImages.map(img => img.url);
      }
      
      // Always include logo - either new one or current one
      if (newLogo) {
        updateData.site_logo = newLogo;
      } else if (currentLogo) {
        updateData.site_logo = currentLogo;
      }

      // Add website information to update data
      updateData.site_name = siteInfo.site_name;
      updateData.site_description = siteInfo.site_description;
      updateData.contact_phone = siteInfo.contact_phone;
      updateData.address = siteInfo.address;
      updateData.facebook_url = siteInfo.facebook_url;
      updateData.instagram_url = siteInfo.instagram_url;
      updateData.whatsapp_url = siteInfo.whatsapp_url;

      const response = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (result.success) {
        // Update current images - replace all existing with new ones
        if (newSiteImages.length > 0) {
          setCurrentSiteImages(newSiteImages.map(img => ({ url: img.url })));
          setNewSiteImages([]);
        }
        
        if (newLogo) {
          setCurrentLogo(newLogo);
          setNewLogo('');
          setLogoPreview('');
        }

        alert('تم حفظ الإعدادات بنجاح!');
      } else {
        alert('حدث خطأ أثناء حفظ الإعدادات');
      }
    } catch (error) {
      alert('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const removeNewSiteImage = (index: number) => {
    setNewSiteImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeCurrentSiteImage = (index: number) => {
    setCurrentSiteImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleResetLogo = () => {
    setNewLogo('');
    setLogoPreview('');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">الإعدادات</h1>
        <p className="text-blue-600 mt-2">إدارة صور الموقع واللوجو ومعلومات الموقع</p>
      </div>

      <div className="space-y-8">
        {/* Site Image Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b-2 border-blue-200">
            <h2 className="text-2xl font-bold text-black">صورة الموقع</h2>
            <p className="text-blue-600 text-sm mt-1">
              الصور التي تظهر في الموقع
            </p>
          </div>

          <div className="p-6">
            {/* Current Site Images */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-black mb-4">الصور الحالية ({currentSiteImages.length})</h3>
              {currentSiteImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentSiteImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={`${API_URL}${image.url}`}
                        alt={`Site Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeCurrentSiteImage(index)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <ImageIcon size={48} className="mx-auto text-gray-500 opacity-50 mb-2" />
                  <p className="text-gray-600">لا توجد صور حالية</p>
                </div>
              )}
            </div>

            {/* New Site Images Upload */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4">رفع صور جديدة</h3>
              
              {/* Warning Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-yellow-600 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800 mb-1">تنبيه مهم</h4>
                    <p className="text-sm text-yellow-700">
                      عند رفع صور جديدة، سيتم <strong>حذف جميع الصور الحالية</strong> واستبدالها بالصور الجديدة فقط.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 hover:border-blue-500 transition-colors mb-4">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="text-blue-600 mb-4" size={48} />
                  <p className="text-blue-600 mb-4 text-center">
                    اضغط لرفع صور متعددة للموقع
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSiteImagesChange}
                    className="hidden"
                    id="site-images-upload"
                  />
                  <label
                    htmlFor="site-images-upload"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    اختر صور متعددة
                  </label>
                </div>
              </div>

              {/* New Images Preview */}
              {newSiteImages.length > 0 && (
                <div>
                  <h4 className="text-md font-bold text-black mb-3">الصور الجديدة ({newSiteImages.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {newSiteImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.preview}
                          alt={`New Image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border-2 border-blue-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewSiteImage(index)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                          جديدة #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b-2 border-blue-200">
            <h2 className="text-2xl font-bold text-black">لوجو الموقع</h2>
            <p className="text-blue-600 text-sm mt-1">
              الشعار الذي يظهر في رأس الموقع
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Logo */}
              <div>
                <h3 className="text-lg font-bold text-black mb-4">اللوجو الحالي</h3>
                <div className="border-2 border-blue-200 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                  {currentLogo ? (
                    <div className="relative">
                      <div className="bg-white p-4 rounded-lg flex items-center justify-center h-64">
                        <img
                          src={`${API_URL}${currentLogo}`}
                          alt="Current Logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        نشط
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-blue-600">
                      <ImageIcon size={48} className="opacity-50 mb-2" />
                      <p className="text-sm">لا يوجد لوجو حالي</p>
                    </div>
                  )}
                </div>
              </div>

              {/* New Logo Upload */}
              <div>
                <h3 className="text-lg font-bold text-black mb-4">رفع لوجو جديد</h3>
                <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 hover:border-blue-500 transition-colors">
                  {logoPreview ? (
                    <div className="relative">
                      <div className="bg-white p-4 rounded-lg flex items-center justify-center h-64">
                        <img
                          src={logoPreview}
                          alt="New Logo Preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleResetLogo}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        جديد
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                      <Upload className="text-[#8b7355] mb-4" size={48} />
                      <p className="text-[#8b7355] mb-4 text-center">
                        اضغط لرفع لوجو جديد
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="px-6 py-3 bg-gradient-to-r from-[#2c2c2c] to-[#8b7355] text-white rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        اختر لوجو
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Website Information Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b-2 border-blue-200">
            <h2 className="text-2xl font-bold text-black">معلومات الموقع</h2>
            <p className="text-blue-600 text-sm mt-1">
              إعدادات الموقع الأساسية ومعلومات التواصل
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Site Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <Globe size={16} className="text-blue-600" />
                اسم الموقع
              </label>
              <input
                type="text"
                value={siteInfo.site_name}
                onChange={(e) => setSiteInfo({...siteInfo, site_name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="أدخل اسم الموقع"
              />
            </div>

            {/* Site Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <Globe size={16} className="text-blue-600" />
                وصف الموقع
              </label>
              <textarea
                value={siteInfo.site_description}
                onChange={(e) => setSiteInfo({...siteInfo, site_description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="أدخل وصف الموقع"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <Phone size={16} className="text-blue-600" />
                رقم التلفون
              </label>
              <input
                type="tel"
                value={siteInfo.contact_phone}
                onChange={(e) => setSiteInfo({...siteInfo, contact_phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="أدخل رقم التلفون"
                dir="ltr"
              />
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <Globe size={16} className="text-blue-600" />
                العنوان
              </label>
              <input
                type="text"
                value={siteInfo.address}
                onChange={(e) => setSiteInfo({...siteInfo, address: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="أدخل عنوان المتجر"
              />
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Facebook */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                  <Facebook size={16} className="text-blue-600" />
                  رابط الفيسبوك
                </label>
                <input
                  type="url"
                  value={siteInfo.facebook_url}
                  onChange={(e) => setSiteInfo({...siteInfo, facebook_url: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="https://facebook.com/yourpage"
                  dir="ltr"
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                  <Instagram size={16} className="text-blue-600" />
                  رابط الانستجرام
                </label>
                <input
                  type="url"
                  value={siteInfo.instagram_url}
                  onChange={(e) => setSiteInfo({...siteInfo, instagram_url: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="https://instagram.com/yourpage"
                  dir="ltr"
                />
              </div>
            </div>

            {/* WhatsApp Business */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <MessageCircle size={16} className="text-blue-600" />
                رقم الواتساب بزنس
              </label>
              <input
                type="tel"
                value={siteInfo.whatsapp_url}
                onChange={(e) => setSiteInfo({...siteInfo, whatsapp_url: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="مثال: +972501234567"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1">
                أدخل الرقم بالصيغة الدولية مع رمز البلد (مثال: +972501234567)
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-black">حفظ التغييرات</p>
              <p className="text-sm text-blue-600 mt-1">
                احفظ جميع التغييرات على صور الموقع واللوجو ومعلومات الموقع
              </p>
            </div>
            <button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>حفظ التغييرات</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
