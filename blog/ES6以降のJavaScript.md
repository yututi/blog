---
title: ES6以降のJavaScript
thumbnail: ./thumbnails/js-logo.png
slug: javascript-after-es6
date: 2021/07/10
tags: ["JavaScript"]
---

所属している組織のメンバーの大半がES5でJavaScriptの知識が止まっている状態だったので、教育のため追加された機能をまとめる

## const, let

再代入が可能かどうかを明示できる変数宣言。


```js
let hoge = "a"; // let: 再代入可能な変数であることを明示する。
const fuga = "b"; // const: 再代入不可能な変数であることを明示する。
```

`let`いらんくね？って思うけどvarとスコープの扱いが違う。  
`var`と違い変数の巻き上げの対象にならない

## class構文

```js
class Hoge {
    // コンストラクタ
    constructor() {
        this.field = "aaa"; // ES6時点では、クラスメンバはコンストラクタ内で定義する。
    }

    // 関数
    someFunction() {
        // do something.
    }

    // static 関数
    static someStaticFunction(){
        // do something.
    }
}

// static 変数
Hoge.staticField = "bbb"; 
```

## アロー関数


```js
// as is
document.addEventListener("click", function(e) {
    console.log("hoge");
});

// to be
document.addEventListener("click", (e) => {
    console.log("hoge");
});
```

シュガーシンタックスと思いきや`this`の扱いが違う。
```js
var list = ["a"];
var thisObj = { message1: "hello" };
this.message2 = "hellooo";

// 通常の関数は、そのコールバックを呼び出す関数の使用に従う。
// ※Array.prototype.forEachは第二引数が指定された場合、それをthisにする。
list.forEach(function(element) {
    console.log(this.message1); // => hello
    console.log(this.message2); // => undefined
}, thisObj);

// アロー関数は、その関数が定義されたスコープのthisを引き継ぐ
list.forEach((element) => {
    console.log(this.message1); // => undefined
    console.log(this.message2); // => hellooo
}, thisObj)
```


## デフォルト引数

```js
function hoge(messaeg = "default"){
    console.log(messaeg)
};

hoge("hello"); // => hello
hoge(); // => default
```


## 分割代入
```js
var sample = {
    hoge: "hello",
    fuga: function(msg){
        console.log(msg)
    }
}

var { hoge, fuga } = sample;
fuga(hoge); // => hello

// 関数の引数にも使える。デフォルト引数も使える。
function logMessage({hoge = "helloooo", fuga}){
    fuga(hoge);
}

logMessage(sample); // => hello
```

## `` ` `` (back quote)での文字列結合（テンプレートリテラル）
`` ` ``で括った文字列の中で`${}`を使うと文字列に埋め込める。

```js
var message = "ES6";

// console.log("hello " + message);と同等
console.log(`hello! ${message}`); // => hello! ES6
```

## スプレッド構文
ほぼオブジェクトマージ用

```js
var obj1 = {
    a:"1",
    b:"2"
}

var obj2 = {
    b:"x",
    c:"3"
    ...obj1
}

console.log(obj2); // => { a:"1", b:"2", c:"3" }
```

配列にも使える

```js
const array1 = [1, 2]
const array2 = [
  ...array1,
  3,
  4
]
console.log(array2) // => [1, 2, 3, 4]
```

## Promise
非同期処理用の仕組み
<!-- TODO サンプルコードがどっかからコピペしてきたやつなので変える必要あり -->
```js
function timer(number, callback) {
  setTimeout(function() {
    callback(number * 2);
  },1000);
}

// 今まで非同期処理はコールバック関数で渡すしかなかったため、
// 非同期処理を順次呼び出す場合はネストが深くなっていた
timer(100, function(number) {
  timer(number, function(number) {
    timer(number, function(number) {
      timer(number, function(number) {
        timer(number, function(number) {
          console.log(number); // => 3200
        });
      });
    });
  });
});

function promiseTimer(number) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(number * 2);
    },1000);
  });
}

// プロミスを利用すると、メソッドチェーンで非同期処理を呼び出すことができる
promiseTimer(100)
  .then(promiseTimer)
  .then(promiseTimer)
  .then(promiseTimer)
  .then(promiseTimer)
  .then(function (value) {
    console.log(value) // => 3200
  });
```

## モジュール管理
モジュール管理の仕組みが導入されている。ブラウザでサポートされているが、2021年現在はwebpackでバンドルするのが主流で、その時にモジュールの依存関係は解決されるので、ブラウザ上でモジュール管理のコードが動くことはあまりないと思う

```js
// hoge.js
// デフォルトエクスポート
export default "hello!"

// 名前付きエクスポート
export const msg = "world"
```

```js
// fuga.js
// import構文で別ファイルでエクスポートされているオブジェクトを参照できる
// 以下はデフォルトエクスポートされているオブジェクトをインポートする例
import hello from "hoge.js"
// 名前付きエクスポートされているオブジェクトは分割代入の形式でimportできる
import { msg } from "hoge.js"

console.log(hello + msg) // => hello!world
```
