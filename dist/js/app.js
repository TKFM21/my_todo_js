const btnAdd = document.querySelector('.js-btn-add');
const errorMsg = document.querySelector('.error');
const addToDoInput = document.querySelector('.js-todo-input');
console.log('aaaa');

btnAdd.addEventListener('click', (event) => {
    console.log('bbbb');
    console.log(addToDoInput.value);

    if(addToDoInput.value === ''){
        errorMsg.className = 'error js-error';//追加ボタンが押されても入力値が空ならエラーを表示するだけ
    } else {
        errorMsg.className = 'error';//追加ボタンが押されて入力値有りならエラー表示を非表示にする。
        // ToDoリストへタスクを追加する処理を開始
        let todolists = document.querySelector('.todolists');
        let newElement = document.createElement('div');
        newElement.classList.add('todo-item');

        let newSpan1 = document.createElement('span');
        newSpan1.classList.add('check');
        newSpan1.textContent = '□';
        newElement.appendChild(newSpan1);

        let newSpan2 = document.createElement('span');
        newSpan2.classList.add('text');
        newSpan2.textContent = addToDoInput.value;
        newElement.appendChild(newSpan2);

        let newSpan3 = document.createElement('span');
        newSpan3.classList.add('delete');
        newSpan3.textContent = 'G';
        newElement.appendChild(newSpan3);

        let trn = todolists.insertBefore(newElement, todolists.firstChild);//先頭へ追加する

        console.log(trn);
    };

    console.log('OK');
});