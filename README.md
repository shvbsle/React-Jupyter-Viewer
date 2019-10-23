# React-Jupyter-Viewer
The only reason why I create this repo is to be able to publish my .ipynb notebooks on GitHub pages. I like the default notebook viewer provided by github but there are a few features that would make it more usable.


### Feature Roadmap

* [ ] Load from local file
* [ ] Load from URL
* [ ] Code blocks
* [ ] Render markdown blocks
* [ ] Split as A4 size pages
* [ ] Side-by-side view
* [ ] Download notebook as pdf
* [ ] Theme change

----

#### Desirable Props

prop     | priority | description
---------|----------|-------------
file     | Critical | Load a file from storage  


----

### Rough Design Notes
* Component will have a loading state while loading the viewer