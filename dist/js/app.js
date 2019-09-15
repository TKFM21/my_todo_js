const btnAdd = document.querySelector('.js-btn-add');
const errorMsg = document.querySelector('.js-error');
const addToDoInput = document.querySelector('.js-todo-input');

/* eslint-disable no-unused-vars */
const checkClickFunc = event => {
  /* eslint-disable no-unused-vars */
  if (event.target.textContent === '■') {
    event.target.textContent = '□';
    event.target.parentNode.className = 'todo-item js-todo-item';
  } else {
    event.target.textContent = '■';
    event.target.parentNode.className = 'todo-item js-todo-item js-todo-done';
  }
};

const deleteClickFunc = event => {
  let delEle = event.target.parentNode;
  event.target.parentNode.parentNode.removeChild(delEle);
};

const taskNameClickFunc = event => {
  let taskName = event.target.textContent;
  let newInput = document.createElement('input');
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('name', 'todo');
  newInput.setAttribute('value', taskName);
  newInput.addEventListener('keydown', event => {
    if (event.shiftKey && event.keyCode === 13) {
      let inputVal = event.srcElement.value;
      let newSpanText = document.createElement('span');
      newSpanText.classList.add('text js-text');
      newSpanText.textContent = inputVal;
      newSpanText.addEventListener('click', taskNameClickFunc);
      event.srcElement.parentNode.replaceChild(newSpanText, event.srcElement);
    }
  });
  let parentNodeEle = event.target.parentNode;
  parentNodeEle.replaceChild(newInput, event.target);
  parentNodeEle.getElementsByTagName('input')[0].focus();
};

btnAdd.addEventListener('click', event => {
  console.log(addToDoInput.value);

  if (addToDoInput.value === '') {
    errorMsg.className = 'error js-error js-error-on'; //追加ボタンが押されても入力値が空ならエラーを表示するだけ
  } else {
    errorMsg.className = 'error js-error'; //追加ボタンが押されて入力値有りならエラー表示を非表示にする。
    // ToDoリストへタスクを追加する処理を開始
    let todoLists = document.querySelector('.js-todo-lists');
    let newElement = document.createElement('div');
    newElement.classList.add('todo-item');
    newElement.classList.add('js-todo-item');

    let spanClassName1 = ['check', 'text', 'delete'];
    let spanClassName2 = ['js-check', 'js-text', 'js-delete'];
    let spanTextContent = ['□', addToDoInput.value, 'G'];
    let spanEventFunc = [checkClickFunc, taskNameClickFunc, deleteClickFunc];
    for (let i = 0; i < 3; i++) {
      let newSpan = document.createElement('span');
      newSpan.classList.add(spanClassName1[i]);
      newSpan.classList.add(spanClassName2[i]);
      newSpan.textContent = spanTextContent[i];
      newSpan.addEventListener('click', spanEventFunc[i]);
      newElement.appendChild(newSpan);
    }

    todoLists.insertBefore(newElement, todoLists.firstChild); //先頭へ追加する

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
  let searchStr = event.srcElement.value;
  let regexp = new RegExp('^' + searchStr);
  let todoItems = document.querySelectorAll('.js-todo-item');
  for (let i = 0; i < todoItems.length; i++) {
    let todoText = todoItems[i].querySelector('.text').textContent;
    if (!todoText.match(regexp)) {
      console.log(todoItems[i]);
      todoItems[i].className = 'todo-item js-todo-item js-search-out';
    } else {
      todoItems[i].className = 'todo-item js-todo-item';
    }
  }
});
