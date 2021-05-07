const btnClose = document.querySelectorAll('.btn-close');


btnClose.forEach((btn, i) => {
  btn.addEventListener('click', function () {
    document.querySelector('.modal_hideInput').value = this.getAttribute('data-id')
    $('#exampleModal').modal('show')
  })
})












  

 