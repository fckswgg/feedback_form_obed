document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form'); // Убрала лишний #

  console.log(document.querySelector('#feedback-form'));

  const stars = document.querySelectorAll('.star-btn');

  // Функция обновления цвета звёзд по атрибуту aria-checked
  function updateStarsColor() {
    stars.forEach(star => {
      const checked = star.getAttribute('aria-checked') === 'true';
      star.querySelector('svg').style.fill = checked ? 'gold' : '#ccc';
    });
  }

  // При наведении подсвечиваем звезды до текущей включительно
  stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => {
        s.querySelector('svg').style.fill = i <= index ? 'gold' : '#ccc';
      });
    });

    star.addEventListener('mouseleave', () => {
      updateStarsColor();
    });

    star.addEventListener('click', () => {
      // Обновляем aria-checked у всех звезд
      stars.forEach((s, i) => {
        s.setAttribute('aria-checked', i <= index ? 'true' : 'false');
      });

      // Устанавливаем значение в скрытый input
      const ratingInput = form.querySelector('input[name="rating"]');
      if (ratingInput && ratingInput.value) {
        const ratingValue = +ratingInput.value;
        stars.forEach((s, i) => {
          s.setAttribute('aria-checked', i < ratingValue ? 'true' : 'false');
        });
      } else {
        // Если рейтинга нет, сбросить все aria-checked в false
        stars.forEach(s => s.setAttribute('aria-checked', 'false'));
      }
      updateStarsColor();

    });
  });

  // При загрузке страницы обновляем цвет в зависимости от уже выбранного рейтинга (если есть)
  const ratingInput = form.querySelector('input[name="rating"]');
  if (ratingInput && ratingInput.value) {
    const ratingValue = +ratingInput.value;
    stars.forEach((s, i) => {
      s.setAttribute('aria-checked', i < ratingValue ? 'true' : 'false');
    });
    updateStarsColor();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.querySelector('input[name="name"]').value.trim(),
      phone: form.querySelector('input[name="phone"]').value.trim(),
      restaraunt: form.querySelector('input[name="restaraunt"]').value.trim(),
      extension_5star: form.querySelector('textarea[name="extension_5star"]').value.trim(),
      extension_doc: form.querySelector('textarea[name="extension_doc"]').value.trim(),
      extension_buh: form.querySelector('textarea[name="extension_buh"]').value.trim(),
      extension_teh: form.querySelector('textarea[name="extension_teh"]').value.trim(),
      extension_edu: form.querySelector('textarea[name="extension_edu"]').value.trim(),
      extension_lk: form.querySelector('textarea[name="extension_lk"]').value.trim(),
      extension_other: form.querySelector('textarea[name="extension_other"]').value.trim(),
      rating: ratingInput ? ratingInput.value || '' : ''
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyGHSXBuqjpyW-AC1zOQENLMtLjzhtU-4pnCrTaEkqSDi7fPn0Z71FVR10jOGyIgmk/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      // Редирект сразу после отправки, без ожидания ответа
      window.location.href = 'https://obed.ru';

    } catch (error) {
      alert('Ошибка сети: ' + error.message);
    }
  });
});
