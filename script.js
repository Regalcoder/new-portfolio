// Navigation functionality
        const navItems = document.querySelectorAll('.nav-item');
        const contentSections = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetSection = item.getAttribute('data-section');
                
                // Remove active class from all nav items and sections
                navItems.forEach(nav => nav.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked nav item and corresponding section
                item.classList.add('active');
                document.getElementById(targetSection).classList.add('active');
            });
        });

        // Portfolio filtering functionality
        const portfolioNavItems = document.querySelectorAll('.portfolio-nav-item');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        portfolioNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const filter = item.getAttribute('data-filter');
                
                // Remove active class from all portfolio nav items
                portfolioNavItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(portfolioItem => {
                    const category = portfolioItem.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        portfolioItem.style.display = 'block';
                    } else {
                        portfolioItem.style.display = 'none';
                    }
                });
            });
        });

        // Smooth scrolling for better UX
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });