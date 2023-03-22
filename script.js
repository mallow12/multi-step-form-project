'use strict';

const stepOne = document.getElementById('step-1');
const stepTwo = document.getElementById('step-2');
const stepThree = document.getElementById('step-3');
const stepFour = document.getElementById('step-4');
const thankYou = document.querySelector('.thank-you');
const inputs = document.querySelectorAll('input');
const namee = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('phone-number');
const mainPlan = document.querySelector('.plans');
const switcher = document.querySelector('.switcher');
const addOns = document.querySelector('.add-ons');
const toggle = document.querySelector('.toggle');
const change = document.querySelector('.change');
const mainSummary = document.querySelector('.summary-main');
const summaryTotal = document.querySelector('.summary-total');
const summaryTitle = document.querySelector('.summary-title');
const summaryMainAmount = document.querySelector('.summary-main-amount');
const summaryMainChild = document.querySelector('.summary-main-child');

let okay = true;

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value === '') {
      showError(input, 'This field is required');
    } else {
      showSuccess(input);
    }
  });
}

function checkValidity(input) {
  const re = /\S+@\S+\.\S+/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function nameFormat(input) {
  const words = input.value;

  if (words.length < 4) {
    showError(input, 'Minimum 4 characters');
  } else if (/\d/.test(input.value)) {
    showError(input, 'Wrong format, letters only');
  } else {
    showSuccess(input);
  }
}

function numberFormat(input) {
  const inputValue = input.value;

  if (/[a-zA-Z]/.test(inputValue)) {
    showError(input, 'Wrong format, numbers only');
  } else if (inputValue.length < 7) {
    showError(input, 'Minimum 7 characters');
  } else {
    showSuccess(input);
  }
}

function confirm(inputss) {
  let allFilled = true;
  inputss.forEach((input) => {
    const formControl = input.parentElement;
    if (input.value === '') {
      formControl.classList.add('error');
      allFilled = false;
    } else if (formControl.className.includes('error')) {
      allFilled = false;
    } else {
      formControl.classList.remove('error');
    }
  });

  return allFilled;
}

function updateTotal() {
  const total = document.querySelector('.total');
  const selectAddOn = document.querySelectorAll('.select-add-ons.focus');
  const mainPrice = summaryMainAmount.innerText;
  let totalCost = 0;
  const mainNum = parseInt(mainPrice.substring(1, mainPrice.length - 3));
  selectAddOn.forEach((select) => {
    if (switcher.className.includes('month')) {
      const monthPrice = select.querySelector('.month').innerText;
      const monthPriceNum = parseInt(
        monthPrice.substring(2, monthPrice.length - 3)
      );
      totalCost += monthPriceNum;
    } else {
      const yearPrice = select.querySelector('.year').innerText;
      const yearPriceNum = parseInt(
        yearPrice.substring(2, yearPrice.length - 3)
      );
      totalCost += yearPriceNum;
    }
  });
  totalCost += mainNum;
  total.innerText = switcher.className.includes('month')
    ? `$${totalCost}/mo`
    : `$${totalCost}/yr`;
  if (summaryMainChild.innerHTML === '') {
    total.innerText = summaryMainAmount.innerText;
  }
}
// updateTotal()
function updateToggle() {
  const selectedPlan = document.querySelector('.plan.focus');
  if (switcher.className.includes('month')) {
    const selectedMonth = selectedPlan.querySelector('.month');
    summaryMainAmount.innerText = selectedMonth.innerText;
  } else {
    const selectedYear = selectedPlan.querySelector('.year');
    summaryMainAmount.innerText = selectedYear.innerText;
  }
  updateTotal();
}

function updateAddOnsToggle() {
  const selectAddOns = document.querySelectorAll('.select-add-ons.focus');
  summaryMainChild.innerHTML = ''; // clear previous summary items
  selectAddOns.forEach((select) => {
    let name = select.querySelector('h2').innerText;
    let amount;
    if (switcher.className.includes('month')) {
      const selectedMonth = select.querySelector('.month');
      amount = selectedMonth.innerText;
    } else {
      const selectedYear = select.querySelector('.year');
      amount = selectedYear.innerText;
    }
    const summaryItem = generateSummaryDom(name, amount);
    summaryMainChild.appendChild(summaryItem);
  });
}

function mnyrSwitch() {
  if (switcher.className.includes('month')) {
    switcher.className = 'switcher year';
    mainPlan.className = 'plans yearly';
    addOns.className = 'add-ons yearly';
    mainSummary.className = 'summary-main yearly';
    summaryTotal.className = 'summary-total yearly';
  } else {
    switcher.className = 'switcher month';
    mainPlan.className = 'plans monthly';
    addOns.className = 'add-ons monthly';
    mainSummary.className = 'summary-main monthly';
    summaryTotal.className = 'summary-total monthly';
  }
  updateAddOnsToggle();
}
const nextStep = Array.from(document.querySelectorAll('.next-step'));

const stepButtons = Array.from(document.querySelectorAll('.step-button'));

const buttons = Array.from(document.querySelectorAll('.back'));

let currentStep = 1;

const nextButton = () => {
  if (!stepOne.className.includes('hidden')) {
    if (confirm([namee, email, number])) {
      stepOne.classList.add('hidden');
      stepTwo.classList.remove('hidden');
    }
  } else if (!stepTwo.className.includes('hidden')) {
    stepTwo.classList.add('hidden');
    stepThree.classList.remove('hidden');
  } else if (!stepThree.className.includes('hidden')) {
    stepThree.classList.add('hidden');
    stepFour.classList.remove('hidden');
  } else {
    stepFour.classList.add('hidden');
    thankYou.classList.remove('hidden');
  }
};

const previousButton = () => {
  if (!stepTwo.className.includes('hidden')) {
    stepOne.classList.remove('hidden');
    stepTwo.classList.add('hidden');
  } else if (!stepThree.className.includes('hidden')) {
    stepTwo.classList.remove('hidden');
    stepThree.classList.add('hidden');
  } else {
    stepThree.classList.remove('hidden');
    stepFour.classList.add('hidden');
  }
};

const changeButton = () => {
  if (!stepFour.className.includes('hidden')) {
    stepTwo.classList.remove('hidden');
    stepFour.classList.add('hidden');
  }
};
// document.querySelector('.step-button.focus').classList.remove('focus');
// step.classList.add('focus');

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();

    checkRequired([namee, email, number]);
    checkValidity(email);
    nameFormat(namee);
    numberFormat(number);
  });
});

