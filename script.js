document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const hamburger = document.getElementById('hamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeBtn = document.getElementById('closeBtn');

    // تغيير الـ Active عند الضغط على روابط الناف بار
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // الموبايل منيو
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            mobileSidebar.classList.add('open');
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
        });
    }

    // تأثير اختفاء الناف بار عند السكرول لأسفل وظهوره عند السكرول لأعلى
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.main-navbar');
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.top = '-100px';
        } else {
            navbar.style.top = '0';
        }
        lastScroll = currentScroll;
    });
});
// تفعيل أنيميشن الظهور عند السكرول
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.fade-in-left, .fade-in-right');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// أنيميشن ظهور الصور واحدة تلو الأخرى عند السكرول
const observerOptions = { threshold: 0.2 };
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 150); // تأخير 150 ملي ثانية بين كل صورة
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease-out";
    galleryObserver.observe(card);
});
// وظيفة تفعيل الأنيميشن عند السكرول لسكشن الكروت
const observerWhy = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // إضافة تأخير بسيط بين كل كارد وآخر ليظهروا واحداً تلو الآخر
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 100); 
        }
    });
}, { threshold: 0.1 });

// تفعيل المراقب على الصورة والكروت
document.querySelectorAll('.fade-in-left, .fade-in-up').forEach(el => {
    observerWhy.observe(el);
});
document.addEventListener('DOMContentLoaded', () => {
    const quoteForm = document.getElementById('quoteForm');

    // أنيميشن عند إرسال الفورم
    if(quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // تغيير شكل الزر لإعطاء إيحاء بالتحميل
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            btn.disabled = true;

            setTimeout(() => {
                alert('شكراً لك! تم استلام طلب عرض السعر بنجاح، وسيتواصل معك فريق النجوم (إدارة أبو فارس) خلال دقائق.');
                btn.innerHTML = originalText;
                btn.disabled = false;
                quoteForm.reset();
            }, 2000);
        });
    }

    // تفعيل حركات الظهور للسكشن
    const revealContact = () => {
        const items = document.querySelectorAll('.fade-in-right, .fade-in-left');
        items.forEach(item => {
            const top = item.getBoundingClientRect().top;
            if(top < window.innerHeight - 100) {
                item.classList.add('reveal');
            }
        });
    }
    window.addEventListener('scroll', revealContact);
});
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    // 1. وظيفة مراقبة السكرول لتغيير حالة الروابط (ScrollSpy)
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // التحقق إذا كان السكرول حالياً داخل حدود السكشن
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            // إذا كان الـ href الخاص بالرابط يطابق الـ id الخاص بالسكشن الحالي
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });

        // 2. تأثير تصغير الناف بار عند النزول (اختياري لجمالية أكثر)
        const navbar = document.querySelector('.main-navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(0, 18, 51, 0.98)'; // لون أغمق قليلاً عند السكرول
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(0, 35, 102, 0.9)';
        }
    });

    // 3. التمرير الناعم عند الضغط (Smooth Scroll)
    navItems.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentSection = "";

    // مراقبة السكرول لتحديد السكشن الحالي
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // إذا كان السكرول الحالي تجاوز بداية السكشن بـ 100 بكسل
        if (window.pageYOffset >= sectionTop - 120) {
            currentSection = section.getAttribute("id");
        }
    });

    // إزالة وإضافة الـ Active class بناءً على السكشن الحالي
    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(currentSection)) {
            item.classList.add("active");
        }
    });

    // تصغير الناف بار عند النزول ليعطي شكلاً احترافياً
    const navbar = document.querySelector('.main-navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = "8px 0";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    } else {
        navbar.style.padding = "15px 0";
        navbar.style.boxShadow = "none";
    }
});
const hamburger = document.getElementById('hamburger');
const closeBtn = document.getElementById('closeBtn');
const mobileSidebar = document.getElementById('mobileSidebar');

hamburger.addEventListener('click', () => {
    mobileSidebar.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    mobileSidebar.classList.remove('open');
});

// إغلاق المنيو عند الضغط على أي رابط
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileSidebar.classList.remove('open');
    });
});