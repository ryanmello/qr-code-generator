const button = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();
  
    clearUI();
  
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
  
    // Validate url
    if (url === '') {
      alert('Please enter a URL');
    } else {
      document.getElementById('default-qr').removeAttribute('src');
      showSpinner();
      // Show spinner for 1 sec
      setTimeout(() => {
        generateQRCode(url, size);
        hideSpinner();
  
        // Generate the save button after the qr code image src is ready
        setTimeout(() => {
          // Get save url
          const saveUrl = qr.querySelector('img').src;
          // Create save button
          createSaveBtn(saveUrl);
        }, 50);
      }, 1000);
    }
  };

const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size
  });
}

const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block'; 
}

const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none'; 
}

const clearUI = () => {
  qr.innerHTML = '';
  const saveLink = document.getElementById('save-link');
  if(saveLink){
    saveLink.remove();
  }
}

const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-sky-500 hover:bg-sky-700 text-white text-center font-bold py-2 rounded w-full m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Download PNG';
  document.getElementById('generated').appendChild(link);
};

hideSpinner();

button.addEventListener('click', onGenerateSubmit);
