# React-Jupyter-Viewer

## IMPORTANT!!!!
I'm looking for contributors. I noticed that quite a lot of developers find this tool useful and at the same time I feel guilty that I cannot devote enough time to this project due to personal committments. Please reachout in case anyone wants to contribute!

Join the following Slack Workspace for any queries:

https://join.slack.com/t/reactjupytern-0nc7370/shared_invite/zt-140lhgtlg-HaVJNl5OTEdeK1ZomArVZA



### Use jupyter notebooks as a blog
The only reason why I am creating this component is to be able to publish my .ipynb notebooks on my GitHub pages as blog post. I have too many notebooks lying around with my programming notes.  I'm too lazy to boot a ipython kernel to view one of my notebooks. Hence, this component.

I like the default notebook viewer provided by github but there are a few features that would make it more usable for me, which are mostly these: **downloading it as a PDF, dark mode, mobile-enabled view and ability to publish my notebooks as blogs**

Drop me a message if anyone wanna contribute.

![alt text](/static/SupportCoverImages.png "Desktop")

(cover image src: https://notionpress.com/blog/wp-content/uploads/2018/06/Cover-design.png)

### Feature Roadmap

* [X] Load from local file
* [X] Load from URL
* [X] Code blocks
* [X] Render markdown blocks
* [X] Render image blocks
* [X] Render Error blocks
* [X] Add tags to distinguish outputs
* [X] Cell block numbering
* [X] Header Tab (Showing name of notebook and date etc.)
* [X] Hide code execution number (toggle)
* [X] Theme Toggle
* [X] Markdown Dark Theme
* [X] Resolve Relative Markdown sources for images
* [ ] Split as A4 size pages
* [ ] Side-by-side view
* [ ] Download notebook as pdf (will have to enable wordwrap while downloading it as pdf)
* [ ] text/html code block parser
* [ ] Markdown based index

----

#### Desirable Props

prop     | priority | description
---------|----------|-------------
file     | Critical | Load a file from storage  
url      | Critical | Load a file from storage
theme    | good to have| Change from dark to light
blog title| Critical | Title for the blog.
blog cover|good to have| An option to put in cover pic for your blog

---

### Usage
Note that the notebook URL must be the raw_notebook url on github. Click on the 'raw' button in github notebook preview to get the raw source.

```javascript
import React from 'react';
import './App.css';
import JupViewer from './JupViewer'

const ipynb = require('./BenchmarkNotebook.ipynb')

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <JupViewer
          title="Jupyter as a Blog!"
          subtitle="I've always wanted to publish my jupyter notebooks as blogs. Finally I can."
          coverImg="https://notionpress.com/blog/wp-content/uploads/2018/06/Cover-design.png"
          // file={ipynb} 
          file="https://raw.githubusercontent.com/jakevdp/PythonDataScienceHandbook/master/notebooks/00.00-Preface.ipynb"
        />
      </div>
    )
  }
}

export default App;

```
---

### Desktop Preview
![alt text](/static/JupAsBlogDesk.png "Desktop")



### Mobile Preview with theme toggle
Dark|Light
----|----
![alt text](/static/../static/JupDarkMobile.png "Mobile")|![alt text](/static/../static/LightThemeMobile.png "Mobile")


---

### Dependencies
* react-ace
* react-markdown
* antd (UI lib cuz I'm too lazy)
