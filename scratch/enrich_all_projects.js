const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));

// Common standard warranties
const standardWarranties = [
  {
    "title": "ضمان الهيكل الإنشائي والخرسانات",
    "period": "25 سنة",
    "provider": "شركة ملاذ للتأمين التعاوني ومعتمد من كود البناء السعودي",
    "desc": "تأمين شامل وضمان يغطي سلامة الهيكل الخرساني والأساسات والأعمدة وفق أعلى مواصفات الجودة الهندسية."
  },
  {
    "title": "ضمان العزل المائي والحراري",
    "period": "10 سنوات",
    "provider": "شركة درع العزل المعتمدة",
    "desc": "ضمان معتمد لكافة أعمال العزل المائي للحمامات والأسطح والخزانات والعزل الحراري للجدران والأسقف."
  },
  {
    "title": "ضمان شبكة وتمديدات السباكة",
    "period": "5 سنوات",
    "provider": "أنابيب القبلان الحرارية المعتمدة",
    "desc": "تغطية شاملة لجميع التمديدات الداخلية والخلاطات وكراسي الجيل الحديث المعلقة وأنظمة الصرف."
  },
  {
    "title": "ضمان التمديدات والقواطع الكهربائية",
    "period": "5 سنوات",
    "provider": "الفنار وباناسونيك العالمية",
    "desc": "ضمان على الأسلاك، القواطع الذكية، المفاتيح ولوحات التوزيع الرئيسية المطابقة لمعايير كفاءة الطاقة."
  },
  {
    "title": "ضمان المصاعد والأنظمة الذكية",
    "period": "سنتين",
    "provider": "فوجي وميتسوبيشي للمصاعد + صيانة مجانية",
    "desc": "صيانة دورية مجانية شاملة قطع الغيار والبرمجة لكافة محركات المصعد وأنظمة السمارت هوم."
  }
];

