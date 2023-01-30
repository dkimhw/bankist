'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-04-24T13:15:33.035Z",
    "2019-04-30T09:48:16.867Z",
    "2019-05-25T06:04:23.907Z",
    "2020-06-25T14:18:46.235Z",
    "2020-07-28T16:33:06.386Z",
    "2020-07-30T14:43:26.374Z",
    "2020-08-06T18:49:59.371Z",
    "2020-08-07T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "es-ES",
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const createUsernames = (accounts) => {
  accounts.forEach((account) => {
    const nameArr = account.owner.toLowerCase().split(' ');
    const username = nameArr.map((name, idx) => {
      if (idx === nameArr.length - 1) {
        return name;
      } else if (idx === 0) {
        return name[0];
      }
    }).join('');

    account.username = username;
  })
}

createUsernames(accounts);

const calcDaysPassed = (date1, date2) => {
  return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
};

const formatDate = (date) => {
  const convertedDate = new Date(date);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const intDate = new Intl.DateTimeFormat(currAccount.locale, options).format(convertedDate)
  return intDate
}

const currencyFormat = (num) => {
  const options = {
    style: "currency",
    currency: currAccount.currency
  }

  const formattedNum = new Intl.NumberFormat(currAccount.locale, options).format(num);
  return formattedNum;
}

const displayMovements = (acct, sort = false) => {
  containerMovements.innerHTML = '';
  const movs = sort ? acct.movements.slice().sort((a, b) => a - b) : acct.movements;

  movs?.forEach((movement, idx) => {
    const transactionType = movement < 0 ? 'withdrawal' : 'deposit';
    const displayDate = formatDate(acct.movementsDates[idx]);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${transactionType}">${idx + 1} ${transactionType}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${currencyFormat(movement)} €</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
};

const calcDisplayPrintBalance = (acct) => {
  acct['balance'] = acct.movements.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  labelBalance.textContent = `${currencyFormat(acct['balance'])}`;
}

const calcDisplaySummary = (acct) => {
  const incomes = acct?.movements.filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes} €`;

  const withdrawals = acct?.movements.filter(mov => mov < 0).reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${withdrawals} €`;

  const interest = acct?.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (acct.interestRate / 100))
    .filter((interestAmt, i, arr) => {
      return interestAmt >= 1;
    })
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest} €`
};

const updateUI = (acct) => {
  // Display movements
  displayMovements(acct);

  // Display balance
  calcDisplayPrintBalance(acct);

  // Display summary
  calcDisplaySummary(acct);
}

const closeAccountUpdateUI = () => {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started'
}

btnLogin.addEventListener('click', (evt) => {
  evt.preventDefault();
  currAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI
    labelWelcome.textContent = `Welcome back, ${currAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    labelDate.textContent = formatDate(now);


    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currAccount);
  }
});

// Transfer Functionality
btnTransfer.addEventListener('click', (evt) => {
  evt.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currAccount.balance >= amount &&
    receiverAccount?.username !== currAccount?.username
  ) {
    console.log('Transfer valid');
    currAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    currAccount.movementsDates.push(new Date());
    receiverAccount.movementsDates.push(new Date());
    updateUI(currAccount);
  } else {
    console.log('Not valid');
  }
});

// Loan Functionality
btnLoan.addEventListener('click', (evt) => {
  evt.preventDefault();

  // loan condition
  const loanAmount = Number(inputLoanAmount.value);
  let depositCondition = currAccount.movements.some(movement => movement > loanAmount * .10);

  if (loanAmount > 0 && depositCondition) {
    alert('You are approved!');
    currAccount.movements.push(loanAmount);
    currAccount.movementsDates.push(new Date());
    updateUI(currAccount);
  } else {
    alert('You are not approved.');
  }
})

// Close Acct Functionality
btnClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  let isValidUsername = currAccount.username === inputCloseUsername.value;
  let isValidPasscode = currAccount.pin === Number(inputClosePin.value);
  inputCloseUsername.value = inputClosePin.value = '';

  if (isValidUsername && isValidPasscode) {
    let findCurrAcctIdx = accounts.findIndex(acc => acc.username === currAccount.username);
    accounts.splice(findCurrAcctIdx, 1);
    currAccount = null;
    closeAccountUpdateUI();
  }

});

// Sort functionality
let sortedState = false;
btnSort.addEventListener('click', (evt) => {
  evt.preventDefault();
  displayMovements(currAccount.movements, !sortedState);
  sortedState = !sortedState;
});


let currAccount;
