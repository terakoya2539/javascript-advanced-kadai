// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typecount = document.getElementById('typecount');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World', 'This is my App', 'How are you?',
  'Today is sunny', 'I love JavaScript!', 'Good morning',
  // 他のテキスト...
];

// ランダムなテキストを表示
const createText = () => {
  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  // 配列からランダムにテキストを取得し画面に表示する 
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
  // 誤タイプの場合
  if (e.key !== untyped.charAt(0)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  // スコアのインクリメント
  score++;
  typed += untyped.charAt(0);
  untyped = untyped.slice(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // タイピングカウントの更新
  typecount.textContent = score;

  // テキストがなくなったら新しいテキストを表示
  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  let text = '';
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);
  
  untypedfield.style.display = 'none';
  typedfield.textContent = 'タイムアップ！';

  // 少し遅延を入れてconfirmを表示
  setTimeout(() => {
    const result = confirm(rankCheck(score));
    if (result === true) {
      window.location.reload();
    }
  }, 10); // ここで10ミリ秒の遅延を設定
};

  
// カウントダウンタイマー
const timer = () => {
  let time = count.textContent;
  const id = setInterval(() => {
    time--;
    count.textContent = time;
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
  timer();
  createText();
  start.style.display = 'none';
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