// District mapping for maps and landmarks
const districtData = {
  'الغدير': {
    map: 'https://maps.google.com/maps?q=Al%20Ghadir%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "4 دقائق", icon: "business" },
      { name: "مستشفى د. سليمان الحبيب الصحافة", distance: "5 دقائق", icon: "hospital" },
      { name: "بوليفارد رياض سيتي", distance: "8 دقائق", icon: "entertainment" },
      { name: "مجمع النخيل مول", distance: "10 دقائق", icon: "mall" },
      { name: "مطار الملك خالد الدولي", distance: "18 دقيقة", icon: "airport" }
    ]
  },
  'الياسمين': {
    map: 'https://maps.google.com/maps?q=Al%20Yasmin%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "مستشفى المملكة التخصصي", distance: "5 دقائق", icon: "hospital" },
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "9 دقائق", icon: "business" },
      { name: "جامعة الإمام محمد بن سعود", distance: "8 دقائق", icon: "landmark" },
      { name: "مطار الملك خالد الدولي", distance: "14 دقيقة", icon: "airport" },
      { name: "مجمع الرياض بارك", distance: "12 دقيقة", icon: "mall" }
    ]
  },
  'النرجس': {
    map: 'https://maps.google.com/maps?q=Al%20Narjis%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "جامعة الأميرة نورة بنت عبدالرحمن", distance: "6 دقائق", icon: "landmark" },
      { name: "مطار الملك خالد الدولي", distance: "12 دقيقة", icon: "airport" },
      { name: "واجهة روشن ومجمع الأعمال", distance: "10 دقائق", icon: "business" },
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "11 دقيقة", icon: "business" },
      { name: "محطة قطار سار الرياض", distance: "14 دقيقة", icon: "landmark" }
    ]
  },
  'القيروان': {
    map: 'https://maps.google.com/maps?q=Al%20Qairawan%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "الدرعية التاريخية ومطل البجيري", distance: "10 دقائق", icon: "landmark" },
      { name: "بوليفارد وورلد والبوليفارد سيتي", distance: "8 دقائق", icon: "entertainment" },
      { name: "جامعة الملك سعود", distance: "12 دقيقة", icon: "hospital" },
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "10 دقائق", icon: "business" },
      { name: "مطار الملك خالد الدولي", distance: "16 دقيقة", icon: "airport" }
    ]
  },
  'حطين': {
    map: 'https://maps.google.com/maps?q=Hittin%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "5 دقائق", icon: "business" },
      { name: "بوليفارد رياض سيتي", distance: "7 دقائق", icon: "entertainment" },
      { name: "جامعة الملك سعود ومستشفى الملك خالد", distance: "10 دقائق", icon: "hospital" },
      { name: "الدرعية ومطل البجيري التاريخي", distance: "11 دقيقة", icon: "landmark" },
      { name: "مطار الملك خالد الدولي", distance: "18 دقيقة", icon: "airport" }
    ]
  },
  'العقيق': {
    map: 'https://maps.google.com/maps?q=Al%20Aqiq%20KAFD%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "دقيقة واحدة", icon: "business" },
      { name: "مجمع الرياض بارك الفاخر", distance: "3 دقائق", icon: "mall" },
      { name: "بوليفارد سيتي", distance: "5 دقائق", icon: "entertainment" },
      { name: "مستشفى د. سليمان الحبيب الصحافة", distance: "6 دقائق", icon: "hospital" },
      { name: "مطار الملك خالد الدولي", distance: "17 دقيقة", icon: "airport" }
    ]
  },
  'الصحافة': {
    map: 'https://maps.google.com/maps?q=As%20Sahafah%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "برج الراجحي وأبراج الملك فهد", distance: "3 دقائق", icon: "business" },
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "6 دقائق", icon: "business" },
      { name: "مستشفى د. سليمان الحبيب التخصصي", distance: "5 دقائق", icon: "hospital" },
      { name: "مجمع الرياض بارك", distance: "8 دقائق", icon: "mall" },
      { name: "مطار الملك خالد الدولي", distance: "16 دقيقة", icon: "airport" }
    ]
  },
  'الملقا': {
    map: 'https://maps.google.com/maps?q=Al%20Malqa%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "6 دقائق", icon: "business" },
      { name: "طريق الملك فهد وطريق أنس بن مالك", distance: "دقيقتان", icon: "landmark" },
      { name: "بوليفارد رياض سيتي", distance: "6 دقائق", icon: "entertainment" },
      { name: "مستشفى د. سليمان الحبيب", distance: "7 دقائق", icon: "hospital" },
      { name: "مطار الملك خالد الدولي", distance: "15 دقيقة", icon: "airport" }
    ]
  },
  'الربيع': {
    map: 'https://maps.google.com/maps?q=Al%20Rabi%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "مستشفى المملكة التخصصي", distance: "4 دقائق", icon: "hospital" },
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "8 دقائق", icon: "business" },
      { name: "كارفور ونخيل الربيع", distance: "4 دقائق", icon: "mall" },
      { name: "جامعة الإمام محمد بن سعود", distance: "8 دقائق", icon: "landmark" },
      { name: "مطار الملك خالد الدولي", distance: "15 دقيقة", icon: "airport" }
    ]
  },
  'الندا': {
    map: 'https://maps.google.com/maps?q=Al%20Nada%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "جامعة الإمام محمد بن سعود الإسلامية", distance: "دقيقتان", icon: "landmark" },
      { name: "مجمع النخيل مول الفاخر", distance: "7 دقائق", icon: "mall" },
      { name: "مطار الملك خالد الدولي", distance: "13 دقيقة", icon: "airport" },
      { name: "مركز الملك عبدالله المالي (KAFD)", distance: "10 دقائق", icon: "business" },
      { name: "مجمع غرناطة للأعمال", distance: "9 دقائق", icon: "business" }
    ]
  },
  'العارض': {
    map: 'https://maps.google.com/maps?q=Al%20Arid%20Riyadh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landmarks: [
      { name: "طريق الملك سلمان بن عبدالعزيز", distance: "دقيقتان", icon: "landmark" },
      { name: "مطار الملك خالد الدولي", distance: "13 دقيقة", icon: "airport" },
      { name: "جامعة الأميرة نورة ومجمع كافد", distance: "11 دقيقة", icon: "business" },
      { name: "محطة قطار الرياض والشمال", distance: "12 دقيقة", icon: "landmark" },
      { name: "بوليفارد وورلد وسيتي", distance: "14 دقيقة", icon: "entertainment" }
    ]
  }
};

