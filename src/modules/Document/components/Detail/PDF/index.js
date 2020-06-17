import React,{useMemo} from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import "./style.less";
const ExamplePDFViewer = (props) => {
    const { url } = props
    const renderPDF = useMemo(() => {
        return <PDFViewer canvasCss="pdf gx-text-center"
            document={{
                url:url
            }}
        />
    },[url])
    return (
      <>
           {renderPDF}
      </>
    )
}

export default ExamplePDFViewer