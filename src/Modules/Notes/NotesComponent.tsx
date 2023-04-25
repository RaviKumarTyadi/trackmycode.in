import React, { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import CopyRights from '../General/CopyRights';
import { Context } from '../../App';
import { GetNotesDataService, UpsertNotesDataService, GetThemesDataService, DeleteNotesService, GetFoldersDataService } from './NotesServices';
import { IDeleteData, IDeleteDataModel, IGetFoldersDataModel, IGetNotesDataModel, ITempNotes, ITempNotesModel, IUpsertNotesModel } from './NotesUtils';
import { ToastMessage } from '../../Common/Components/ToastMessage';
import { IStickyEntity, IStickyData } from './../General/GeneralUtils';
import AddIcon from '@mui/icons-material/Add';
// import folder from './../../assets/folder.png';
// import file from './../../assets/file.png';
// import Theme from './../../assets/Theme.svg';
// import More from './../../assets/More.svg';
// import Delete from './../../assets/Delete.svg';
// import AddFile from './../../assets/AddFile.svg';
// import AddFolder from './../../assets/AddFolder.svg';
// import Folder from './../../assets/Folder.svg';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Paper } from '@mui/material';
import { Col, Modal, Row, Button, Input, FloatButton } from 'antd';
import DeleteConfirmationComponent from '../../Common/Components/DeleteConfirmation';
import { PlusCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { IUserLoginData } from '../../Common/ContextStore/ContaxtStore';

const NotesComponent = () => {
    const [notes, setNotes] = useState<any>([]);
    const [Floders, setFolders] = useState<any>([]);
    const [Category, setCategory] = useState<number>(-1);
    const [tempNotes, setTempNotes] = useState<any>({});
    const [themes, setThemes] = useState<any>([]);
    const [deleteNotes, setDeleteNotes] = useState<IDeleteDataModel>(IDeleteData);
    const [context, setContext] = useContext<any>(Context);
    const [IStickyEntity, setIStickyEntity] = useState<IStickyEntity>(IStickyData);
    const [EditModelVisible, setEditModelVisible] = React.useState<boolean>(false);
    const [showTheme, setShowTheme] = React.useState<boolean>(false);
    const updateEntityObj = {
        "NotesID": 0,
        "NoteTitle": '',
        "NoteText": '',
        "FolderID": 0,
        "UserID": context.LoginUserID,
        "ThemeID": 5
    }
    const Loader = (bool: boolean) => {
        setContext((prevState: any) => ({
            ...prevState,
            Spin: bool
        }));
    }
    const showModal = (item: any) => {
        setEditModelVisible(true);
        setTempNotes({ ...item });

    };
    const hideModal = () => {
        setEditModelVisible(false);
    };

    const toggleDrawer = (open: boolean, item: any) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            if (item !== 0) {
                setTempNotes(item)
            }
            setShowTheme(open);
        };

    const ThemesList = (
        <Box
            sx={{ width: 'auto' }}
            role="presentation"
            onClick={toggleDrawer(false, 0)}
            onKeyDown={toggleDrawer(false, 0)}
        >
            <div className='BackgroundCards'>
                {
                    themes.map((item: any) =>
                        <img src={item.ImgBaseCode} alt={item.ColorName} className='BackgroundCardsImg' onClick={() => UpsertNotes(item.ThemeID)} />
                    )
                }
            </div>
        </Box>
    );
    const UpsertNotes = async (id: number) => {
        var ThemeID = id;
        if (id === 0) {
            ThemeID = tempNotes.ThemeID;
        }
        let UpsertNotesModel: IUpsertNotesModel = {
            NotesID: tempNotes.NotesID,
            NoteTitle: tempNotes.NoteTitle,
            NoteText: tempNotes.NoteText,
            FolderID: tempNotes.FolderID,
            UserID: tempNotes.UserID,
            ThemeID: ThemeID
        }
        const res: any = await UpsertNotesDataService(UpsertNotesModel);
        GetNotesData(Category)
    };


    const ChangeCategory = async (ID: number) => {
        setCategory(ID);
        GetNotesData(ID);
    }
    const GetFoldersData = async () => {
        let GetFoldersDataModel: IGetFoldersDataModel = {
            UserID: context.LoginUserID
        }
        const res: any = await GetFoldersDataService(GetFoldersDataModel);
        if (res.status === 200) {
            var resData = res?.data?.result;
            resData = resData === undefined || resData === null ? [] : JSON.parse(resData);
            if (resData) {
                setFolders(resData)
            }
        }
    }

    const GetNotesData = async (ID: number) => {
        let GetNotesDataModel: IGetNotesDataModel = {
            UserID: 1,
            FolderID: ID
        }
        Loader(true);
        const res: any = await GetNotesDataService(GetNotesDataModel);
        Loader(false);
        if (res.status === 200) {
            var resData = res?.data?.result;
            resData = resData === undefined || resData === null ? [] : JSON.parse(resData);
            if (resData) {
                setNotes(resData)
            }
            else {
                setIStickyEntity(prevState => ({
                    ...prevState,
                    Type: 0,
                    Message: 'No Data',
                    Time: 3000,
                    ShowToast: true
                }));
            }
        }
        else if (res.message !== "") {
            setIStickyEntity(prevState => ({
                ...prevState,
                ID: 0,
                Type: 0, // Error
                Message: res.message,
                Time: 3000,
                ShowToast: true
            }));
        }
    }
    const GetThemesData = async () => {
        let data = {};
        const res: any = await GetThemesDataService(data);
        var resData = res?.data?.result;
        resData = resData === undefined || resData === null || JSON.parse(resData).length === 0 ? [] : JSON.parse(resData);
        if (resData.length) {
            setThemes(resData)
        }
    }
    const DeleteCustomerShow = (record: any) => {
        setDeleteNotes({
            ...deleteNotes,
            NotesID: record.NotesID,
            UserID: record.UserID,
            DeleteConfirmationShow: true,
        })
    }
    const DeleteNotesInfo = async (deleteconfirmation: boolean) => {
        setDeleteNotes({ ...deleteNotes, DeleteConfirmationShow: false })
        if (deleteconfirmation) {
            let data = {
                NotesID: deleteNotes.NotesID,
                UserID: deleteNotes.UserID,
            }
            Loader(true);
            const res: any = await DeleteNotesService(data);
            Loader(false);
            GetNotesData(Category);
        }
    }
    useEffect(() => {
        GetFoldersData()
        GetNotesData(-1);
        GetThemesData();
    }, [])

    const Upsert = async () => {
        let data: any = {
            "notesID": tempNotes.NotesID,
            "noteTitle": tempNotes.NoteTitle,
            "noteText": tempNotes.NoteText,
            "folderID": tempNotes.FolderID,
            "userID": tempNotes.UserID,
            "themeID": tempNotes.ThemeID
        }
        Loader(true);
        const res: any = await UpsertNotesDataService(data);
        Loader(false);
        setEditModelVisible(false);
        GetNotesData(Category);
    }

    const handleChange = (e: any) => {
        setTempNotes({ ...tempNotes, [e.target.name]: e.target.value })
    }

    return (
        <>
            {
                IStickyEntity.ShowToast ? <ToastMessage data={IStickyEntity} /> : <></>
            }
            {
                deleteNotes.DeleteConfirmationShow ?
                    <DeleteConfirmationComponent
                        display={deleteNotes.DeleteConfirmationShow}
                        DeleteMessageTitle={deleteNotes.DeleteTitle}
                        DeleteMessage={deleteNotes.DeleteMessage}
                        sendData={DeleteNotesInfo}
                    />
                    :
                    <></>
            }
            <div className="container">
                <Row gutter={16} style={{ margin: 0, padding: '12px' }}>
                    {
                        Floders.length ? Floders.map((item: any) =>
                            <Button
                                className={`${item.FolderID === Category ? 'SelectedCategory' : ''} CategoryButton`}
                                onClick={() => ChangeCategory(item.FolderID)}
                            >
                                {item.FolderName}
                            </Button>
                        )
                            : <></>
                    }
                </Row>
                {/* <div className="mainopShadow"></div> */}
                {/* <div className="fab">
                    <div className="mainop">
                        <i id="addIcon" className="material-icons"><AddIcon /></i>
                    </div>
                    <div id="forms" className="minifab op5">
                        <img className="minifabIcon" src="https://vectr.com/doodleblu/a1y8gN8KKN.svg?width=64&height=64&select=a1y8gN8KKNpage0" />
                    </div>
                    <div id="drawings" className="minifab op4">
                        <img className="minifabIcon" src="https://vectr.com/doodleblu/b2DCtQvEHF.svg?width=64&height=64&select=b2DCtQvEHFpage0" />
                    </div>
                    <div id="slides" className="minifab op3">
                        <img className="minifabIcon" src="https://vectr.com/doodleblu/a12WZHDh0z.svg?width=64&height=64&select=a12WZHDh0zpage0" />
                    </div>
                    <div id="sheets" className="minifab op2">
                        <img className="minifabIcon" src={AddFolder} />
                    </div>
                    <div id="docs" className="minifab op1" onClick={() => showModal(updateEntityObj)}>
                        <img className="minifabIcon" src={AddFile} />
                    </div>
                </div> */}
                <React.Fragment >
                    <SwipeableDrawer
                        anchor='bottom'
                        open={showTheme}
                        onClose={toggleDrawer(false, 0)}
                        onOpen={toggleDrawer(true, 0)}
                    >
                        {ThemesList}
                    </SwipeableDrawer>
                </React.Fragment>
                {
                    notes.length ?
                        <Row gutter={16} style={{ margin: 0, padding: '12px' }}>
                            {notes.map((item: any, index: number) =>
                                <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{ padding: '6px' }}>
                                    <Card key={index} style={{ backgroundColor: `${item.BGColor}`, color: `${item.TextColor}`, borderRadius:'8px' }}>
                                        <div className="title">
                                            <p className='notes_header'>{item.NoteTitle}</p>

                                            {/* <span><img src={Folder} alt="" className='FolderIcon' /> {item.FolderName}</span> <br /> */}
                                            <p className='notes_message'>
                                                {/* {item.NoteText} */}
                                                <textarea style={{color:`${item.TextColor}`}}>{item.NoteText}</textarea>
                                            </p>
                                            <div className='CardButtons'>
                                                <div>
                                                    <h6>{item.Date} -  {item.LengthNoteText} characters</h6>
                                                </div>
                                                <div>
                                                    <Button color="inherit" className="ThemeIcon" onClick={toggleDrawer(true, item)} >
                                                        {/* <img src={Theme} alt="theme icon" /> */}
                                                    </Button>
                                                    <Button color="inherit" className="DeleteIcon" onClick={() => DeleteCustomerShow(item)} >
                                                        {/* <img src={Delete} alt="delete icon" /> */}
                                                    </Button>
                                                    <Button color="inherit" className="MoreIcon" onClick={() => showModal(item)} >
                                                        {/* <img src={More} alt="More icon" /> */}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                        : <></>
                }
                <Modal
                    open={EditModelVisible}
                    title="Title"
                    onCancel={hideModal}
                    footer={[
                        <Button onClick={() => Upsert()} >
                            {tempNotes.NotesID === 0 ? 'Save' : 'Update'}
                        </Button>,
                    ]}
                >
                    <>
                        <Input
                            name='NoteTitle'
                            onChange={handleChange}
                            value={tempNotes?.NoteTitle}
                        >
                        </Input>
                        <TextArea
                            rows={6}
                            name='NoteText'
                            onChange={handleChange}
                            value={tempNotes?.NoteText}
                        />
                    </>
                </Modal>
            </div>
        </>
    );
}




export default NotesComponent;