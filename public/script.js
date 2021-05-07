const btnClose = document.querySelectorAll('.btn-close');


btnClose.forEach((btn, i) => {
  btn.addEventListener('click', function () {
    document.querySelector('.modal_hideInput').value = this.getAttribute('data-id')
    $('#exampleModal').modal('show')
  })
})


const fileInput = document.querySelector('#inputFIle'),
     fileInputText = document.querySelector('.inputFileText');


fileInput.addEventListener('change', (e) => {
  const fileName = e.target.files[0].name
  if(!fileName) {
    fileInputText.textContent = 'Picture not selected'
  }
  fileInputText.textContent = fileName;
})













  

 