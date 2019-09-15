// タスクの完了・未完了を切り替えるイベントを変数へ格納
/* eslint-disable no-unused-vars */
const checkClickFunc = event => {
  /* eslint-disable no-unused-vars */
  if (event.target.textContent === '■') {
    // 指定したタスクが完了状態なら未完了状態へ変更
    event.target.textContent = '□';
    event.target.parentNode.classList.toggle('js-todo-done');
  } else {
    // 指定したタスクが未完了状態なら完了状態へ変更
    event.target.textContent = '■';
    event.target.parentNode.classList.toggle('js-todo-done');
  }
};

// タスク削除イベントを変数へ格納
const deleteClickFunc = event => {
  let delEle = event.target.parentNode;
  event.target.parentNode.parentNode.removeChild(delEle);
};

// タスク名編集の完了イベントを変数へ格納
// inputタグに値が入力される度に発生するイベント
const taskNameEditEndFunc = event => {
  // Shift+Enterで編集を完了するイベント
  if (event.shiftKey && event.keyCode === 13) {
    let inputVal = event.srcElement.value; // 入力された値を変数へ格納
    let newSpanText = document.createElement('span'); // spanタグを新規作成して、入力された値を設定
    newSpanText.classList.add('text');
    newSpanText.classList.add('js-text');
    newSpanText.textContent = inputVal; // spanタグへ入力された値を書き込み
    newSpanText.addEventListener('click', taskNameClickFunc);
    event.srcElement.parentNode.replaceChild(newSpanText, event.srcElement);
  }
};

// タスク名がクリックされたらタスク名が編集できるようにするイベントを変数へ格納
const taskNameClickFunc = event => {
  let taskName = event.target.textContent; // 元のタスク名を変数へ格納
  let newInput = document.createElement('input'); // inputタグを新規作成し、attrとeventを設定
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('name', 'todo');
  newInput.setAttribute('value', taskName); // inputタグの既定値として元のタスク名を設定
  newInput.addEventListener('keydown', taskNameEditEndFunc); // inputタグにShift+Enterが押されたら編集を完了するイベントを設定
  let parentNodeEle = event.target.parentNode;
  parentNodeEle.replaceChild(newInput, event.target);
  parentNodeEle.getElementsByTagName('input')[0].focus();
};

const btnAdd = document.querySelector('.js-btn-add');
const errorMsg = document.querySelector('.js-error');
const addToDoInput = document.querySelector('.js-todo-input');
btnAdd.addEventListener('click', event => {
  if (addToDoInput.value === '') {
    errorMsg.className = 'error js-error js-error-on'; //追加ボタンが押されても入力値が空ならエラーを表示するだけ
  } else {
    errorMsg.className = 'error js-error'; //追加ボタンが押されて入力値有りならエラー表示を非表示にする。
    // ToDoリストへタスクを追加する処理を開始
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

    let todoLists = document.querySelector('.js-todo-lists');
    todoLists.insertBefore(newElement, todoLists.firstChild); //先頭へ追加する

    addToDoInput.value = ''; // 追加用inputタグの入力値を空にする
  }
});

// タスク完了・未完了の切り替えイベント
const checkClick = document.querySelectorAll('.js-check');
for (let i = 0; i < checkClick.length; i++) {
  checkClick[i].addEventListener('click', checkClickFunc);
}

// ゴミ箱がクリックされた場合のDOM削除イベント
const deleteClicks = document.querySelectorAll('.js-delete');
for (let i = 0; i < deleteClicks.length; i++) {
  deleteClicks[i].addEventListener('click', deleteClickFunc);
}

// タスク名がクリックされた場合のタスク名変更イベント
const taskNameClicks = document.querySelectorAll('.js-text');
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
      todoItems[i].classList.add('js-search-out');
    } else {
      todoItems[i].classList.remove('js-search-out');
    }
  }
});
