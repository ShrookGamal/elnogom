document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('closeBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.main-navbar');
    const handleScrollSpy = () => {
        let current = "";
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; 
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.padding = "8px 0";
                navbar.style.background = "rgba(0, 35, 102, 0.98)";
            } else {
                navbar.style.padding = "15px 0";
                navbar.style.background = "rgba(0, 35, 102, 0.85)";
            }
        }
        document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('reveal');
            }
        });
    };
    window.addEventListener('scroll', handleScrollSpy);
    navItems.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            window.removeEventListener('scroll', handleScrollSpy);
            navItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 90,
                behavior: 'smooth'
            });
            setTimeout(() => {
                window.addEventListener('scroll', handleScrollSpy);
            }, 800);
        });
    });
    if (hamburger && mobileSidebar) {
        hamburger.onclick = () => mobileSidebar.classList.add('open');
    }
    if (closeBtn && mobileSidebar) {
        closeBtn.onclick = () => mobileSidebar.classList.remove('open');
    }
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.onclick = () => mobileSidebar.classList.remove('open');
    });
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