    // === Language Switch Function ===
    function setLang(lang) {
        // Обновление текста для всех элементов с data-атрибутами
        document.querySelectorAll('[data-' + lang + ']').forEach(el => {
          el.textContent = el.getAttribute('data-' + lang);
        });
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // Обновление активного состояния для десктопных кнопок
        document.querySelectorAll('.lang-switcher-buttons .lang-btn').forEach(btn => {
          btn.classList.remove('active');
          if (btn.textContent.trim().toUpperCase() === lang.toUpperCase()) {
            btn.classList.add('active');
          }
          if (lang === 'ar' && btn.textContent.includes('عربي')) {
            btn.classList.add('active');
          }
        });
    
        // Обновление текста на кнопке dropdown в мобильном хедере
        const dropdownToggle = document.querySelector('.lang-switcher-dropdown .dropdown-toggle');
        if (dropdownToggle) {
          // Если выбран арабский, отображаем "عربي", иначе текст в верхнем регистре
          dropdownToggle.textContent = lang === 'ar' ? 'عربي' : lang.toUpperCase();
        }
      }
    
        // === Dropdown Toggle for Mobile Language Switcher ===
        function toggleDropdown() {
          document.querySelector('.lang-switcher-dropdown').classList.toggle('show');
        }
        document.querySelector('.dropdown-toggle').addEventListener('click', function(){
          toggleDropdown();
        });
    
        // === Burger Menu Logic ===
        const burgerBtn = document.getElementById('burgerBtn');
        const sidebar = document.getElementById('sidebar');
        const closeSidebarBtn = document.getElementById('closeSidebar');
        burgerBtn.addEventListener('click', () => {
          sidebar.classList.add('open');
        });
        closeSidebarBtn.addEventListener('click', () => {
          sidebar.classList.remove('open');
        });
        function closeSidebar() {
          sidebar.classList.remove('open');
        }
    
        // === Scroll Animations (Intersection Observer) ===
        const hiddenElems = document.querySelectorAll('.hidden');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            }
          });
        }, { threshold: 0.1 });
        hiddenElems.forEach(el => observer.observe(el));
    
        // === Counters (Stats) ===
        const counters = document.querySelectorAll('.counter');
        let countersStarted = false;
        function runCounters() {
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const step = target / 100;
            let current = 0;
            const updateCounter = () => {
              if (current < target) {
                current += step;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            updateCounter();
          });
        }
        const statsSection = document.querySelector('.stats');
        const statsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
              countersStarted = true;
              runCounters();
            }
          });
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    
        // === FAQ Accordion ===
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
          const question = item.querySelector('.faq-question');
          if(question) {
            question.addEventListener('click', () => {
              item.classList.toggle('active');
            });
          }
        });
    
        // === Back to Top ===
        const backToTopBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
          } else {
            backToTopBtn.classList.remove('show');
          }
        });
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    
        // === Team Slider Navigation ===
        document.addEventListener("DOMContentLoaded", function() {
          const slider = document.querySelector(".team-slider");
          const btnPrev = document.querySelector(".slider-btn.prev");
          const btnNext = document.querySelector(".slider-btn.next");
    
          btnPrev.addEventListener("click", function() {
            slider.scrollBy({
              left: -300,
              behavior: "smooth"
            });
          });
          btnNext.addEventListener("click", function() {
            slider.scrollBy({
              left: 300,
              behavior: "smooth"
            });
          });
        });
    
        // === Form AJAX Submission ===
        document.getElementById('contactForm').addEventListener('submit', function(e) {
          e.preventDefault();
          var formData = new FormData(e.target);
          fetch("https://script.google.com/macros/s/AKfycbyX9JWzQ1KONDY9QXyLvMk937WwmYaBMDIQoq-FlV_ZmaVAb91QjLLs3jDjNHNO7hYn/exec", {
              method: "POST",
              body: formData
          })
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              if(data.status === "success") {
                  alert("Форма успешно записана");
                  e.target.reset();
              } else {
                  alert("Ошибка: " + data.message);
              }
          })
          .catch(function(error) {
              alert("Ошибка отправки формы: " + error);
          });
        });
    
        // === Default Language ===
        window.addEventListener('DOMContentLoaded', () => {
          setLang('en');
        });