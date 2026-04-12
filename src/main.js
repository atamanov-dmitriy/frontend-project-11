import { proxy } from "valtio/vanilla";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const state = proxy({
  feeds: [],
});

const formNode = document.querySelector("#rss-form");
const inputNode = formNode.querySelector("#rss-form-input");
const helperNode = formNode.querySelector("#rss-form-helper");

inputNode.addEventListener("input", () => {
  inputNode.classList.remove("is-valid", "is-invalid");
  helperNode.classList.remove("text-success", "text-danger");
  helperNode.textContent = "";
});

formNode.addEventListener("submit", (event) => {
  event.preventDefault();

  yup
    .string()
    .required('Не должно быть пустым')
    .url('Ссылка должна быть валидным URL')
    .notOneOf(state.feeds, 'RSS уже существует')
    .validate(inputNode.value)
    .then(() => {
      state.feeds.push(inputNode.value);
      inputNode.classList.add("is-valid");
      helperNode.classList.add("text-success");
      helperNode.textContent = "RSS успешно загружен";
      inputNode.value = "";
    })
    .catch((error) => {
      inputNode.classList.add("is-invalid");
      helperNode.classList.add("text-danger");
      helperNode.textContent = error.message;
    });
});
