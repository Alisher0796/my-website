document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("application-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let surname = document.getElementById("surname").value;
        let telegram = document.getElementById("telegram").value;
        let amount = document.getElementById("selected-amount").value;

        if (!amount) {
            alert("Выберите сумму перед отправкой заявки.");
            return;
        }

        let workerUrl = "https://red-frost-d4f7.alischer2021.workers.dev/";  // ✅ Замени на актуальный Cloudflare Worker URL

        fetch(workerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                surname: surname,
                telegram: telegram,
                amount: amount
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Заявка успешно отправлена!");
                document.getElementById("application-form").reset(); // Очистить форму после успешной отправки
            } else {
                alert("Ошибка отправки заявки. Попробуйте снова.");
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert("Ошибка при отправке. Проверьте подключение к интернету.");
        });
    });

    // Обработка выбора суммы
    document.querySelectorAll(".amount-option").forEach(option => {
        option.addEventListener("click", function () {
            document.getElementById("selected-amount").value = this.getAttribute("data-amount");

            // Добавляем класс "selected" к выбранной опции
            document.querySelectorAll(".amount-option").forEach(el => el.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
});