// Event listener for each plans

const plans = Array.from(document.querySelectorAll('.plan'));

plans.forEach((plan) => {
  plan.addEventListener('click', (e) => {
    document.querySelector('.plan.focus').classList.remove('focus');
    plan.classList.add('focus');
    const name = plan.querySelector('h2');
    const month = plan.querySelector('.month');
    const yearss = plan.querySelector('.year');
    summaryTitle.innerText = name.innerText;

    if (switcher.className.includes('month')) {
      summaryMainAmount.innerText = month.innerText;
    } else {
      summaryMainAmount.innerText = yearss.innerText;
    }
    updateTotal();
  });
});

// Generate Summary dom
const generateSummaryDom = (para, span) => {
  const summaryChild = document.createElement('div');
  summaryChild.className = 'summary-child';
  const summaryPara = document.createElement('p');
  const summarySpan = document.createElement('span');

  summaryPara.innerText = para;
  summarySpan.innerText = span;

  summaryChild.appendChild(summaryPara);
  summaryChild.appendChild(summarySpan);

  return summaryChild;
};

const selectedAddOns = Array.from(document.querySelectorAll('.select-add-ons'));

// Each addons event listener

selectedAddOns.forEach((addOns) => {
  const check = addOns.querySelector('input');
  check.checked = false;
  addOns.addEventListener('click', (e) => {
    let name = addOns.querySelector('h2');
    name = name.innerText;
    let amount = addOns.querySelector('.amountx');
    amount = amount.innerText;
    const summarySec = generateSummaryDom(name, amount);
    if (!addOns.classList.contains('focus')) {
      check.checked = true;
      addOns.classList.add('focus');
      summaryMainChild.appendChild(summarySec);
      addOns.summarySec = summarySec;
    } else {
      check.checked = false;
      addOns.classList.remove('focus');

      const summaryElements = summaryMainChild.querySelectorAll('.summary-child');
      summaryElements.forEach((summaryElement) => {
        const summaryName = summaryElement.querySelector('p').innerText;
        if (summaryName === name) {
          summaryMainChild.removeChild(summaryElement);
        }
      });
    }
    updateTotal();
  });
});

nextStep.forEach((button) => {
  button.addEventListener('click', () => {
    const allFilled = confirm([namee, email, number]);
    if (allFilled) {
      nextButton();
      stepButtons[currentStep - 1].classList.remove('focus');
      currentStep++;
      stepButtons[currentStep - 1].classList.add('focus');
    }
  });
});

buttons.forEach((back) => {
  back.addEventListener('click', () => {
    if (okay) {
      previousButton();
      stepButtons[currentStep - 1].classList.remove('focus');
      currentStep--;
      stepButtons[currentStep - 1].classList.add('focus');
    }
  });
});

toggle.addEventListener('click', () => {
  mnyrSwitch();
  updateToggle();
});

change.addEventListener('click', () => {
  if (okay) {
    changeButton();
    stepButtons[currentStep - 1].classList.remove('focus');
    currentStep = currentStep - 2;
    stepButtons[currentStep - 1].classList.add('focus');
  }
});
