document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const stars = document.querySelectorAll('.star-btn');
  const ratingInput = form.querySelector('input[name="rating"]');
  const comment5Wrapper = document.getElementById('comment-5star-wrapper');
  const secondaryQuestions = document.getElementById('secondaryquestions');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Скрыть все extension-блоки при загрузке
  document.querySelectorAll('.extension').forEach(el => {
    el.style.display = 'none';
  });


  // Раскрытие extension-блоков НУ ОТПРАВЬ ТЫ УЖЕ ПУШ ДО ВЕРСЕЛЯ
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      let extensionDiv = null;

      if (checkbox.closest('.variant')) {
        extensionDiv = checkbox.closest('.variant').querySelector('.extension');
      }

      if (!extensionDiv) return;

      extensionDiv.style.display = checkbox.checked ? 'block' : 'none';
    });
  });

  // Установка начальных значений
  stars.forEach(star => star.setAttribute('aria-checked', 'false'));

  function updateStarsColor() {
    stars.forEach(star => {
      const checked = star.getAttribute('aria-checked') === 'true';
      star.querySelector('svg').style.fill = checked ? '#fe5f00' : '#ccc';
    });
  }

  // Обработчики наведения и клика по звёздам
  stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => {
        s.querySelector('svg').style.fill = i <= index ? '#fe5f00' : '#ccc';
      });
    });

    star.addEventListener('mouseleave', updateStarsColor);

    star.addEventListener('click', () => {
      const rating = index + 1;

      if (ratingInput) ratingInput.value = rating;

      stars.forEach((s, i) => {
        s.setAttribute('aria-checked', i <= index ? 'true' : 'false');
      });

      if (comment5Wrapper) {
        comment5Wrapper.style.display = rating === 5 ? 'block' : 'none';
      }

      if (secondaryQuestions) {
        secondaryQuestions.style.display = rating <= 4 ? 'block' : 'none';
      }

      updateStarsColor();
    });
  });

  // Инициализация цвета звёзд из значения ratingInput
  if (ratingInput) {
    const ratingValue = Number(ratingInput.value);
    if (ratingValue >= 1 && ratingValue <= stars.length) {
      stars.forEach((s, i) => {
        s.setAttribute('aria-checked', i < ratingValue ? 'true' : 'false');
      });

      if (comment5Wrapper) {
        comment5Wrapper.style.display = ratingValue === 5 ? 'block' : 'none';
      }

      if (secondaryQuestions) {
        secondaryQuestions.style.display = ratingValue <= 4 ? 'block' : 'none';
      }
    } else {
      ratingInput.value = '0';
      stars.forEach(s => s.setAttribute('aria-checked', 'false'));
    }
  }

  updateStarsColor();

  // Отправка формы
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
      rating: ratingInput ? Number(ratingInput.value) || 0 : 0
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyGHSXBuqjpyW-AC1zOQENLMtLjzhtU-4pnCrTaEkqSDi7fPn0Z71FVR10jOGyIgmk/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      window.location.href = 'https://obed.ru';
    } catch (error) {
      alert('Ошибка сети: ' + error.message);
    }
  });
});
