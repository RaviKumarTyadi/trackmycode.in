import React, { useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function ToastMessage(props: any) {
   //debugger
    useEffect(() => {
       //debugger
        if (props.data.Type === 0) {
            toast.error(props.data.Message, {
                position: "top-right",
                autoClose: props.data.Time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition:Slide
            });
        }
        else if (props.data.Type === 1) {
            toast.success(props.data.Message, {
                position: "top-right",
                autoClose: props.data.Time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition:Slide
            });
        }

    })
    return (
        <div>
            <ToastContainer />
        </div>
    );
}