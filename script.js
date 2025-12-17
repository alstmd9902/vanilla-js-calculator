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

//연산자 버튼을 누르면 display 에 있는 숫자를 각 변수에 저장
let firstOperand = null; //연산자 버튼을 누르기 전
let operator = ""; // 연산자 버튼을 눌렀을때 저장할 연산자
let newNumBtn = false; //상태 저장
//  마지막 연산 기억용 상태
let lastOperator = ""; // 마지막 연산자 기억
let lastSecondOperand = null; // 마지막 두번째 숫자 기억

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
  //만약 화면에 . 이 있다면 아무것도 안함
  if (displayResult.textContent.includes(".")) return;

  // '=' 또는 연산자 이후 상태라면 새 숫자 입력을 시작해야 하므로 0. 으로 초기화
  if (newNumBtn) {
    displayResult.textContent = "0.";
    newNumBtn = false; //숫자 이어씀
    return;
  }

  //숫자가 있으면 숫자. 출력
  displayResult.textContent += ".";
});

//연산자 버튼 이벤트 달기
operatorBtn.forEach((operBtn) => {
  operBtn.addEventListener("click", function (e) {
    const currentValue = parseFloat(displayResult.textContent);

    let nextOperator = "";
    //문자로 식별을 해 js는 구분못함 따라서 연산자 식별하게끔
    if (e.target.textContent === "×") nextOperator = "*";
    else if (e.target.textContent === "÷") nextOperator = "/";
    else if (e.target.textContent === "−") nextOperator = "-";
    else nextOperator = e.target.textContent;

    // 소수점 입력 직후 연산자 클릭 → 완전 새 계산
    // ex) 1+2=.3 + 5 =  → 0.3 + 5
    if (!newNumBtn && displayResult.textContent.startsWith("0.")) {
      firstOperand = currentValue; // 소수점을 첫번째 숫자
      operator = nextOperator; // 새 연산자 저장
      lastOperator = nextOperator; //마지막 연산자 기억
      lastSecondOperand = currentValue; // 마지막 숫자 기억
      newNumBtn = true; // 다음숫자 새로 입력
      return;
    }

    // 처음 연산자이거나, 방금 '=' 이후라면 계산하지 말고 저장만
    if (firstOperand === null || newNumBtn) {
      firstOperand = currentValue;
      operator = nextOperator;
      // 마지막 연산자 기억
      lastOperator = nextOperator;
      lastSecondOperand = currentValue;
      newNumBtn = true; // 연산자 뒤에는 새 숫자 입력
      return;
    }

    const result = calculate(firstOperand, operator, currentValue);
    displayResult.textContent = String(result);
    firstOperand = result;
    operator = nextOperator;
    // 마지막 연산자 기억
    lastOperator = nextOperator;
    newNumBtn = true;
  });
});

// = 클릭했을때 계산된 값 화면에 출력하기
const equalsBtn = document.querySelector(".result");
equalsBtn.addEventListener("click", function () {
  // 기준값이 없으면 현재 값을 기준으로 저장
  if (firstOperand === null) {
    firstOperand = parseFloat(displayResult.textContent);
    return;
  }
  // 연산자가 없고 마지막 연산자도 없으면 '=' 는 아무 동작도 하지 않음
  if (operator === "" && lastOperator === "") {
    newNumBtn = true;
    return;
  }
  // 두 번째 숫자를 기억하지 못한 상태면 현재 값을 기억
  if (lastSecondOperand === null) {
    lastSecondOperand = parseFloat(displayResult.textContent);
  }

  //계산되어서 나온 숫자 기억하기 상태변경
  let secondOperand;

  // 연산자 없이 '=' (ex: 0.3 =)
  if (operator === "") {
    secondOperand = lastSecondOperand; // 마지막 숫자
    firstOperand = parseFloat(displayResult.textContent); // 0.3
    operator = lastOperator; // 마지막 연산자
  } //
  else {
    secondOperand = parseFloat(displayResult.textContent);
    lastSecondOperand = secondOperand;
    lastOperator = operator;
  }

  //결과값 계산로직함수 가져오기
  const result = calculate(firstOperand, operator, secondOperand);

  displayResult.textContent = String(result);
  //  기준값은 "마지막으로 입력한 숫자"를 유지
  // firstOperand = lastSecondOperand;

  //다음 계산을위해 마지막 숫자를 저장
  firstOperand = result;
  operator = "";

  newNumBtn = true; //다음 숫자 누르면 새숫자로 입력됨
});

// 계산 하는 함수 만들기
//switch 문 이용해서 계산 로직 짜기
function calculate(num1, operator, num2) {
  let result; // 저장할 값
  //연산자를 이용한 스위치 문 작성
  switch (operator) {
    case "+":
      result = num1 + num2; //ex) result(값) = 1+1 / 1+2 ...>
      break; //종료

    // 케이스가 - 이면 a-b
    case "-":
      result = num1 - num2; //ex) result(값) = 1-1 / 1-2 ...>
      break; //종료

    // 케이스가 / 이면 a/b
    case "/":
      result = num2 === 0 ? 0 : num1 / num2; //ex) result(값) = 1/1 / 1/2 ...>
      break; //종료

    // 케이스가 * 이면 a+b
    case "*":
      result = num1 * num2; //ex) result(값) = 1*1 / 1*2 ...>
      break; //종료

    // 일치하는 케이스가 없을때
    default: // 일치하는 case가 없을 경우
      result = "유효하지 않은 연산자입니다.";
      break;
  }
  return result;
}
// console.log(calculate(0, "-", 2));

//clear 버튼 클릭시 초기화
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", function () {
  // displayResult.textContent = 0; // innerHTML 사용시 완전히 글자가 다 없어짐 , true,false를 사용할수있나 ? 아님 textcontent=>0으로 표시를 하는게 낫나 ?
  displayResult.textContent = "0";
  firstOperand = null;
  operator = "";
  // 마지막 연산 정보도 초기화
  lastOperator = "";
  lastSecondOperand = null;
  newNumBtn = true;
});
