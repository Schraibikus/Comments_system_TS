import { Main } from "../main";
class User {
  main: Main;

  commentsHeader: HTMLDivElement | null;
  userComment: HTMLFormElement | any;
  userImg!: HTMLImageElement | null;
  userName!: HTMLParagraphElement | null;

  constructor({ main }: { main: Main }) {
    this.main = main;
    this.commentsHeader = document.querySelector(".comments-header");
    this.userComment = document.querySelector(".comments__user");
  }

  setUser(): void {
    this.userComment = <HTMLFormElement>document.createElement("form");
    this.userComment.classList.add("comments__user");
    this.userComment.innerHTML = `  
    <img class="authorImg" src="${
      this.main.users.at(-1).src
    }" alt="user" width="61" height="61"/>
    <p class="comments__answer-title-nav">${this.main.users.at(-1).first} ${
      this.main.users.at(-1).last
    }</p>
        <textarea
          class="comment__input-form"
          name="comment"          
          rows="1"
          placeholder="Введите текст сообщения..."
        ></textarea>
        <output class="comment__output-form">Макс. 1000 символов</output>
        <p class="comments__output-error">Слишком длинное сообщение</p>
        <button class="comment__input-btn button" type="submit">
          Отправить
        </button>
      `;
    if (!!this.commentsHeader) this.commentsHeader.after(this.userComment);
  }
  setUserName(idx: number): void {
    this.userImg = document.createElement("img");
    this.userImg.src = `${this.main.users[idx].src}`;
    this.userImg.alt = "user";
    this.userImg.width = 61;
    this.userImg.height = 61;
    this.userName = document.createElement("p");
    this.userName.classList.add("comments__archive-title");
    this.userName.textContent = `${this.main.users[idx].first} ${this.main.users[idx].last}`;

    if (!!this.userComment) this.userComment.prepend(this.userImg);
    this.userImg.remove();

    if (!!this.userComment) this.userComment.prepend(this.userName);
    this.userName.remove();
  }
}

export { User };
