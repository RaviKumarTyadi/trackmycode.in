import { Row, Col, Modal } from 'antd';
import { Component } from 'react';
import {  ExclamationCircleFilled  } from '@ant-design/icons';

interface IState {
    display: boolean;
    DeleteMessageTitle: string;
    DeleteMessage: string;
}
interface IProps {
    display: boolean;
    DeleteMessageTitle: string;
    DeleteMessage: string;
    sendData: (value: boolean) => void;
}

class DeleteConfirmationComponent extends Component<any, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            display: this.props.display,
            DeleteMessageTitle: this.props.DeleteMessageTitle,
            DeleteMessage: this.props.DeleteMessage
        }
    }
    handleCancel = () => {
        this.setState({ display: false });
        this.props.sendData(false);
    }
    handleDelete = () => {
        this.setState({ display: false });
        this.props.sendData(true);
    }

    render() {
        return (
            <>
                {
                    this.state.display ?
                        <>
                            <Modal
                                visible={this.state.display}
                                className="Confirmation"
                                onCancel={() => this.handleCancel()}
                                footer={[]}
                            >
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={24}>
                                        <div className="ConfirmationTitle">
                                            <ExclamationCircleFilled/>&nbsp;&nbsp;&nbsp;<span>{this.props.DeleteMessage}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16} className="ConfirmationBtnDiv mt-12">
                                        <div key="No" className='ConfirmationNoBtn' onClick={() => this.handleCancel()}>
                                            No
                                        </div>
                                        <div key="Yes" className='ConfirmationYesBtn' onClick={() => this.handleDelete()}>
                                            Yes
                                        </div>
                                </Row>
                            </Modal>

                        </>
                        :
                        null
                }
            </>
        )
    }
}
export default DeleteConfirmationComponent