# React-Jupyter-Viewer
### Use jupyter notebooks as a blog
The only reason why I am creating this component is to be able to publish my .ipynb notebooks on my GitHub pages as blog post. I have too many notebooks lying around with my programming notes.  I'm too lazy to boot a ipython kernel to view one of my notebooks. Hence, this component.

I like the default notebook viewer provided by github but there are a few features that would make it more usable for me, which are mostly these: **downloading it as a PDF, dark mode, mobile-enabled view and ability to publish my notebooks as blogs**

Drop me a message if anyone wanna contribute.


### Feature Roadmap

* [X] Load from local file
* [X] Load from URL
* [X] Code blocks
* [X] Render markdown blocks
* [X] Render image blocks
* [X] Render Error blocks
* [X] Add tags to distinguish outputs
* [ ] Cell block numbering
* [ ] Header Tab (Showing name of notebook and date etc.)
* [ ] Split as A4 size pages
* [ ] Side-by-side view
* [ ] Download notebook as pdf (will have to enable wordwrap while downloading it as pdf)
* [ ] Theme change
* [ ] make markdown dark???
* [ ] text/html code block parser
* [ ] Markdown based index?

----

#### Desirable Props

prop     | priority | description
---------|----------|-------------
file     | Critical | Load a file from storage  
url      | Critical | Load a file from storage
theme    | good to have| Change from dark to light  

---

### Usage
```javascript
import React from 'react';
import './App.css';
import JupViewer from './JupViewer'

// For local notebook
const ipynb = require('./BenchmarkNotebook.ipynb')

class App extends React.Component {
  render() {
    console.log(ipynb)
    return (
      <div className="App">
        <JupViewer
          // file={ipynb}

          // or pass in the raw github url of the file
          file="https://raw.githubusercontent.com/fastai/course-v3/master/nbs/dl1/00_notebook_tutorial.ipynb"
        />
      </div>
    )
  }
}

export default App;

```
---

### Desktop Preview
![alt text](/static/desktop_notebook.png "Desktop")



### Mobile Preview
![alt text](/static/notebook_mobile.png "Mobile")



### Markdown preview
![alt text](/static/markdown_notebook.png "Mobile")

---

### Dependencies
* react-ace
* react-markdown
* antd (UI lib cuz I'm too lazy)