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

        let scriptUrl = "https://script.google.com/macros/s/AKfycbxd3o1NqT8pIfQ-uDZqsm7hPnQRii42fQjhYEIjm6KegSmck-BeKN2lIuu8qnyttG8sGQ/exec"; // Вставь новый URL Google Apps Script

        fetch(scriptUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                surname: surname,
                telegram: telegram,
                amount: amount
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data === "OK") {
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
