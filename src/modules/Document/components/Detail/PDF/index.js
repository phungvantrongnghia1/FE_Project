import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
 import "./style.less";
const ExamplePDFViewer = () => {
    return (
        <PDFViewer canvasCss="pdf gx-text-center"
            document={{
                url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf'
            }}
        />
    )
}
 
export default ExamplePDFViewer