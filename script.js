import { html, Component, render } from "https://unpkg.com/htm/preact/standalone.module.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-database.min.js";
import config from "./firebase.js";

class App extends Component {
  constructor(){
    super();
    firebase.initializeApp(config);
    this.state = { value: '' };
  }
  onInput(e){
    this.value = e.target.value;
  }

  addTodo() {
    const { todos = [] } = this.state;
    this.setState({ todos: todos.concat(`Item ${todos.length} ${this.value}`) });
  }
  render({ page }, { todos = [] }) {
    return html`
          <div class="app">
            <${Header} name="ToDo's (${page})" />
            <ul>
              ${todos.map(todo => html`
                <li key="${todo}">${todo}</li>
              `)}
            </ul>
            <input type="text" onInput=${() => this.onInput(event)} />
            <button onClick=${() => this.addTodo()}>Add Todo</button>
            <${Footer}>footer content here<//>
          </div>
        `;
  }
}

const Header = ({ name }) => html`<h1>${name} List</h1>`

const Footer = props => html`<footer ...${props} />`

render(html`<${App} page="All" />`, document.body);
