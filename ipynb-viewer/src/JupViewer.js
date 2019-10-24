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

const ReactMarkdown = require('react-markdown')


class JupViewer extends React.Component {
    state = {

        //themes:
        background_theme: "black",
        background_text_theme: 'white',
        // background_input_theme: '#2F3129',
        background_input_theme: '#272822',
        background_output_theme: '#2F3129',
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

    praseOutputs(outputs) {
        if (outputs.length == 0) {
            return ""
        }
        // Handle "data" type cells
        var text_plain = ``
        var stdout = ``
        var errors = ``
        var img_data = `data:image/png;base64,`

        //booleans
        var stdout_found = false
        var text_found = false
        var error_found = false
        var img_found = false

        //maxlines for each output type
        var lines_stdout = 3
        var lines_text_plain = 3
        var lines_error_trace = 3
        for (var outs in outputs) {
            if ("data" in outputs[outs]) {

                if ("text/plain" in outputs[outs]["data"]) {
                    for (var text in outputs[outs]['data']['text/plain']) {
                        text_plain += outputs[outs]['data']['text/plain'][text]
                    }
                    text_found = true
                    lines_text_plain = outputs[outs]["data"]["text/plain"].length
                }
                if ("image/png" in outputs[outs]["data"]) {
                    img_data += outputs[outs]["data"]["image/png"]
                    img_found = true
                }
            }
            if ("name" in outputs[outs]) {
                for (var text in outputs[outs]["text"]) {
                    stdout += outputs[outs]["text"][text]
                }
                stdout_found = true
                lines_stdout = outputs[outs]["text"].length
            }
            // Check for errors
            if ("ename" in outputs[outs]) {
                errors += outputs[outs]['ename'] + "\n" + outputs[outs]["evalue"] + "\n"
                // for (var trace in outputs[outs]["traceback"]) {
                //     errors += outputs[outs]["traceback"][trace]
                // }
                error_found = true
                lines_error_trace = outputs[outs]["traceback"].length
            }
        }

        var return_template = (
            <div>
                <div style={{
                    padding: '5px 3px',
                    display: stdout_found ? '' : 'none'
                }}>
                    <Tag color="#2db7f5"
                    >stdout</Tag><br></br>
                    <AceEditor
                        readOnly
                        placeholder="--"
                        mode="markdown"
                        theme="monokai"
                        name="stdout"
                        style={{
                            maxWidth: '700px',
                            padding: '10px',
                            margin: '10px 0px'
                        }}
                        width="100%"
                        maxLines={lines_stdout+1}
                        fontSize={14}
                        showPrintMargin={false}
                        showGutter={false}
                        highlightActiveLine={false}
                        value={stdout}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: false,
                            tabSize: 2,
                        }} /></div>
                <div style={{ padding: '5px 3px', display: text_found ? '' : 'none' }}>
                    <Tag color="#87d068"
                    >data:text/plain</Tag><br></br>
                    <AceEditor
                        readOnly
                        placeholder="--"
                        mode="markdown"
                        theme="monokai"
                        name="text"
                        style={{
                            maxWidth: '700px',
                            padding: '10px',
                            margin: '10px 0px'
                        }}
                        width="100%"
                        maxLines={lines_text_plain}
                        fontSize={14}
                        showPrintMargin={false}
                        showGutter={false}
                        highlightActiveLine={false}
                        value={text_plain}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: false,
                            tabSize: 2,
                        }} /></div>
                <div style={{ display: img_found ? '' : 'none' }}>
                    <Tag color="#87d068"
                    >data:image/png</Tag><br></br>
                    <img
                        src={img_data}
                        style={{
                            display: img_found ? '' : 'none',
                            width:'100%',
                            backgroundColor:'white'
                        }} />
                </div>
                <div style={{ padding: '5px 3px', display: error_found ? '' : 'none' }}>
                    <Tag color="#f50"
                    >error</Tag><br></br>
                    <AceEditor
                        readOnly
                        placeholder="--"
                        mode="markdown"
                        theme="monokai"
                        name="error"
                        style={{
                            maxWidth: '700px',
                            padding: '10px',
                            margin: '10px 0px'
                        }}
                        width="100%"
                        maxLines={lines_error_trace}
                        fontSize={14}
                        showPrintMargin={false}
                        showGutter={false}
                        highlightActiveLine={false}
                        value={errors}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: false,
                            tabSize: 2,
                        }} /></div>
            </div>
        )


        return return_template
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
                                        padding: '0px 10px',
                                        backgroundColor: this.state.background_output_theme
                                    }}
                                    style={{
                                        width:'100%',
                                        maxWidth: '800px',
                                        border: 'none'
                                    }}
                                >
                                    <Row
                                        style={{
                                            backgroundColor: item['cell_type'] == "code" ? this.state.background_output_theme : "white"
                                        }}
                                    >
                                        <Col span={2}>
                                            <Typography.Text
                                                style={{
                                                    color: this.state.background_text_theme,
                                                    float: 'left',
                                                    padding: '5px',
                                                    color: '#56ACBC',
                                                    display: item['cell_type'] == "code" ? '' : 'none'
                                                }}>
                                                In [ 0 ]:
                                            </Typography.Text>
                                        </Col>

                                        <Col span={21}
                                            style={{
                                                textAlign: 'left'
                                            }}
                                        >

                                            {item['cell_type'] == "code" ? (
                                                <div
                                                    style={{
                                                        padding: '5px 0px',
                                                        borderStyle: 'solid',
                                                        borderWidth: '1px',
                                                        backgroundColor: this.state.background_input_theme
                                                    }}>
                                                    <AceEditor
                                                        readOnly
                                                        placeholder="---"
                                                        mode="python"
                                                        theme="monokai"
                                                        name="code"
                                                        style={{
                                                            maxWidth: '700px',
                                                            padding: '10px',
                                                            margin: '10px 0px'
                                                        }}
                                                        width="100%"
                                                        maxLines={item['source'].length == 0 ? 1 : item['source'].length + 1}
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
                                                </div>
                                            ) : <ReactMarkdown
                                                    style={{
                                                        float: 'left'
                                                    }}
                                                    source={this.praseSource(item['source'])}
                                                    escapeHtml={false}
                                                />}

                                        </Col>
                                        <Col span={1}></Col>
                                    </Row>
                                    {
                                        item['cell_type'] == 'markdown' ? <div></div> :
                                            (
                                                <Row
                                                    style={{
                                                        display: !!item['outputs'].length == 0 ? 'none' : 'visible',
                                                        backgroundColor: this.state.background_output_theme
                                                    }}>

                                                    <Col span={2}>
                                                        <Typography.Text
                                                            style={{
                                                                color: this.state.background_text_theme,
                                                                float: 'left',
                                                                padding: '5px',
                                                                color: '#E5496A'
                                                            }}>
                                                            Out [ ]:
                                                        </Typography.Text>
                                                    </Col>
                                                    <Col span={21}
                                                        style={{
                                                            textAlign: 'left',
                                                            color: 'white'
                                                        }}>
                                                        {this.praseOutputs(item['outputs'])}
                                                    </Col>
                                                    <Col span={1}></Col>
                                                </Row>
                                            )
                                    }
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
