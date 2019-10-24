import React from 'react';
import {
    Card, Spin,
    Tag, Col, Row, Typography
} from 'antd';
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import './App.css';


class JupViewer extends React.Component {
    state = {

        //themes:
        background_theme: "black",
        background_text_theme: 'white',
        background_input_theme: '#2F3129',
        background_output_theme: '#4a5470',
        loading: true,
        notebook_json: null,
        placeholder_component: "Loading...."
    }

    async componentDidMount() {
        if (!!this.props.file) {
            await fetch(this.props.file)
                .then((r) => r.text())
                .then(async (text) => {
                    try {
                        var notebook_json = JSON.parse(text)
                        this.setState({
                            notebook_json: notebook_json,
                            loading: false,
                            placeholder_component: 'Notebook loaded'
                        })
                        console.log(this.state.notebook_json)
                    } catch (error) {
                        alert('OOps! Unable to load json')
                        this.setState({
                            notebook_json: { "message": "Unable to parse .ipynb file" },
                            loading: false,
                            placeholder_component: 'Oops! We have problem opening the notebook'
                        })
                    }

                })
        }
    }

    praseSource(source) {
        var cell_content = ``
        for (var code in source) {
            cell_content += source[code]
        }
        return cell_content
    }

    render() {
        console.log(this.props.file)
        return (
            <div>
                {
                    this.state.placeholder_component
                }
                <br></br>
                <Spin spinning={this.state.loading} >
                    <center>
                        {
                            this.state.loading ? <div></div> : (this.state.notebook_json['cells'].map(item => (
                                <Card
                                    bodyStyle={{
                                        padding: '3px 3px',
                                        backgroundColor: this.state.background_theme
                                    }}
                                    style={{
                                        maxWidth: '700px',
                                    }}
                                >
                                    <Row
                                        style={{
                                            backgroundColor: this.state.background_input_theme
                                        }}
                                    >
                                        <Col span={2}>
                                            <Typography.Text
                                                style={{
                                                    color: this.state.background_text_theme,
                                                    float: 'left',
                                                    padding: '5px'
                                                }}>
                                                In:
                                            </Typography.Text>
                                        </Col>

                                        <Col span={22}>
                                            <AceEditor
                                                readOnly
                                                placeholder="---"
                                                mode="python"
                                                theme="monokai"
                                                name="code"
                                                style={{
                                                    maxWidth: '700px',
                                                    padding: '10px'
                                                }}
                                                width="100%"
                                                maxLines={item['source'].length == 0 ? 1 : item['source'].length}
                                                onLoad={this.onLoad}
                                                onChange={this.onChange}
                                                fontSize={14}
                                                showGutter={true}
                                                highlightActiveLine={true}
                                                value={this.praseSource(item['source'])}
                                                setOptions={{
                                                    enableBasicAutocompletion: false,
                                                    enableLiveAutocompletion: false,
                                                    enableSnippets: false,
                                                    showLineNumbers: true,
                                                    tabSize: 2,
                                                }} />
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            backgroundColor: '#4a5470'
                                        }}>
                                        <Typography.Text
                                            style={{
                                                color: this.state.background_text_theme,
                                                float: 'left',
                                                padding: '5px'
                                            }}>
                                            Out:
                                        </Typography.Text>
                                    </Row>
                                </Card>
                            )))
                        }
                    </center>
                </Spin>

            </div>
        )
    }
}


export default JupViewer;
