# دليل إضافة حقول اللغة الإنجليزية في لوحة الإدارة

## ✅ قاعدة البيانات جاهزة

جميع الأعمدة الإنجليزية موجودة في قاعدة البيانات:
- categories: `name_en`, `description_en`
- subcategories: `name_en`, `description_en`
- products: `name_en`, `description_en`
- companies: `name_en`
- delivery_cities: `city_name_en`

## 📝 التعديلات المطلوبة

### 1. نموذج الفئات (Categories)

**الملف:** `frontend/src/app/admin/categories/page.tsx`

#### أ. تحديث الـ Interface:
```typescript
interface Category {
  id: number;
  name: string;
  name_en?: string;  // إضافة
  description: string;
  description_en?: string;  // إضافة
  image_url?: string;
  created_at: string;
}
```

#### ب. تحديث formData:
```typescript
const [formData, setFormData] = useState({
  name: '',
  name_en: '',  // إضافة
  description: '',
  description_en: '',  // إضافة
  image_url: '',
});
```

#### ج. إضافة حقول في النموذج (بعد حقل الاسم العربي):
```tsx
{/* Category Name English */}
<div>
  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
    Category Name (English)
  </label>
  <input
    type="text"
    dir="ltr"
    value={formData.name_en}
    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
    className="w-full px-4 py-3 border-2 border-[#e8e8c8] rounded-xl focus:outline-none focus:border-[#5E4A45] transition-colors"
    placeholder="Example: Electronics"
  />
</div>

{/* Description English */}
<div>
  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
    Description (English)
  </label>
  <textarea
    dir="ltr"
    value={formData.description_en}
    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
    rows={4}
    className="w-full px-4 py-3 border-2 border-[#e8e8c8] rounded-xl focus:outline-none focus:border-[#5E4A45] transition-colors resize-none"
    placeholder="Category description..."
  />
</div>
```

#### د. تحديث handleEdit:
```typescript
const handleEdit = (category: Category) => {
  setEditingCategory(category);
  setFormData({
    name: category.name,
    name_en: category.name_en || '',  // إضافة
    description: category.description || '',
    description_en: category.description_en || '',  // إضافة
    image_url: category.image_url || '',
  });
  // ...
};
```

---

### 2. نموذج المنتجات (Products)

**الملف:** `frontend/src/app/admin/products/page.tsx`

#### أ. تحديث الـ Interface:
```typescript
interface Product {
  id: number;
  name: string;
  name_en?: string;  // إضافة
  description: string;
  description_en?: string;  // إضافة
  // ... باقي الحقول
}
```

#### ب. تحديث formData:
```typescript
const [formData, setFormData] = useState({
  name: '',
  name_en: '',  // إضافة
  description: '',
  description_en: '',  // إضافة
  // ... باقي الحقول
});
```

#### ج. إضافة حقول في النموذج:
```tsx
{/* Product Name English */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Product Name (English)
  </label>
  <input
    type="text"
    dir="ltr"
    value={formData.name_en}
    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="Example: Luxury Handbag"
  />
</div>

{/* Description English */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Description (English)
  </label>
  <textarea
    dir="ltr"
    value={formData.description_en}
    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
    rows={4}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="Product description in English..."
  />
</div>
```

---

### 3. نموذج الشركات (Companies)

**الملف:** `frontend/src/app/admin/companies/page.tsx`

#### أ. تحديث الـ Interface:
```typescript
interface Company {
  id: number;
  name: string;
  name_en?: string;  // إضافة
  logo_url?: string;
  created_at: string;
}
```

#### ب. تحديث formData:
```typescript
const [formData, setFormData] = useState({
  name: '',
  name_en: '',  // إضافة
  logo_url: '',
});
```

#### ج. إضافة حقل في النموذج:
```tsx
{/* Company Name English */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Company Name (English)
  </label>
  <input
    type="text"
    dir="ltr"
    value={formData.name_en}
    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="Example: Dior"
  />
</div>
```

---

### 4. نموذج مدن التوصيل (Delivery Cities)

**الملف:** `frontend/src/app/admin/delivery/page.tsx`

#### أ. تحديث الـ Interface:
```typescript
interface DeliveryCity {
  id: number;
  city_name: string;
  city_name_en?: string;  // إضافة
  delivery_price: number;
  created_at: string;
}
```

#### ب. تحديث formData:
```typescript
const [formData, setFormData] = useState({
  city_name: '',
  city_name_en: '',  // إضافة
  delivery_price: '',
});
```

#### ج. إضافة حقل في النموذج:
```tsx
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
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="Example: Amman"
  />
</div>
```

---

## 🎯 ملاحظات مهمة

1. **الحقول الإنجليزية اختيارية**: لا تحتاج إلى `required` attribute
2. **استخدم `dir="ltr"`**: للحقول الإنجليزية لتظهر من اليسار لليمين
3. **تحديث جميع setFormData**: تأكد من إضافة الحقول الجديدة في كل مكان يتم فيه reset الـ form
4. **Backend جاهز**: لا حاجة لتعديل أي شيء في الـ Backend - سيحفظ القيم تلقائياً

## 📋 قائمة التحقق

- [ ] تحديث interface لإضافة `name_en` و `description_en`
- [ ] تحديث useState للـ formData
- [ ] إضافة حقول الإدخال في النموذج
- [ ] تحديث handleEdit لتحميل القيم الإنجليزية
- [ ] تحديث جميع setFormData لتضمين الحقول الجديدة
- [ ] اختبار إضافة/تعديل بيانات بكلا اللغتين

## 🚀 الخطوة التالية

بعد إضافة الحقول في لوحة الإدارة، ستحتاج إلى تحديث Frontend لعرض النص الصحيح حسب اللغة:

```tsx
// مثال في صفحة المنتج
import { useLocale } from 'next-intl';

const ProductCard = ({ product }) => {
  const locale = useLocale();
  
  const displayName = locale === 'en' && product.name_en 
    ? product.name_en 
    : product.name;
    
  const displayDescription = locale === 'en' && product.description_en
    ? product.description_en
    : product.description;
  
  return (
    <div>
      <h3>{displayName}</h3>
      <p>{displayDescription}</p>
    </div>
  );
};
```
