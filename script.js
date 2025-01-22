document.getElementById('resizeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const fileInput = document.getElementById('upload');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  if (fileInput.files.length === 0) {
    alert('Please upload a photo');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      canvas.width = 150; // width as per PSC guidelines
      canvas.height = 200; // height as per PSC guidelines
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.font = "14px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(name, 10, 190);
      ctx.fillText(date, 10, 180);

      document.getElementById('download').style.display = 'block';
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById('download').addEventListener('click', function () {
  const canvas = document.getElementById('canvas');
  const link = document.createElement('a');
  link.download = 'resized_photo.jpg';
  link.href = canvas.toDataURL();
  link.click();
});
