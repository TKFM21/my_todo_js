const btnAdd = document.querySelector('.js-btn-add');
const errorMsg = document.querySelector('.error');
const addToDoInput = document.querySelector('.js-todo-input');

/* eslint-disable no-unused-vars */
const checkClickFunc = event => {
  /* eslint-disable no-unused-vars */
  if (event.target.textContent === '■') {
    event.target.textContent = '□';
    event.target.parentNode.className = 'todo-item';
  } else {
    event.target.textContent = '■';
    event.target.parentNode.className = 'todo-item js-todo-done';
  }
};

/* eslint-disable no-unused-vars */
const deleteClickFunc = event => {
  /* eslint-disable no-unused-vars */
  let delEle = event.target.parentNode;
  event.target.parentNode.parentNode.removeChild(delEle);
};

/* eslint-disable no-unused-vars */
const taskNameClickFunc = event => {
  /* eslint-disable no-unused-vars */
  let taskName = event.target.textContent;
  let newInput = document.createElement('input');
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('name', 'todo');
  newInput.setAttribute('value', taskName);
  newInput.addEventListener('keydown', event => {
    if (event.shiftKey && event.keyCode === 13) {
      let inputVal = event.srcElement.value;
      let newSpanText = document.createElement('span');
      newSpanText.classList.add('text');
      newSpanText.textContent = inputVal;
      newSpanText.addEventListener('click', taskNameClickFunc);
      event.srcElement.parentNode.replaceChild(newSpanText, event.srcElement);
    }
  });
  let parentNodeEle = event.target.parentNode;
  parentNodeEle.replaceChild(newInput, event.target);
  parentNodeEle.getElementsByTagName('input')[0].focus();
};

/* eslint-disable no-unused-vars */
btnAdd.addEventListener('click', event => {
  /* eslint-disable no-unused-vars */
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
    let spanEventFunc = [checkClickFunc, taskNameClickFunc, deleteClickFunc];
    for (let i = 0; i < 3; i++) {
      let newSpan = document.createElement('span');
      newSpan.classList.add(spanClassName[i]);
      newSpan.textContent = spanTextContent[i];
      newSpan.addEventListener('click', spanEventFunc[i]);
      newElement.appendChild(newSpan);
    }

    todolists.insertBefore(newElement, todolists.firstChild); //先頭へ追加する

    addToDoInput.value = '';
  }
});

// タスク完了・未完了の切り替えイベント
const checkClick = document.querySelectorAll('.check');
for (let i = 0; i < checkClick.length; i++) {
  checkClick[i].addEventListener('click', checkClickFunc);
}

// ゴミ箱がクリックされた場合のDOM削除イベント
const deleteClicks = document.querySelectorAll('.delete');
for (let i = 0; i < deleteClicks.length; i++) {
  deleteClicks[i].addEventListener('click', deleteClickFunc);
}

// タスク名がクリックされた場合のタスク名変更イベント
const taskNameClicks = document.querySelectorAll('.text');
for (let i = 0; i < taskNameClicks.length; i++) {
  taskNameClicks[i].addEventListener('click', taskNameClickFunc);
}

// 検索機能
const searchEle = document.querySelector('#search');
searchEle.addEventListener('keyup', event => {
  let inval = event.srcElement.value;
  let regexp = new RegExp('^' + inval);
  let todoItems = document.querySelectorAll('.todo-item');
  for (let i = 0; i < todoItems.length; i++) {
    let strval = todoItems[i].querySelector('.text').textContent;
    if (!strval.match(regexp)) {
      console.log(todoItems[i]);
      todoItems[i].className = 'todo-item search-out';
    } else {
      todoItems[i].className = 'todo-item';
    }
  }
});
