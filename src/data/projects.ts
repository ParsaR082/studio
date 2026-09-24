export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'مسکونی' | 'ویلایی' | 'فرهنگی' | 'تجاری';
  location: string;
  year: string;
  area: string;
  architect: string;
  status: string;
  heroImage: string;
  secondaryImage: string;
  gallery: string[];
  tagline: string;
  description: string;
  concept: string;
  materials: string[];
  specs: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: '01',
    slug: 'khaneh-sokoot',
    title: 'خانه سکوت',
    category: 'مسکونی',
    location: 'لواسان، تهران',
    year: '۱۴۰۵',
    area: '۸۵۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
    secondaryImage: '/src/assets/images/hero_arch_stone_1790288898945.jpg',
    gallery: [
      '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
      '/src/assets/images/hero_arch_stone_1790288898945.jpg',
      '/src/assets/images/khaneh_noor_arch_1790288924333.jpg'
    ],
    tagline: 'خانه‌ای شکل‌گرفته میان سنگ، نور و سکوت؛ پروژه‌ای که مرز میان فضای داخلی و چشم‌انداز را به حداقل می‌رساند.',
    description: 'خانه سکوت پاسخی معماری به اشتیاق انسان معاصر برای گریز از هیاهوی زیست شهری است. این پروژه بر بستر شیب‌دار کوهپایه‌های لواسان واقع شده و با استفاده از حجم‌های سنگین تراورتن و شیشه‌های سرتاسری، توده‌ای یکپارچه را پدید آورده که همزمان در زمین ریشه دوانده و رو به آسمان باز می‌شود.',
    concept: 'هندسه کلی خانه بر محور یک حیاط مرکزی فرورفته استوار است که نسیم کوهستان و نور ملایم صبحگاهی را به عمیق‌ترین لایه‌های فضایی هدایت می‌کند. ماده و بافت در این پروژه نه به عنوان پوشش تزئینی، بلکه به عنوان راوی گذر زمان به کار گرفته شده‌اند.',
    materials: ['سنگ تراورتن تیشه‌ای کرم', 'بتن اکسپوز خودرنگ', 'شیشه بدون قاب عایق حرارتی', 'چوب بلوط طبیعی فرآوری‌شده'],
    specs: [
      { label: 'زیربنای کل', value: '۸۵۰ متر مربع' },
      { label: 'مساحت زمین', value: '۱,۴۰۰ متر مربع' },
      { label: 'تعداد طبقات', value: '۳ تراز پیوسته' },
      { label: 'سازنده و مجری', value: 'گروه مهندسی نو' },
      { label: 'عکاس معماری', value: 'استودیو عکاسی پرهام' }
    ]
  },
  {
    id: '02',
    slug: 'khaneh-noor',
    title: 'خانه نور',
    category: 'مسکونی',
    location: 'اصفهان',
    year: '۱۴۰۴',
    area: '۶۲۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/khaneh_noor_arch_1790288924333.jpg',
    secondaryImage: '/src/assets/images/hero_arch_stone_1790288898945.jpg',
    gallery: [
      '/src/assets/images/khaneh_noor_arch_1790288924333.jpg',
      '/src/assets/images/khaneh_khak_arch_1790288934373.jpg',
      '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg'
    ],
    tagline: 'همنشینی هندسه خالص و شکاف‌های عمودی نور برای خلق تجربه‌ای مراقبه‌گون در اقلیم گرم و خشک.',
    description: 'پروژه خانه نور بازتعریفی از سلسله‌مراتب اندرونی و بیرونی در معماری سنتی کویر است. با ایجاد بازشوهای خطی در سقف و شکاف‌های متقارن بر روی دیوارهای بتنی سفید، نور خورشید به عنوان یک عنصر ساختاری پویا در طول ساعات روز درون فضا حرکت می‌کند.',
    concept: 'تداوم بصری از حوض‌خانه مدرن در طبقه همکف تا رواق‌های فوقانی باعث ایجاد کوران طبیعی و کاهش نیاز به سرمایش مکانیکی در تابستان‌های کویری می‌شود.',
    materials: ['بتن اکسپوز سفید صیقلی', 'سنگ مرمر لیمویی اسلب', 'فولاد سیاه اکسیدشده', 'گچ دست‌ساز بافت‌دار'],
    specs: [
      { label: 'زیربنای کل', value: '۶۲۰ متر مربع' },
      { label: 'مساحت زمین', value: '۷۸۰ متر مربع' },
      { label: 'تعداد طبقات', value: '۲ طبقه + بام سبز' },
      { label: 'سازه', value: 'قاب بتن آرمه نمایان' },
      { label: 'جوایز', value: 'رتبه نخست جایزه معماری معاصر ایران ۱۴۰۴' }
    ]
  },
  {
    id: '03',
    slug: 'khaneh-khak',
    title: 'خانه خاک',
    category: 'ویلایی',
    location: 'کاشان',
    year: '۱۴۰۴',
    area: '۹۵۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/khaneh_khak_arch_1790288934373.jpg',
    secondaryImage: '/src/assets/images/hero_arch_stone_1790288898945.jpg',
    gallery: [
      '/src/assets/images/khaneh_khak_arch_1790288934373.jpg',
      '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
      '/src/assets/images/khaneh_noor_arch_1790288924333.jpg'
    ],
    tagline: 'تلاقی لایه‌های خاک کوبیده و بتن خشن در احترام به حافظه زمین و پیوند با بستر تاریخی.',
    description: 'خانه خاک با استفاده از فناوری خاک کوبیده تثبیت‌شده بومی (Rammed Earth) بنا شده است. رنگ‌های طبیعی خاک منطقه در لایه‌بندی دیوارها مستقیماً به هویت بنا بدل شده‌اند و عایق حرارتی بی‌نظیری در برابر نوسانات شدید دما فراهم می‌آورند.',
    concept: 'حیاط درون‌گرا با یک درخت زیتون کهنسال و جوی آبی آرام، قلب تپنده سکونتگاه است؛ مرزهای فضای بسته به آرامی در ایوان‌های سایه‌انداز حل می‌شوند.',
    materials: ['خاک کوبیده تثبیت‌شده با آهک طبیعی', 'آجر فشاری دست‌ساز قزاقی', 'سنگ گندمک فارس', 'اندود کاهگل روشن'],
    specs: [
      { label: 'زیربنای کل', value: '۹۵۰ متر مربع' },
      { label: 'مساحت زمین', value: '۲,۲۰۰ متر مربع' },
      { label: 'تعداد طبقات', value: '۱ طبقه گسترده افقی' },
      { label: 'پایداری انرژی', value: 'تهویه غیرفعال بادگیر مدرن' }
    ]
  },
  {
    id: '04',
    slug: 'eghamatgah-koohestan',
    title: 'اقامتگاه کوهستان',
    category: 'ویلایی',
    location: 'دماوند',
    year: '۱۴۰۳',
    area: '۱,۱۰۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/hero_arch_stone_1790288898945.jpg',
    secondaryImage: '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
    gallery: [
      '/src/assets/images/hero_arch_stone_1790288898945.jpg',
      '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
      '/src/assets/images/khaneh_noor_arch_1790288924333.jpg'
    ],
    tagline: 'حجم‌های بتنی معلق روی صخره‌های شیب‌دار با چشم‌انداز ۳۶۰ درجه به قله پرشکوه دماوند.',
    description: 'بر فراز خط‌الرأس کوهستانی، بنا با سه کنسول جسورانه روی شیب تند صخره جای گرفته است. سازه پلکانی اجازه می‌دهد تمام فضاهای اصلی اقامتگاه بدون واسطه به چشم‌انداز وحشی طبیعت پیوند بخورند.',
    concept: 'کاهش دست‌اندازی به توپوگرافی طبیعی سایت و استقرار حجم بر روی پایه‌های نقطه‌ای منفرد بتنی برای حفظ جریان آبراهه‌های فصلی کوهستان.',
    materials: ['بتن مسلح ضد سایش هوازده', 'ورق روی اکسید خاکستری', 'شیشه سکوریت سه‌جداره لامینیت', 'سنگ بازالت کوهی'],
    specs: [
      { label: 'زیربنای کل', value: '۱,۱۰۰ متر مربع' },
      { label: 'ارتفاع از سطح دریا', value: '۲,۴۵۰ متر' },
      { label: 'کنسول سازه‌ای', value: '۹.۵ متر دهانه آزاد' },
      { label: 'سیستم گرمایش', value: 'ژئوترمال زمین‌گرمایی' }
    ]
  },
  {
    id: '05',
    slug: 'villa-khat',
    title: 'ویلای خط',
    category: 'ویلایی',
    location: 'کردان، البرز',
    year: '۱۴۰۳',
    area: '۵۴۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
    secondaryImage: '/src/assets/images/hero_arch_stone_1790288898945.jpg',
    gallery: [
      '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
      '/src/assets/images/khaneh_khak_arch_1790288934373.jpg',
      '/src/assets/images/studio_workspace_arch_1790288945406.jpg'
    ],
    tagline: 'امتداد افقی یک خط ممتد بتنی در باغ میوه؛ ستایش سادگی و خلوص هندسی در مقیاس خرد.',
    description: 'ایده اولیه ویلا بر پایه یک خط منفرد و ممتد شکل گرفته که دیواره‌ها، سقف و کف را به یکدیگر می‌دوزد. ساختار پیوسته فضا از هرگونه تقسیم‌بندی صلب پرهیز می‌کند و زندگی روزمره را در جریان طبیعت جاری می‌سازد.',
    concept: 'حذف عناصر مزاحم بصری و پنهان‌سازی تمامی جزئیات فنی و تاسیساتی در ضخامت پوسته بتنی پیرامونی.',
    materials: ['بتن شیاردار ظریف', 'چوب ترموود خاکستری', 'فولاد ضد زنگ مات', 'سنگ لاشه محلی'],
    specs: [
      { label: 'زیربنای کل', value: '۵۴۰ متر مربع' },
      { label: 'طول خط سازه', value: '۴۸ متر پیوسته' },
      { label: 'سازه', value: 'دال مجوف بتنی پیش‌تنیده' }
    ]
  },
  {
    id: '06',
    slug: 'khaneh-beton',
    title: 'خانه بتن',
    category: 'مسکونی',
    location: 'شیراز',
    year: '۱۴۰۲',
    area: '۷۳۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/khaneh_noor_arch_1790288924333.jpg',
    secondaryImage: '/src/assets/images/hero_arch_stone_1790288898945.jpg',
    gallery: [
      '/src/assets/images/khaneh_noor_arch_1790288924333.jpg',
      '/src/assets/images/hero_arch_stone_1790288898945.jpg',
      '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg'
    ],
    tagline: 'تجسم خلوص سازه در قالب بتن خودرنگ دست‌نخورده، در همنشینی با سایه‌بان‌های مشبک آجری.',
    description: 'پروژه‌ای که در آن بتن خام صریح و بی‌پیرایه سخن می‌گوید. بافت سطوح بتنی رد پای قالب‌های چوبی سرو را بر خود حفظ کرده و در ترکیب با سنگ مرمریت محلی، گرمای دلنشینی به فضای سکونت بخشیده است.',
    concept: 'تولید خلوت و آرامش در یک بافت شهری متراکم از طریق عقب‌نشینی هوشمندانه بازشوها و فیلترهای نوری مشبک.',
    materials: ['بتن مسلح قالب‌بندی چوبی', 'سنگ مرمریت نیریز', 'آلومینیوم آنودایز برنزی', 'آبنمای سنگ سیاه'],
    specs: [
      { label: 'زیربنای کل', value: '۷۳۰ متر مربع' },
      { label: 'سال شروع و پایان', value: '۱۴۰۱ - ۱۴۰۲' },
      { label: 'تعداد واحدها', value: 'تک‌واحدی اختصاصی' }
    ]
  },
  {
    id: '07',
    slug: 'gallery-kham',
    title: 'گالری خام',
    category: 'فرهنگی',
    location: 'تهران، خیابان فرشته',
    year: '۱۴۰۲',
    area: '۴۲۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/studio_workspace_arch_1790288945406.jpg',
    secondaryImage: '/src/assets/images/khaneh_noor_arch_1790288924333.jpg',
    gallery: [
      '/src/assets/images/studio_workspace_arch_1790288945406.jpg',
      '/src/assets/images/khaneh_noor_arch_1790288924333.jpg',
      '/src/assets/images/hero_arch_stone_1790288898945.jpg'
    ],
    tagline: 'فضایی بی‌ادعا برای هنر معاصر؛ جایی که معماری در پس‌زمینه محو می‌شود تا اثر هنری بدرخشد.',
    description: 'گالری خام بازآفرینی یک سوله صنعتی دهه ۴۰ خورشیدی به یک مرکز هنری مدرن است. با حفظ اسکلت فولادی رول‌شده و استفاده از کفپوش یکپارچه بتن صیقلی، محیطی بی‌زمان برای نمایش آثار هنر مفهومی خلق شده است.',
    concept: 'نورپردازی غیرمستقیم از طریق نورگیرهای شمالی هرمی شکل و دیواره‌های متحرک که به تناسب چیدمان هر رویداد هنری تغییر آرایش می‌دهند.',
    materials: ['بتن پولیش‌خورده میکروتاپینگ', 'پروفیل‌های فولادی اکسید نقره‌ای', 'گچ عایق صوتی آکوستیک'],
    specs: [
      { label: 'مساحت گالری اصلی', value: '۴۲۰ متر مربع' },
      { label: 'ارتفاع سقف آزاد', value: '۵.۸ متر' },
      { label: 'کاربری', value: 'گالری هنرهای تجسمی و آرت‌فر' }
    ]
  },
  {
    id: '08',
    slug: 'pavilion-bad',
    title: 'پاویون باد',
    category: 'فرهنگی',
    location: 'یزد',
    year: '۱۴۰۱',
    area: '۲۸۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/khaneh_khak_arch_1790288934373.jpg',
    secondaryImage: '/src/assets/images/hero_arch_stone_1790288898945.jpg',
    gallery: [
      '/src/assets/images/khaneh_khak_arch_1790288934373.jpg',
      '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
      '/src/assets/images/khaneh_noor_arch_1790288924333.jpg'
    ],
    tagline: 'تفسیر پارامتریک و معاصر از ساختار بادگیرهای کویری با هدف تلطیف جریان هوای شهری.',
    description: 'پاویون باد به عنوان سازه‌ای تجربی برای ترویج پایداری بومی در حاشیه بافت تاریخی یزد اجرا شده است. پره‌های منحنی آلومینیومی و سنگ ماسه‌ای نسیم خنک شامگاهی را دریافت کرده و با عبور از روی حوضچه خنک‌کننده، به مرکز گردهمایی هدایت می‌کنند.',
    concept: 'تلفیق داده‌های دینامیک سیالات محاسباتی با هندسه الگوهای مقرنس ایرانی برای بهینه‌سازی حداکثری تهویه بدون انرژی الکتریکی.',
    materials: ['سنگ سنداستون یزد', 'ورق کامپوزیت آلومینیوم مات', 'حوضچه سنگ سیاه دهبید'],
    specs: [
      { label: 'زیربنا', value: '۲۸۰ متر مربع' },
      { label: 'افت دما طبیعی', value: '۷ درجه سانتی‌گراد در کانون پاویون' }
    ]
  },
  {
    id: '09',
    slug: 'khaneh-ofogh',
    title: 'خانه افق',
    category: 'مسکونی',
    location: 'رامسر، مازندران',
    year: '۱۴۰۱',
    area: '۷۸۰ متر مربع',
    architect: 'استودیو معماری نو',
    status: 'تکمیل‌شده',
    heroImage: '/src/assets/images/hero_arch_stone_1790288898945.jpg',
    secondaryImage: '/src/assets/images/khaneh_sokoot_arch_1790288911028.jpg',
    gallery: [
      '/src/assets/images/hero_arch_stone_1790288898945.jpg',
      '/src/assets/images/khaneh_noor_arch_1790288924333.jpg',
      '/src/assets/images/khaneh_khak_arch_1790288934373.jpg'
    ],
    tagline: 'روایتی از هم‌نشینی جنگل‌های هیرکانی و کرانه دریای خزر در قابی از بتن و چوب بلوط باران‌دیده.',
    description: 'پروژه‌ای معلق میان دو جبهه منظرین: جنگل‌های انبوه در جنوب و دریای خزر در شمال. طراحی کشیده و بازشوهای سرتاسری مانع از ایجاد سد بصری در خط طبیعی ساحل می‌شود.',
    concept: 'بام سبز ممتد که پوشش گیاهی دامنه تپه را ادامه می‌دهد و ساختمان را در دل بستر طبیعی مستتر می‌سازد.',
    materials: ['بتن آب‌بند ضد رطوبت', 'چوب اش فرآوری حرارتی', 'پروفیل ترمال‌بریک خاکستری'],
    specs: [
      { label: 'زیربنای کل', value: '۷۸۰ متر مربع' },
      { label: 'مساحت محوطه', value: '۳,۵۰۰ متر مربع' },
      { label: 'وضعیت زیست‌محیطی', value: '۱۰۰٪ حفظ درختان بومی موجود' }
    ]
  }
];
