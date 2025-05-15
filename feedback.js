document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form'); // ← Удалил лишний #

  console.log(document.querySelector('#feedback-form'));
  
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
      extension_other: form.querySelector('textarea[name="extension_other"]').value.trim()
    };
  
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyGHSXBuqjpyW-AC1zOQENLMtLjzhtU-4pnCrTaEkqSDi7fPn0Z71FVR10jOGyIgmk/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

              // Редирект сразу после отправки, без ожидания ответа
        window.location.href = 'https://obed.ru';
    
      } catch (error) {
        alert('Ошибка сети: ' + error.message);
      }
  
    } catch (error) {
      alert('Ошибка сети: ' + error.message);
    }
  });

});
