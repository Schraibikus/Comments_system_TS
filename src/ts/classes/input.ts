import { Main } from "../main";
class Input {
  main: Main;

  forms: HTMLFormControlsCollection;
  commentsForms: any;
  commentsFormsElements: any;
  textarea: HTMLInputElement;
  output: HTMLOutputElement;
  buttonSubmit: HTMLButtonElement;
  lengthCommentError: HTMLElement | null;

  constructor({ main }: { main: Main }) {
    this.main = main;
    this.forms = document.forms;
    this.commentsForms = this.forms[0];
    this.commentsFormsElements = this.commentsForms.elements;
    this.textarea = this.commentsFormsElements[0];
    this.output = this.commentsFormsElements[1];
    this.buttonSubmit = this.commentsFormsElements[2];
    this.lengthCommentError = document.querySelector(".comments__output-error");
  }

  formInput(): void {
    if (!!this.textarea)
      this.textarea.addEventListener("input", () => {
        this.output.textContent = 0 + this.textarea.value.length + "/1000";
        if (this.textarea.value.length > 0) {
          this.buttonSubmitReady();
        } else {
          this.buttonSubmitReady();
        }
        if (this.textarea.value.length > 1000 && !!this.lengthCommentError) {
          this.output.style.color = "red";
          this.lengthCommentError.style.display = "block";
          this.buttonSubmitReady();
        } else if (!!this.lengthCommentError) {
          this.output.style.color = "black";
          this.lengthCommentError.style.display = "none";
        }
        this.textarea.style.height = "0";
        this.textarea.style.height = this.textarea.scrollHeight + "px";
      });
  }

  formSubmit(): void {
    this.commentsForms.addEventListener("submit", (event: any) => {
      if (
        this.textarea.value.length === 0 ||
        this.textarea.value.length > 1000
      ) {
        event.preventDefault();
      } else {
        const commentObj = {
          text: this.textarea.value,
          date: this.main.formatDate(),
        };
        this.main.comments.push(commentObj);
        localStorage.setItem("comments", JSON.stringify(this.main.comments));
      }
    });
  }

  buttonSubmitReady(): void {
    if (this.textarea.value.length > 0 && this.textarea.value.length < 1000) {
      this.buttonSubmit.classList.add("comment__input-btn--ready");
    } else {
      this.buttonSubmit.classList.remove("comment__input-btn--ready");
    }
  }

  onFocusTextarea(): void {
    for (let element of this.commentsFormsElements) {
      if (element.type != "checkbox" && element.type != "submit") {
        element.addEventListener("focus", function () {
          element.style.backgroundColor = "lightyellow";
        });
        element.addEventListener("blur", function () {
          element.style.backgroundColor = "white";
        });
      }
    }
  }
}
export { Input };
