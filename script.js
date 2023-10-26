const video = document.getElementById('camera');
      const toggleCameraButton = document.getElementById('toggleCamera');
      const captureButton = document.getElementById('capture');
      const canvas = document.getElementById('canvas');
      const downloadLink = document.getElementById('download');

      let currentCamera = 'environment'; // Inicialmente, definir para a câmera traseira

      // Função para alternar entre a câmera frontal e traseira
      function toggleCamera() {
        currentCamera = currentCamera === 'user' ? 'environment' : 'user';
        setupCamera();
      }

      // Função para configurar a câmera com a seleção atual
      async function setupCamera() {
        try {
          const constraints = { video: { facingMode: currentCamera } };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          video.srcObject = stream;
        } catch (error) {
          console.error('Erro ao acessar a câmera:', error);
        }
      }

      // Solicitar acesso à câmera
      setupCamera();

      // Lidar com o clique no botão de alternância de câmera
      toggleCameraButton.addEventListener('click', toggleCamera);

      // Lidar com o clique no botão de captura
      captureButton.addEventListener('click', function () {
        // Desenhar o quadro do vídeo no canvas
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0);

        // Converter o canvas para uma imagem JPEG
        const imageDataURL = canvas.toDataURL('image/jpeg');

        // Exibir o link de download
        downloadLink.href = imageDataURL;
        downloadLink.style.display = 'block';
      });





