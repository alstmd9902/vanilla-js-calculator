// //연산자버튼을 뺀 나머지 버튼에 배경색을 넣고 연산자버튼클릭시 다른 색상 넣기
// allBtn.forEach((numbtn) => {
//   numbtn.addEventListener("click", function () {
//     allBtn.forEach((btn) => {
//       btn.classList.remove("bg-gray");
//       btn.classList.remove("bg-blue");
//     });
//     //만약 이곳에 btn.blue(연산자버튼이) 클래스가포함되어있다면
//     if (this.classList.contains("operator")) {
//       this.classList.add("bg-blue");
//     } else {
//       this.classList.add("bg-gray");
//     }
//   });
// });

//btn-blue 클래스명 가진 모든버튼 가져오기
const operatorBtn = document.querySelectorAll(".operator");

//number button 클래스명을 가진 모든 버튼 가져오기
const numberBtn = document.querySelectorAll(".number");

//모든 버튼 요소 가져오기
const allBtn = document.querySelectorAll("button");

//숫자와 연산자 버튼 클릭하면 나오는곳
const displayResult = document.querySelector(".cal-result");

//소수점
const decimalBtn = document.querySelector(".decimal");

//화면 초기값 0
displayResult.textContent = 0;

//연산자 버튼을 누르면 display 에 있는 숫자를 각 변수에 저장
let firstOperand = null; //연산자 버튼을 누르기 전
let operator = ""; // 연산자 버튼을 눌렀을때 저장할 연산자
let newNumBtn = false; //상태 저장

//숫자버튼을 클릭시 화면에 출력하는 이벤트
numberBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    //만약 화면이 0 이라면 숫자버튼 으로 나오게 하기 (변경하기)
    if (displayResult.textContent === "0" || newNumBtn) {
      displayResult.textContent = btn.textContent;
      newNumBtn = false;
      // console.log((displayResult.textContent = num.textContent)); //num만 쓰면 object그대로 화면에 출력이된다 num.textcontent 를 사용해 텍스트값을 가져와 화면에 출력을 해야한다
    } else {
      displayResult.textContent += btn.textContent;
    }
  });
});

//소수점 클릭 이벤트
decimalBtn.addEventListener("click", function () {
  // 이미 소수점이 있으면 아무 것도 안 함
  if (displayResult.textContent.includes(".")) return;

  // 화면이 0이면 0. 으로
  if (displayResult.textContent === "0") {
    displayResult.textContent = "0.";
  } else {
    displayResult.textContent += ".";
  }
});

//clear 버튼 클릭시 초기화
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", function () {
  // displayResult.textContent = 0; // innerHTML 사용시 완전히 글자가 다 없어짐 , true,false를 사용할수있나 ? 아님 textcontent=>0으로 표시를 하는게 낫나 ?
  displayResult.textContent = "0";
  firstOperand = null;
  operator = "";
  newNumBtn = true;
});

//연산자 버튼 이벤트 달기
operatorBtn.forEach((operBtn) => {
  operBtn.addEventListener("click", function (e) {
    if (displayResult.textContent === "0") return;

    // 연산자 버튼을 누를 때마다 현재 화면 값을 첫 번째 숫자로 저장
    if (firstOperand !== null) {
      firstOperand = displayResult.textContent;
    } //
    else {
      firstOperand = displayResult.textContent;
    }

    //연산자버튼 클릭시 operator 변수에 저장
    operator = e.target.textContent;

    // 다음 숫자는 새로 입력해야 함 상태 변경
    newNumBtn = true;

    console.log(firstOperand);
    console.log(operator);
  });
});
