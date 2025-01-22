$(document).ready(function () {
  $('#photoForm').on('submit', function (e) {
    e.preventDefault();

    const name = $('#name').val();
    const date = $('#date').val();
    const fileInput = $('#upload')[0].files[0];

    if (!fileInput) {
      alert('Please upload a photo!');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        // Create canvas
        const canvas = $('#canvas')[0];
        const ctx = canvas.getContext('2d');

        // Define final canvas dimensions
        const canvasWidth = 150; // Target width
        const canvasHeight = 200; // Target height
        const photoHeight = 150; // Height for the photo
        const whiteSpaceHeight = 50; // Space for name and date

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Scale the image to fit within 150x150 pixels
        const aspectRatio = img.width / img.height;
        let scaledWidth, scaledHeight;
        if (aspectRatio > 1) {
          // Landscape
          scaledWidth = photoHeight * aspectRatio;
          scaledHeight = photoHeight;
        } else {
          // Portrait or square
          scaledWidth = photoHeight;
          scaledHeight = photoHeight / aspectRatio;
        }
        const offsetX = (canvasWidth - scaledWidth) / 2; // Center horizontally
        const offsetY = 0; // Top aligned

        // Draw resized photo
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

        // Add white space below the image
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, photoHeight, canvasWidth, whiteSpaceHeight);

        // Add name and date
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvasWidth / 2, photoHeight + 20); // Name
        ctx.fillText(date, canvasWidth / 2, photoHeight + 40); // Date

        // Show download button
        $('#download').show();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(fileInput);
  });

  $('#download').on('click', function () {
    const canvas = $('#canvas')[0];
    const link = document.createElement('a');
    link.download = 'resized_photo_150x200.jpg';
    link.href = canvas.toDataURL();
    link.click();
  });
});
