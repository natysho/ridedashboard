import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

export interface ModalProps {
    showModal: boolean;
    handleClose: any
    file: {
        filePath: string;
        fileType: string;
        fileName: string;
    }

}
function ModalFileViewer(props: ModalProps) {
    const [file, setFile] = useState(props.file)


    useEffect(() => {
        setFile(props.file)
    }, [props.file])

    return (
        <>

            <Modal fullscreen='xl-down' size='lg' centered show={props.showModal} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{file.fileName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {file.fileType === 'pdf' &&
                        <iframe width={750} height={750} src={file.filePath}></iframe>

                    }
                    {file.fileType !== 'pdf' &&
                        <img
                            width={750}
                            height={750}
                            src={file.filePath} />

                    }

                </Modal.Body>

            </Modal>

        </>
    );
}

export default ModalFileViewer