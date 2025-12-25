document.addEventListener('DOMContentLoaded', () => {
    // 1. تعريف العناصر (مرة واحدة فقط لضمان السرعة)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('closeBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const navbar = document.querySelector('.main-navbar');
    const quoteForm = document.getElementById('quoteForm');

    // 2. وظيفة الموبايل منيو (فتح وإغلاق)
    if (hamburger && mobileSidebar) {
        hamburger.addEventListener('click', () => {
            mobileSidebar.classList.add('open');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
        });
    }

    // إغلاق المنيو عند الضغط على أي رابط بداخلها
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
        });
    });

    // 3. مستمع السكرول الموحد (للتثبيت، الـ Active، وأنيميشن الظهور)
    window.addEventListener('scroll', () => {
        let currentSection = "";
        const scrollY = window.pageYOffset;

        // أ- مراقبة السكشن الحالي (ScrollSpy)
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(currentSection)) {
                item.classList.add('active');
            }
        });

        // ب- تأثير الناف بار (ثبات وتحرك)
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.padding = "8px 0";
                navbar.style.background = "rgba(0, 35, 102, 0.98)";
            } else {
                navbar.style.padding = "15px 0";
                navbar.style.background = "rgba(0, 35, 102, 0.85)";
            }
        }

        // ج- تفعيل أنيميشن "من نحن" وعناصر الظهور
        document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up').forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - 100) {
                reveal.classList.add('reveal');
            }
        });
    });

    // 4. تفعيل مراقب معرض الصور (Intersection Observer)
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease-out";
        galleryObserver.observe(card);
    });

    // 5. التمرير الناعم عند الضغط (Smooth Scroll)
    navItems.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 6. فورم طلب عرض السعر
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.submit-btn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            btn.disabled = true;
            setTimeout(() => {
                alert('شكراً لك! تم استلام طلبك بنجاح.');
                btn.innerHTML = 'إرسال الطلب الآن';
                btn.disabled = false;
                quoteForm.reset();
            }, 2000);
        });
    }
});