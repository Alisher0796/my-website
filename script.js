document.addEventListener("DOMContentLoaded", function () {

    // ✅ Бургер-меню: открытие/закрытие
    const burgerMenu = document.querySelector(".burger-menu");
    const navMenu = document.querySelector(".nav-menu");

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        // ✅ Закрытие меню при клике вне его области
        document.addEventListener("click", (event) => {
            if (!burgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove("active");
            }
        });
    }

    // ✅ Плавный скролл по якорным ссылкам
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });

                // ✅ Закрытие мобильного меню после перехода
                navMenu.classList.remove("active");
            }
        });
    });

    // ✅ Обработка формы
    const form = document.getElementById("application-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let surname = document.getElementById("surname").value.trim();
            let telegram = document.getElementById("telegram").value.trim();
            let amount = document.getElementById("selected-amount").value;

            // ✅ Проверяем, выбрана ли сумма
            if (!amount) {
                alert("Выберите сумму перед отправкой заявки.");
                return;
            }

            // ✅ Проверяем, начинается ли юзернейм с "@"
            if (!telegram.startsWith("@")) {
                alert("Введите ваш Telegram юзернейм с @ (например, @username)");
                return;
            }

            let workerUrl = "https://red-frost-d4f7.alischer2021.workers.dev/";  // ✅ Замени на актуальный Cloudflare Worker URL

            fetch(workerUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, surname, telegram, amount })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Заявка успешно отправлена!");
                    form.reset(); // ✅ Очистить форму после успешной отправки
                } else {
                    alert("Ошибка отправки заявки. Попробуйте снова.");
                }
            })
            .catch(error => {
                console.error("Ошибка:", error);
                alert("Ошибка при отправке. Проверьте подключение к интернету.");
            });
        });
    }

    // ✅ Обработка выбора суммы
    document.querySelectorAll(".amount-option").forEach(option => {
        option.addEventListener("click", function () {
            document.getElementById("selected-amount").value = this.getAttribute("data-amount");

            // ✅ Добавляем класс "selected" к выбранной опции
            document.querySelectorAll(".amount-option").forEach(el => el.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

});
