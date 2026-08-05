function switchTab(tabId, el) {
            document.querySelectorAll('.tab-section').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            
            document.getElementById(tabId).classList.add('active');
            el.classList.add('active');
        }

        function filterProjects(category, el) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            el.classList.add('active');

            document.querySelectorAll('.project-card').forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat.includes(category)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        }

        function updateThemeUI(theme) {
            const icon = document.getElementById('themeIcon');
            const text = document.getElementById('themeText');
            
            if (theme === 'light') {
                icon.className = 'fa-solid fa-moon';
                text.textContent = 'Dark Mode';
            } else {
                icon.className = 'fa-solid fa-sun';
                text.textContent = 'Light Mode';
            }
        }

        (function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeUI(savedTheme);
        })();