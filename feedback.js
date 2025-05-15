const form = document.querySelector('form'); // или твой селектор

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.querySelector('input[name="name"]').value,
    phone: form.querySelector('input[name="phone"]').value,
    rating: form.querySelector('input[name="rating"]').value,
    comment: form.querySelector('textarea[name="comment"]').value,
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyGHSXBuqjpyW-AC1zOQENLMtLjzhtU-4pnCrTaEkqSDi7fPn0Z71FVR10jOGyIgmk/exec', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
    
    const result = await response.json();
    
    if (result.result === 'success') {
      alert('Спасибо за отзыв!');
      form.reset();
    } else {
      alert('Ошибка при отправке: ' + result.error);
    }
  } catch (err) {
    alert('Ошибка сети: ' + err.message);
  }
});
