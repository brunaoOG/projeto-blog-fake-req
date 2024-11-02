let userData = {};

const showLoginForm = () => {
  let form = document.querySelector(".loginForm");
  form.style.marginLeft = 0;
  form.style.opacity = 1;
};

const closeLoginForm = () => {
  let form = document.querySelector(".loginForm");
  form.style.opacity = 0;
  form.style.transition = "opacity linear 0.3s";
  setTimeout(() => {
    form.style.marginLeft = "2000px";
  }, 300);
};

const tryLogin = () => {
  let inputNames = [];
  let inputValues = [];
  let allInputs = document
    .querySelector(".loginForm .form")
    .querySelectorAll("input[placeholder]");
  for (let input of allInputs) {
    if (input.value === "") {
      let warning = document.createElement("p");
      warning.classList.add("warning");
      warning.innerText = "Verifique se preencheu todos os campos.";
      document.querySelector(".loginForm h2").after(warning);
      return;
    } else {
      if (document.querySelector(".warning")) {
        document.querySelector(".warning").innerHTML = "";
      }
      inputNames.push(input.name);
      inputValues.push(input.value);
      inputNames.forEach((item, index) => {
        userData[item] = inputValues[index];
      });
    }
  }
  let sendLogin = fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  document.querySelector("#showForm").classList.replace("active", "inactive");

  let profileNameEl = document.querySelector("#userProfileName");
  profileNameEl.classList.replace("inactive", "active");

  let profileNameContent = document.createElement("p");
  profileNameContent.innerText = `${userData.firstName} ${userData.lastName}`;

  profileNameEl.append(profileNameContent);

  getAge(userData.birthdate, new Date());

  closeLoginForm();
};

const getAge = (birth, today) => {
  let b = {
    y: Number(birth.slice(0, 4)),
    m: Number(birth.slice(5, 7)),
    d: Number(birth.slice(8, 10)),
  };
  let t = {
    y: today.getFullYear(),
    m: today.getMonth() + 1,
    d: today.getDate(),
  };

  userData.age =
    b.m < t.m
      ? t.y - b.y
      : b.m == t.m
      ? b.d <= t.d
        ? t.y - b.y
        : t.y - (b.y + 1)
      : t.y - (b.y + 1);
};

document.querySelector("#closeForm").addEventListener("click", closeLoginForm);
document.querySelector("#showForm").addEventListener("click", showLoginForm);
document.querySelector("#loginSubmit").addEventListener("click", tryLogin);
