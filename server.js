const express = require('express');
const fs = require('fs').promises; // نستعمل promises باش يكون async/await أنظف
const path = require('path');
const cors = require('cors'); // نزيدو CORS باش الـ frontend يقدر يتصل

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // مهم لو الـ frontend على domain تاني (مثل github.io)
app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // static files (html, js, robo.glb...)

// ملف قاعدة البيانات
const DB_FILE = path.join(__dirname, 'db.json');

// إنشاء الملف إذا ما كانش موجود
async function initDb() {
  try {
    if (!await fs.access(DB_FILE).then(() => true).catch(() => false)) {
      await fs.writeFile(DB_FILE, JSON.stringify([], null, 2));
      console.log('db.json تم إنشاؤه');
    }
  } catch (err) {
    console.error('خطأ في إنشاء db.json:', err);
  }
}
initDb();

// حفظ بيانات (حجز، طلب تصليح، إلخ)
app.post('/api/save', async (req, res) => {
  try {
    const data = req.body;

    // validation بسيطة
    if (!data || !data.type || !data.details) {
      return res.status(400).json({ ok: false, error: 'البيانات ناقصة (type + details مطلوبين)' });
    }

    let db = [];
    try {
      const content = await fs.readFile(DB_FILE, 'utf8');
      db = JSON.parse(content);
    } catch (err) {
      console.error('خطأ قراءة db.json:', err);
    }

    const newEntry = {
      ...data,
      date: new Date().toISOString(),
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 5)
    };

    db.push(newEntry);

    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
    
    console.log('تم حفظ:', newEntry);
    res.json({ ok: true, id: newEntry.id });
  } catch (err) {
    console.error('خطأ في /api/save:', err);
    res.status(500).json({ ok: false, error: 'مشكل داخلي' });
  }
});

// توليد فاتورة (صفحة HTML بسيطة أو يمكن نطورها لـ PDF)
app.get('/api/invoice', async (req, res) => {
  const id = req.query.id || 'غير معروف';

  // يمكن نجيب البيانات من db.json لو تحب نعرض تفاصيل الفاتورة
  let invoiceData = {};
  try {
    const content = await fs.readFile(DB_FILE, 'utf8');
    const db = JSON.parse(content);
    invoiceData = db.find(item => item.id === id) || {};
  } catch (err) {}

  res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>فاتورة رقم ${id}</title>
      <style>
        body { font-family: Tahoma, sans-serif; text-align: center; padding: 40px; background: #0f2027; color: #fff; }
        h1 { color: #ffa500; text-shadow: 0 0 10px #0ff; }
        .details { max-width: 600px; margin: 30px auto; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; }
        button { padding: 12px 30px; background: #25D366; color: white; border: none; border-radius: 8px; font-size: 1.1em; cursor: pointer; }
      </style>
    </head>
    <body>
      <h1>🧾 فاتورة رقم ${id}</h1>
      <div class="details">
        <p><strong>التاريخ:</strong> ${invoiceData.date || new Date().toLocaleString('ar-TN')}</p>
        <p><strong>نوع العملية:</strong> ${invoiceData.type || 'غير محدد'}</p>
        <p><strong>التفاصيل:</strong> ${invoiceData.details || 'لا توجد تفاصيل'}</p>
        <p><strong>الرقم الهاتفي:</strong> ${invoiceData.phone || 'غير محدد'}</p>
      </div>
      <button onclick="window.print()">طباعة الفاتورة</button>
      <p style="margin-top:40px;color:#aaa;">ورشة إلكترونيك الرحماني - مدنين</p>
    </body>
    </html>
  `);
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🔥 Robo ULTRA backend يخدم على http://localhost:${PORT}`);
});
