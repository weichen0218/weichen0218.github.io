import { getDatabase, ref, set } from "./firebase.js"
const db = getDatabase();
const formatter = new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
});

// Form validation
const forms = document.querySelectorAll('.needs-validation');
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated')
  }, false)
})

const result = [];
const feedback = document.querySelector('#feedback');
feedback.addEventListener("submit", event => {
  event.preventDefault();
  if (feedback.checkValidity()) {
    const formData = new FormData(feedback);
    for (let value of formData.values()){
      result.push(DOMPurify.sanitize(value.split(" ").join("")));
    }
    writeUserData(...result);
    result.length = 0;
    feedback.reset();
    feedback.classList.remove('was-validated');
    sessionStorage.clear();
  }
})

function writeUserData(lastname, firstname, email, message){
  const userData = {
    lastName: lastname,
    firstName: firstname,
    email: email,
    message: message,
    time: formatter.format(new Date())
  };
  const reference = ref(db, `users/${crypto.randomUUID()}`);
  set(reference, userData)
  .then(() => {
    const successModal = new bootstrap.Modal("#successModal");
    successModal.show();
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  });
}