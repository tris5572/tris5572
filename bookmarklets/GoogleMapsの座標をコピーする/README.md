
Google Maps で選択している地点の座標をクリップボードへコピーするブックマークレットです。

自分の作業を楽にするために作っただけのものです。

## 使い方

Google Maps で、地図上の何もないところ（店舗などのアイコンではないところ）をクリックします。すると画面下に住所と座標が表示されます。

<img width="475" height="229" alt="Image" src="https://github.com/user-attachments/assets/e5180fb1-c2a7-4c05-9931-77795978411e" />

ブックマークレットを実行すると、以下のような文字列がクリップボードへコピーされます。

```txt
longitude: 139.761245,
latitude: 35.685729,
```

## ブックマークレットへの変換方法

`script.js` の内容を、ブックマークレットへの変換サイトを使って変換し、変換後のスクリプトをブックマークの URL として保存します。

変換サイトは例えば https://caiorss.github.io/bookmarklet-maker/ などがあります。
