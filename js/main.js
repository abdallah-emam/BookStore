let data = [];
const reqres = new XMLHttpRequest;

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');



reqres.open("GET", "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=n7tcHHEyyPLA9JGOJLP6AI55LAtuoh6p");
reqres.send();
reqres.onreadystatechange = function () {
  if (reqres.readyState == 4 && reqres.status == 200) {
    data = JSON.parse(reqres.response).results.books;
    // console.log(data);
  }
  displayBooks();
}


function displayBooks() {
  let temp = ``;
  for (let i = 0; i < data.length; i++) {
    temp += `
    <div class="book-item">
      <div class="book-item-inner">
          <img src=${data[i].book_image} alt="book store">
          <div class="overlay">
            <div class="overlay-inner">
                <h3>${data[i].title}</h3>
                <p>${data[i].description}</p>
                <span>buy it now fom Amazon! <a target="_blank" href=${data[i].buy_links[0].url}>link</a> </span>
            </div>
          </div>
      </div>
    </div>
`
  }
  document.getElementById("display").innerHTML = temp;
}


// Add Smooth scrooling in the padge
document
  .querySelectorAll('a[href^="#"]')
  .forEach(trigger => {
    trigger.onclick = function (e) {
      e.preventDefault();
      let hash = this.getAttribute('href');
      let target = document.querySelector(hash);
      let headerOffset = 70;
      let elementPosition = target.offsetTop;
      let offsetPosition = elementPosition + headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    };
  });


// Form Validation 
form.addEventListener('submit', e => {
  e.preventDefault();

  checkInputs();
});


function checkInputs() {
  // trim to remove the whitespaces
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();


  if (nameValue === '') {
    setErrorFor(name, 'name cannot be blank');
  } else {
    setSuccessFor(name);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Not a valid email');
  } else {
    setSuccessFor(email);
  }

  if (phoneValue === '') {
    setErrorFor(phone, 'phone cannot be blank');
  } else if (!isPhone(phoneValue)) {
    setErrorFor(phone, 'Not a valid phone');
  } else {
    setSuccessFor(phone);
  }


  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  function isPhone(phone) {
    return /^01(0|1|2|5)[0-9]{8}$/.test(phone);
  }
}