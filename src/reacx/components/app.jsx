import React, { Component } from "react";
import MarkdownData from "../../../data/postdata.md";

class App extends Component {
    render() {
        return(
            <div className="content">
                <h1>{ MarkdownData.title }</h1>
                <div dangerouslySetInnerHTML={{ __html: MarkdownData.__content }}></div>
            </div>
        )
    }
}

export default App;