// Module imports
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "../serviceWorker.js";
// Local imports
import MarkdownData from "../../data/postdata.md";

export default class App extends Component {
    render() {
        return(
            <div className="content">
                <h1>{ MarkdownData.title }</h1>
                <div dangerouslySetInnerHTML={{ __html: MarkdownData.__content }}></div>
            </div>
        )
    }
}

ReactDOM.render(<App></App>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();