document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form'); // ← Удалил лишний #

  console.log(document.querySelector('#feedback-form'));
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const data = {
      name: form.querySelector('input[name="name"]').value.trim(),
      phone: form.querySelector('input[name="phone"]').value.trim(),
      restaraunt: form.querySelector('input[name="restaraunt"]').value.trim(),
      extension_5star: form.querySelector('textarea[name="extension_5star"]').value.trim() || '',
    };
  
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyGHSXBuqjpyW-AC1zOQENLMtLjzhtU-4pnCrTaEkqSDi7fPn0Z71FVR10jOGyIgmk/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });
  
      alert('Спасибо за отзыв!');  // Просто подтверждаем отправку, не проверяя ответ
      form.reset();
  
    } catch (error) {
      alert('Ошибка сети: ' + error.message);
    }
  });

});
