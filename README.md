jquery-slideIn
==============

主にスマフォなどの画面が小さい端末で、画面横からスライドして詳細を表示するような場合に利用します 


### 画面表示時に一瞬スライドエレメントが見えてしまう場合

以下のように、cssで予め表示を消しておくようにしてください
```css
.jq-slide-in-element {
    display: none;
}
```
```html
<div class="jq-slide-in-element">Slide Element</div>
```
