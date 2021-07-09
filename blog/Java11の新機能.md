---
title: Java11の新機能
thumbnail: ./thumbnails/Java-logo.png
slug: java11-new-feature
date: 2021/07/10
tags: ["Java"]
---

今更過ぎるが、Java8から11で追加された機能のうち、気になるところをまとめる  


## var
varが使える。~JavaScriptでは使わなくなったのに~  
型は推論してくれる

```java
var string = "hoge";
```

## リフレクションAPIの変更

リフレクションAPIに変更が入る。  
基本Classインスタンスから呼び出すのは変わらない？  
deprecatedされてるメソッドのドキュメント読めばどう変わるかは書いてある。

```java
// as is
Object.class.newInstance();

// to be
Object.class.getDeclaredConstructor().newInstance();
```

## Collection APIの新機能

### Collection#of
List/Set/Mapにstatic関数ofが追加される  
似たような関数をプロダクトごとに作っていたがそのついに必要がなくなる

```java
Set<String> set = Set.of("A", "B", "C");

// Map は ofじゃなくてofEntries
Map<String, String> map = Map.ofEntries(
    Map.entry("A", "1"),
    Map.entry("B", "2")    
);
```

### Collection#copyOf
コピーを作れる  
コピーはイミュータブル

```java
Set<String> copiedSet = Set.copyOf(set);
```

## Stream APIの新機能

### Predicate#not  
似たような関数をプロダクトごとに作っていたがそのついに必要がなくなる

```java
var notEmptylist = list.stream().filter(Predicate::not(String::isEmpty)).collect(Collectors::toList);
```

## 感想
Java11、8とあんま変わってなくて逆にビックリ  
まあJava使ってる層は変化を求めてなさそうなのである意味正統進化か？