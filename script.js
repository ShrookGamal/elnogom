document.addEventListener('DOMContentLoaded', () => {
    // 1. تعريف العناصر الأساسية
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('closeBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.main-navbar');

    // 2. تشغيل السايد منيو (فتح وإغلاق)
    if (hamburger && mobileSidebar) {
        hamburger.onclick = () => {
            mobileSidebar.classList.add('open');
            console.log("Menu Opened"); // للتأكد في المتصفح
        };
    }

    if (closeBtn && mobileSidebar) {
        closeBtn.onclick = () => {
            mobileSidebar.classList.remove('open');
        };
    }

    // إغلاق المنيو عند الضغط على أي رابط بداخلها
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.onclick = () => {
            mobileSidebar.classList.remove('open');
        };
    });

    // 3. مراقب السكرول (الناف بار الثابت + الروابط النشطة + أنيميشن الظهور)
    window.onscroll = () => {
        let current = "";
        const scrollY = window.pageYOffset;

        // أ- تحديد السكشن الحالي لتغيير لون الرابط
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });

        // ب- تصغير الناف بار عند النزول
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.padding = "8px 0";
                navbar.style.background = "rgba(0, 35, 102, 0.98)";
            } else {
                navbar.style.padding = "15px 0";
                navbar.style.background = "rgba(0, 35, 102, 0.85)";
            }
        }

        // ج- تشغيل أنيميشن العناصر (Reveal)
        document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('reveal');
            }
        });
    };

    // 4. أنيميشن معرض الصور
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
});