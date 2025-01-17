const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
let lastScrollTop = 0; // Последняя позиция прокрутки

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Открытие/закрытие меню-бургера
menuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('hidden')) {
      navMenu.classList.remove('hidden'); // Убираем скрытие
      navMenu.classList.add('active');   // Добавляем анимацию показа
    } else {
      navMenu.classList.remove('active'); // Убираем показ
      navMenu.classList.add('hidden');    // Добавляем скрытие
    }
});

// JavaScript для управления слайдером
$(document).ready(function() {
    const sliderWrapper = $('.slider-wrapper');
    const slides = $('.slider-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function updateSliderPosition() {
        const offset = -(currentIndex * 100) + '%';
        sliderWrapper.css('transform', `translateX(${offset})`);
    }

    $('.next').click(function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSliderPosition();
    });

    $('.prev').click(function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
    });
});

function openModal(title, description) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        closeModal();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const phoneInput = document.getElementById("phone");

    // Добавляем маску для номера телефона
    phoneInput.addEventListener("input", (event) => {
        let value = phoneInput.value.replace(/[^\d]/g, ""); // Удаляем все нецифровые символы

        // Добавляем код страны
        if (!value.startsWith("7")) {
            value = "7" + value;
        }

        // Форматируем номер в шаблон +7 (000) 000-00-00
        let formattedValue = "+7 (";
        if (value.length > 1) {
            formattedValue += value.slice(1, 4); // Первые три цифры после "+7 ("
        }
        if (value.length >= 5) {
            formattedValue += ") " + value.slice(4, 7); // Следующие три цифры
        }
        if (value.length >= 8) {
            formattedValue += "-" + value.slice(7, 9); // Две цифры после дефиса
        }
        if (value.length >= 10) {
            formattedValue += "-" + value.slice(9, 11); // Последние две цифры
        }

        phoneInput.value = formattedValue;
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Предотвращаем отправку формы

        // Получаем значения полей
        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const agree = document.getElementById("agree").checked;

        // Проверяем корректность email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Введите корректный адрес электронной почты.");
            return;
        }

        // Проверяем согласие с политикой конфиденциальности
        if (!agree) {
            alert("Необходимо согласиться с политикой конфиденциальности.");
            return;
        }

        // Если все проверки пройдены, выводим уведомление
        alert("Заявка отправлена. Мы скоро с вами свяжемся.");
        form.reset();
    });
});