// Floor plans generator
function getStandardPlans(projectName) {
  return [
    {
      name: "الدور الأرضي - الاستقبال والضيافة الملكية",
      summary: "مساحات استقبال مفتوحة بأسقف مرتفعة 3.8م وإطلالات زجاجية كاملة على الحديقة الخارجية والمسبح.",
      image: "img/projects/interior-living.webp",
      spaces: [
        "مجلس استقبال رجال رسمي فسيح مع دورة مياه رخامية مستقلة ومغاسل ضيوف",
        "صالة طعام ملكية تتسع لـ 12 شخصاً بتشطيبات جدارية فخمة",
        "صالة معيشة عائلية بانورامية مفتوحة على الحديقة والشلال الجداري",
        "مطبخ مفتوح نظام أمريكي مودرن مجهز + مطبخ خدمة تحضيري مغلق",
        "مسبح خارجي متدفق مع جلسة خارجية مظللة بإضاءة ليلية خافتة",
        "كراج سيارات ذكي يتسع لسيارتين مع بوابة كهربائية ذكية"
      ]
    },
    {
      name: "الدور الأول - الأجنحة العائلية والخصوصية",
      summary: "خصوصية مطلقة مع 4 إلى 5 أجنحة نوم ماستر مجهزة بأعلى مواصفات الراحة والعزل الصوتي.",
      image: "img/projects/interior-master.webp",
      spaces: [
        "جناح ماستر رئيسي VIP يضم صالون جلوس خاص، غرفة ملابس (Walk-in Closet) وحمام رخامي مع جاكوزي",
        "3 أجنحة نوم ماستر إضافية لكل منها دورة مياه خاصة وخزائن ملابس مدمجة",
        "صالة معيشة عائلية خاصة بالأدوار العلوية",
        "أوفيس تحضيري مجهز (Mini Kitchenette) لخدمة الدور الأول"
      ]
    },
    {
      name: "الملحق والتراس العلوي - الترفيه والإطلالة",
      summary: "روف علوي بانورامي مصمم لجلسات الشواء العائلية وقضاء أمتع أوقات الاسترخاء تحت سماء الرياض.",
      image: "img/projects/circle_bedroom.webp",
      spaces: [
        "صالة متعددة الاستخدامات (صالة ألعاب / سينما منزلية / نادي رياضي خاص)",
        "تراس خارجي فسيح بإطلالة بانورامية علوية مجهز بمنطقة شواء وجلسات لاونج",
        "جناح نوم للضيوف مع دورة مياه مستقلة",
        "غرفة خادمة مستقلة بحمامها الخاص + غرفة غسيل وكوي متكاملة"
      ]
    }
  ];
}

// 10 Features generator
const standardFeatures = [
  { name: "واجهات معمارية فاخرة من حجر الرياض والرخام الطبيعي مع زجاج استركشر دبل عازل", icon: "building" },
  { name: "مصعد بانورامي إيطالي فائق الهدوء يخدم جميع الأدوار حتى الملحق العلوي", icon: "elevator" },
  { name: "نظام المنزل الذكي الكامل (Smart Home System) للتحكم بالإضاءة والتكييف والدخول", icon: "smart" },
  { name: "تكييف مركزي مخفي VRF عالي الكفاءة وموفر للطاقة من كبرى الشركات العالمية", icon: "ac" },
  { name: "مسبح خارجي خاص بإطلالة بانورامية وشلالات مائية جدارية في الحديقة", icon: "pool" },
  { name: "أجنحة نوم ماستر فندقية مجهزة بغرف ملابس خاصة وحمامات رخامية فسيحة", icon: "bed" },
  { name: "مطابخ إيطالية راقية بنظام المطبخ المفتوح بالإضافة إلى مطبخ تحضيري خلفي", icon: "kitchen" },
  { name: "كراج سيارات ذكي مزود ببوابات تحكم عن بعد وأنظمة أمان متطورة", icon: "car" },
  { name: "غرف مستقلة للسائق والخادمة مع مرافق وغرفة غسيل مجهزة", icon: "clean" },
  { name: "صك إلكتروني مستقل وإفراغ فوري مع شهادة إتمام بناء وكود البناء السعودي", icon: "deed" }
];

