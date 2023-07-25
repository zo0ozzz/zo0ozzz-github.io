import hljs from "highlight.js";

// auto 메서드를 사용하니까 언어를 굳이 지정해주지 않아도 될 듯!
// 아니! 탐색해야 하는 선택지를 하나만 주면 연산량이 더 적어지지 않을까!
// 즉시 지정
hljs.configure({
  languages: ["javascript"],
});

export default hljs;
