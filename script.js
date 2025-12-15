//btn-blue 클래스명 가진 모든버튼 가져오기
const operatorBtn = document.querySelectorAll(".operator");

//number button 클래스명을 가진 모든 버튼 가져오기
const numberBtn = document.querySelectorAll(".number");

//모든 버튼 요소 가져오기
const allBtn = document.querySelectorAll("button");

//숫자와 연산자 버튼 클릭하면 나오는곳
const displayNum = document.querySelector(".cal-result");
console.log(displayNum);

//연산자버튼을 뺀 나머지 버튼에 배경색을 넣고 연산자버튼클릭시 다른 색상 넣기
allBtn.forEach((numbtn) => {
  numbtn.addEventListener("click", function () {
    allBtn.forEach((btn) => {
      btn.classList.remove("bg-gray");
      btn.classList.remove("bg-blue");
    });
    //만약 이곳에 btn.blue(연산자버튼이) 클래스가포함되어있다면
    if (this.classList.contains("operator")) {
      this.classList.add("bg-blue");
    } else {
      this.classList.add("bg-gray");
    }
  });
});

/*
  - 연산자 버튼을 누르면 Display에 있는 숫자를 각 변수에 저장합니다.
  - 연산자 버튼에 이어 숫자 버튼을 클릭하면 숫자가 Display에 표시합니다.
  - 연산자 버튼을 눌렀을 때, Display에 있는 숫자와 연산자를 Console에 출력합니다.
 */
