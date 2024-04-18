class Favorites {
  buttonsArchiveFavoritesArchives!: NodeListOf<Element>;
  buttonsArchiveFavoritesAnswers!: NodeListOf<Element>;
  constructor() {}
  addToFavoritesArchives(): void {
    this.buttonsArchiveFavoritesArchives = document.querySelectorAll(
      ".comments__archive-favourites-btn"
    );
    this.buttonsArchiveFavoritesArchives.forEach((el) => {
      el.addEventListener("click", (event) => {
        let target: HTMLElement = <HTMLElement>event.currentTarget;
        target.classList.toggle("comments__archive-favourites-btn--active");
        if (
          target.classList.contains("comments__archive-favourites-btn--active")
        ) {
          this.addToFavoritesContentBefore(event);
        } else {
          this.addToFavoritesContentAfter(event);
        }
      });
    });
  }

  addToFavoritesAnswers(): void {
    this.buttonsArchiveFavoritesAnswers = document.querySelectorAll(
      ".comments__answer-favourites-btn"
    );
    this.buttonsArchiveFavoritesAnswers.forEach((el) => {
      el.addEventListener("click", (event) => {
        let target: HTMLElement = <HTMLElement>event.currentTarget;
        target.classList.toggle("comments__answer-favourites-btn--active");
        if (
          target.classList.contains("comments__answer-favourites-btn--active")
        ) {
          this.addToFavoritesContentBefore(event);
        } else {
          this.addToFavoritesContentAfter(event);
        }
      });
    });
  }
  addToFavoritesContentBefore(event: any): void {
    event.currentTarget.children[0].src = "./src/assets/heart_full.svg";
    event.currentTarget.children[0].alt = "heart_full";
    event.currentTarget.children[0].width = "24";
    event.currentTarget.children[0].height = "24";
    event.currentTarget.children[1].textContent = "\u00A0В избранном";
    event.currentTarget.children[1].style.color = "#000";
    event.currentTarget.parentElement.setAttribute("isFavorite", true);
  }
  addToFavoritesContentAfter(event: any): void {
    event.currentTarget.children[0].src = "./src/assets/heart_empty.svg";
    event.currentTarget.children[0].alt = "heart_empty";
    event.currentTarget.children[0].width = "24";
    event.currentTarget.children[0].height = "24";
    event.currentTarget.children[1].textContent = "\u00A0В избранное";
    event.currentTarget.children[1].style.color = "#a1a1a1";
    event.currentTarget.parentElement.setAttribute("isFavorite", false);
  }
}
export { Favorites };