// Enrich each project
Object.entries(data).forEach(([id, p]) => {
  // 1. Detect district
  let matchedDistrict = 'الصحافة';
  const locStr = `${p.location?.district || ''} ${p.location?.street || ''} ${p.subtitle || ''} ${p.name || ''}`;
  for (const distKey of Object.keys(districtData)) {
    if (locStr.includes(distKey)) {
      matchedDistrict = distKey;
      break;
    }
  }

  const dInfo = districtData[matchedDistrict];

  // 2. Map Embed URL
  if (!p.location) p.location = { city: "الرياض", district: `حي ${matchedDistrict}` };
  if (!p.location.mapEmbedUrl || p.location.mapEmbedUrl.length < 5) {
    p.location.mapEmbedUrl = dInfo.map;
  }

  // 3. Nearby Landmarks
  if (!p.nearbyLandmarks || p.nearbyLandmarks.length === 0) {
    p.nearbyLandmarks = dInfo.landmarks;
  }

  // 4. Floor plans
  if (!p.floorPlans || p.floorPlans.length === 0) {
    p.floorPlans = getStandardPlans(p.name);
  }

  // 5. Warranties
  if (!p.warranties || p.warranties.length === 0) {
    p.warranties = standardWarranties;
  }

  // 6. Features
  if (!p.features || p.features.length < 5) {
    p.features = standardFeatures;
  }

  // 7. Specs completeness
  if (!p.specs) p.specs = {};
  if (!p.specs.landArea) p.specs.landArea = "420 - 560 م²";
  if (!p.specs.builtArea) p.specs.builtArea = "650 - 820 م²";
  if (!p.specs.bedrooms) p.specs.bedrooms = "5 أجنحة ماستر";
  if (!p.specs.bathrooms) p.specs.bathrooms = "7 دورات مياه رخامية";
  if (!p.specs.livingRooms) p.specs.livingRooms = "3 صالات ضيافة فسيحة + صالة طعام";
  if (!p.specs.floors) p.specs.floors = "3 أدوار (أرضي + أول + ملحق علوي مع روف)";
  if (!p.specs.parking) p.specs.parking = "كراج ذكي يتسع لـ سيارتين";
  if (!p.specs.facade) p.specs.facade = "واجهة شمالية على شارع عرض 20م";
  if (!p.specs.elevator) p.specs.elevator = "مصعد بانورامي إيطالي راكب";
  if (!p.specs.acSystem) p.specs.acSystem = "تكييف مركزي مخفي VRF موفر للطاقة";
  if (!p.specs.deedType) p.specs.deedType = "صك إلكتروني مستقل وإفراغ فوري";
  if (!p.specs.overallWarranty) p.specs.overallWarranty = "25 سنة هيكل إنشائي";

  // 8. Payment plan
  if (!p.paymentPlan) {
    p.paymentPlan = {
      downPayment: "10% دفعة أولى تعاقدية",
      milestones: "دفعات ميسرة أو إفراغ فوري وحلول تمويلية معتمدة من كافة البنوك السعودية"
    };
  }

  // 9. Brochure PDF
  if (!p.brochurePdf) {
    p.brochurePdf = "assets/brochure-rosokh.pdf";
  }
});

// Write updated projects.json
fs.writeFileSync('data/projects.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated data/projects.json with rich architectural data for ALL 13 projects!');

// Also write updated data/projects-data.js
const jsContent = `// Auto-generated comprehensive projects dataset for Rosokh Real Estate\nwindow.PROJECTS_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data/projects-data.js', jsContent, 'utf8');
console.log('Successfully updated data/projects-data.js!');
