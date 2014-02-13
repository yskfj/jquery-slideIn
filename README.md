jquery-slideIn
==============

横からスライドしてくる


## 画面表示時に一瞬スライドエレメントが見えてしまう場合

以下のように、cssで予め表示を消しておくようにしてください
```css
.jq-slide-in-element {
    display: none;
}
```
```html
<div class="jq-slide-in-element">Slide Element</div>
```
