import { Rating } from "./classes/rating.js";
import { User } from "./classes/user.js";
import { Archive } from "./classes/archive.js";
import { Answer } from "./classes/answer.js";
import { Utils } from "./classes/utils.js";
import { Favorites } from "./classes/favourites.js";
import { Input } from "./classes/input.js";

class Main {
  API: string = "https://randomuser.me/api/";
  users: string[] | any = JSON.parse(localStorage.getItem("users")!) || [];
  comments: string[] | any =
    JSON.parse(localStorage.getItem("comments")!) || [];
  answers: string[] | any = JSON.parse(localStorage.getItem("answers")!) || [];
  ratings: number[] | any = JSON.parse(localStorage.getItem("ratings")!) || [];
  answerRatings: number[] | any =
    JSON.parse(localStorage.getItem("answerRatings")!) || [];
  itemsSort: string[] | any =
    JSON.parse(localStorage.getItem("itemsSort")!) || [];
  maxUsers: number = 20;

  rating = new Rating({ main: this });
  user = new User({ main: this });
  archive = new Archive({ main: this, rating: this.rating });
  answer = new Answer({ main: this, rating: this.rating });
  utils = new Utils({ main: this });
  favorites = new Favorites();
  input = new Input({ main: this });

  onComments!: NodeListOf<Element>;
  commentsArchiveIsFavorite!: NodeListOf<HTMLElement>;
  commentsAmswerIsFavorite!: NodeListOf<HTMLElement>;

  async setUserParams(API: string): Promise<string[]> {
    await fetch(API).then((res: Response) =>
      res
        .json()
        .then((data: any) => {
          const userObj: string[] | any = {
            first: data.results[0].name.first,
            last: data.results[0].name.last,
            src: data.results[0].picture.thumbnail,
          };
          this.users.push(userObj);
          if (this.users.length > this.maxUsers) this.users.pop();
          localStorage.setItem("users", JSON.stringify(this.users));
        })
        .catch(() => {
          console.log("error");
        })
    );
    return this.users;
  }

  formatDate(): string | number {
    let dayOfMonth: string | number = new Date().getDate();
    let month: string | number = new Date().getMonth() + 1;
    let hour: string | number = new Date().getHours();
    let minutes: string | number = new Date().getMinutes();

    month = month < 10 ? "0" + month : month;
    dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${dayOfMonth}.${month} ${hour}:${minutes}`;
  }

  render(): void {
    this.rating = new Rating({ main: this });
    this.user = new User({ main: this });
    this.archive = new Archive({ main: this, rating: this.rating });
    this.answer = new Answer({ main: this, rating: this.rating });
    this.utils = new Utils({ main: this });
    this.favorites = new Favorites();
  }

  renderInput(): void {
    this.input = new Input({ main: this });
  }

  setNextUser(): void {
    this.user.setUser();
    this.users.forEach((el: string | any, idx: number) => {
      if (el != null) this.user.setUserName(idx);
    });
  }

  setNextComments(): void {
    this.comments.forEach((el: string | any, idx: number) => {
      if (el != null) this.archive.setNextUser(idx);
    });
  }

  getCommentsInFavorites(): void {
    this.onComments = document.querySelectorAll(".comments-header__item-text");
    this.onComments[2].addEventListener("click", (event: Event) => {
      let target: HTMLElement = <HTMLElement>event.currentTarget;
      if (!!target)
        target.classList.toggle("comments-header__item-text--active");
      if (target.classList.contains("comments-header__item-text--active")) {
        this.commentsArchiveIsFavorite =
          document.querySelectorAll(".comments__archive");
        for (let element of this.commentsArchiveIsFavorite) {
          if (element.getAttribute("isFavorite") === "false") {
            element.style.display = "none";
          }
        }
        this.commentsAmswerIsFavorite =
          document.querySelectorAll(".comments__answer");
        for (let element of this.commentsAmswerIsFavorite) {
          if (element.getAttribute("isFavorite") === "false") {
            element.style.display = "none";
          }
        }
      } else {
        this.commentsArchiveIsFavorite =
          document.querySelectorAll(".comments__archive");
        for (let element of this.commentsArchiveIsFavorite) {
          element.style.display = "grid";
        }
        this.commentsAmswerIsFavorite =
          document.querySelectorAll(".comments__answer");
        for (let element of this.commentsAmswerIsFavorite) {
          element.style.display = "grid";
        }
      }
    });
  }

  async start(): Promise<void> {
    await this.setUserParams(this.API);

    this.render();
    this.setNextUser();
    this.renderInput();
    this.input.formInput();
    this.input.formSubmit();

    this.setNextComments();
    this.answer.commentAnswer();
    this.answer.setNextAnswers();
    this.utils.increaseCommentCount();
    this.favorites.addToFavoritesArchives();
    this.favorites.addToFavoritesAnswers();
    this.getCommentsInFavorites();
    this.rating.commentsRatingArchive();
    this.rating.commentsRatingAnswer();
    this.utils.sortCommentsByDate();
    this.utils.sortCommentsByNumserOfRating();
    this.input.onFocusTextarea();
    this.utils.sortCommentsByRelevance();
    this.utils.dropdownMenu();
    this.utils.sortCommentsByNumberOfResponses();
  }
}

export { Main };
