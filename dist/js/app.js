const btnAdd = document.querySelector('.js-btn-add');
const errorMsg = document.querySelector('.error');
const addToDoInput = document.querySelector('.js-todo-input');
console.log('aaaa');
const checkClick = document.querySelectorAll('.check');

btnAdd.addEventListener('click', event => {
console.log('bbbb');
console.log(addToDoInput.value);

  if (addToDoInput.value === '') {
    errorMsg.className = 'error js-error'; //追加ボタンが押されても入力値が空ならエラーを表示するだけ
  } else {
    errorMsg.className = 'error'; //追加ボタンが押されて入力値有りならエラー表示を非表示にする。
    // ToDoリストへタスクを追加する処理を開始
    let todolists = document.querySelector('.todolists');
    let newElement = document.createElement('div');
    newElement.classList.add('todo-item');

    let spanClassName = ['check', 'text', 'delete'];
    let spanTextContent = ['□', addToDoInput.value, 'G'];

    for (let i = 0; i < 3; i++) {
      let newSpan = document.createElement('span');
      newSpan.classList.add(spanClassName[i]);
      newSpan.textContent = spanTextContent[i];
      newElement.appendChild(newSpan);
    }

    let checkClickSpan = newElement.firstChild;
    console.log(checkClickSpan);
    checkClickSpan.addEventListener('click', event => {
      if (checkClickSpan.innerHTML === '■') {
        checkClickSpan.innerHTML = '□';
        checkClickSpan.parentElement.className = 'todo-item';
      } else {
        checkClickSpan.innerHTML = '■';
        checkClickSpan.parentElement.className = 'todo-item js-todo-done';
      }
    });

    let trn = todolists.insertBefore(newElement, todolists.firstChild); //先頭へ追加する

    addToDoInput.value = '';

    console.log(trn);
  }

  console.log('OK');
});

console.log(checkClick.length);
console.log(checkClick[1]);

for (let i = 0; i < checkClick.length; i++) {
  checkClick[i].addEventListener('click', event => {
    console.log('check Event');
    if (checkClick[i].innerHTML === '■') {
      checkClick[i].innerHTML = '□';
      checkClick[i].parentElement.className = 'todo-item';
    } else {
      checkClick[i].innerHTML = '■';
      checkClick[i].parentElement.className = 'todo-item js-todo-done';
    }
  });
}
