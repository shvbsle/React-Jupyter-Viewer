import React from 'react';
import './App.css';


class JupViewer extends React.Component {
    state = {
        loading: true,
        notebook_json: null
    }

    async parseNB(notebookJSON){
        var simple_cells = []
        for(var cell in notebookJSON['cells']){
            var intermediate_payload = notebookJSON['cells'][cell]['cell_type']
            simple_cells.push(intermediate_payload)
        }
        console.log(simple_cells)
        return simple_cells
    }

    async componentDidMount() {
        if (!!this.props.file) {
            await fetch(this.props.file)
                .then((r) => r.text())
                .then(async (text) => {
                    try {
                        var notebook_json = JSON.parse(text)
                        console.log(notebook_json)
                        var simple_notebook_rep = await this.parseNB(notebook_json)
                        this.setState({
                            notebook_json:simple_notebook_rep,
                            loading:false
                        })
                    } catch (error) {
                        alert('OOps! Unable to load json')
                        this.setState({
                            notebook_json:{"message":"Unable to parse .ipynb file"},
                            loading:false
                        })
                    }
                    
                })
        }
    }

    render() {
        console.log(this.props.file)
        return (
            <div>
                {
                    this.state.loading ? "Loading...." :
                        this.state.notebook_json
                }
            </div>
        )
    }
}


export default JupViewer;
