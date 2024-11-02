const loadPosts = async () => {
  let req = await fetch("https://jsonplaceholder.typicode.com/posts");
  let json = await req.json();

  for (let post of json) {
    render(post.title, post.body);
  }
};
loadPosts();

const addNewPost = async (title, body) => {
  if (title && body) {
    let req = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        name: userData.name
          ? `${userData.firstName} ${userData.lastName}`
          : undefined,
        age: userData.age ? userData.age : undefined,
        profession: userData.profession ? userData.profession : undefined,
      }),
    });
    userData.age
      ? render(
          title,
          body,
          `${userData.firstName} ${userData.lastName}`,
          userData.age,
          userData.profession
        )
      : render(title, body);
  }
};

const render = (title, body, name, age, profession) => {
  let postArea = document.createElement("section");
  postArea.classList.add("post");

  let postTitle = document.createElement("div");
  postTitle.classList.add("title");
  postTitle.innerText = title;
  let postBody = document.createElement("div");
  postBody.classList.add("body");
  postBody.innerText = body;

  postArea.append(postTitle);
  postArea.append(postBody);

  if (name) {
    let postInfos = document.createElement("div");
    postInfos.classList.add("infos");

    let infoAuthor = document.createElement("p");
    infoAuthor.classList.add("author");
    infoAuthor.innerText = name;

    let infoAge = document.createElement("p");
    infoAge.classList.add("age");
    infoAge.innerText = `${age} anos`;

    let infoProfession = document.createElement("p");
    infoProfession.classList.add("profession");
    infoProfession.innerText = profession;

    let infoDate = document.createElement("p");
    infoDate.classList.add("date");
    infoDate.innerText = `Publicado em: ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

    postInfos.append(infoAuthor);
    postInfos.append(infoAge);
    postInfos.append(infoProfession);
    postInfos.append(infoDate);

    postArea.append(postInfos);
  }

  document.querySelector("main .container").append(postArea);
};

const sendPost = () => {
  if (!userData.age) {
    showLoginForm();
  } else {
    let inputTitle = document.querySelector("#postTitle").value;
    let inputBody = document.querySelector("#postBody").value;

    document.querySelector("#postTitle").value = "";
    document.querySelector("#postBody").value = "";

    addNewPost(inputTitle, inputBody);
  }
};
document.querySelector("#postSubmit").addEventListener("click", sendPost);
