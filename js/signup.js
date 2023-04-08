const formEl = document.querySelector("#signupForm");
const idEl = document.querySelector("#signupId");
const passwordEl = document.querySelector("#signupPassword");

const isUserExist = (newUserId) => {
  const users = localStorage.getItem("userList");

  if (!users) return false;

  const convertedUsers = JSON.parse(users);
  const getExistUsers = convertedUsers.find((user) => user.id === newUserId);

  return getExistUsers ? true : false;
};

const registerUser = (userInfo) => {
  const currentUsers = JSON.parse(localStorage.getItem("userList"));

  if (!currentUsers) {
    const newUserList = [];
    newUserList.push({
      id: userInfo.id,
      password: userInfo.password,
    });

    localStorage.setItem("userList", JSON.stringify(newUserList));
  } else {
    const updatedUsers = currentUsers.concat({
      id: userInfo.id,
      password: userInfo.password,
    });

    localStorage.setItem("userList", JSON.stringify(updatedUsers));
  }
};

const init = () => {
  //일급 객체
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const idValue = idEl.value;
    const passwordValue = passwordEl.value;

    if (isUserExist(idValue)) {
      alert(`${idValue} 유저는 이미 존재합니다!`);
      idEl.value = "";
      passwordEl.value = "";
      return;
    }

    registerUser({ id: idValue, password: passwordValue });
    alert("회원가입 완료!");
    location.href = "./signin.html";
  });
};

document.addEventListener("DOMContentLoaded", init);
