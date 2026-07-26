// Same light/dark toggle as the main site (localStorage 'theme', 🌑/☀️).
(function () {
    const toggle = document.getElementById('theme-toggle');
    const apply = (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.body.classList.toggle('dark', theme === 'dark');
        toggle.textContent = theme === 'dark' ? '☀️' : '🌑';
    };
    apply(localStorage.getItem('theme') || 'light');
    window.toggleTheme = function () {
        const next = document.body.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        apply(next);
    };
})();
