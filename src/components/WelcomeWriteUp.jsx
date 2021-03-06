import React, { useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import styled, { css } from 'styled-components'
import { Stack } from '@mui/material';
import { CssBaseline } from '@material-ui/core';
import useStyles from "../components/MaterialUI-styles"
import { GoZap } from "react-icons/go";
import LoadingButton from '@mui/lab/LoadingButton';
import { motion } from 'framer-motion';
import { pageAnimation } from '../animations';


const WelcomeWriteUp = ({ darkmode, setIsActive, fetchError }) => {
    const { currentUser } = useAuth()
    const myClasses = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('START ASSESSMENT');

    const startAssesment = () => {
        setLoading(true);

        if (!fetchError) {
            setTimeout(() => {
                history.push("/test-is-on")
                setIsActive(true)
                setLoading(false);
            }, 2000);
        } else {
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
                setDisplayMessage(fetchError);
            }, 2000);
        }

    }


    function userDetail() {
        if (currentUser !== null) {
            return currentUser.email
        }
    }


    return (
        <>
            <CssBaseline />
            <WriteUpContainer
                variants={pageAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                darkmode={darkmode}
                className="xl:w-6/12 lg:w-9/12 sm:w-11/12 w-full mx-auto py-6 sm:py-10 sm:px-6 px-3">
                <div className={`title ${darkmode ? "new-title" : ""}`}>
                    <ImgIcon src="images/apptitude-test.png" alt="bulb" />
                    <h1>Aptitude Assessment</h1>
                </div>
                <Article >
                    <br />
                    Welcome <strong>{userDetail()}</strong>. You will have <strong>10mins</strong> to complete the assessment.
                    You might not finish all <strong>35 questions</strong> but do your best to answer as many as you can.<br /><br />
                    Please make sure you have an uninterrupted time to complete the assessment.
                    You are not permitted to use calculators or any other problem-solving-device.
                    Do have a pen and paper with you when you take the assessment.<br /><br />
                    Your time begins as soon as you click the "START ASSESSMENT" button.
                </Article>

                <Stack spacing={4} justifyContent="center" alignItems="center" direction="row">
                    <LoadingButton style={{
                        backgroundColor: "#048f04",
                        padding: "8px 15px",
                        fontSize: "16px",
                        color: '#fff',
                        marginTop: "2rem"
                    }}
                        onClick={startAssesment}
                        className={myClasses.startButton}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<GoZap />}
                        variant="outlined"
                    >
                        {displayMessage}
                    </LoadingButton>
                </Stack>

            </WriteUpContainer>
        </>
    )
}

const WriteUpContainer = styled(motion.section)`
  background-color: 'white';
  border-top: 0.6px solid #dbdbdb;
  transition: border 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;
  border-radius: 10px;
  height: 60vh;
  box-shadow: 0 8px 8px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.10), 
              0 8px 8px rgba(0,0,0,0.05), 
              0 8px 8px rgba(0,0,0,0.05),
              0 16px 16px rgba(0,0,0,0.03);

  @media (max-width: 768px) {
    height:fit-content;
  }
  
  @media (max-width: 640px) {
       h1{
           font-size: 19px;
       }
  }
    
    ${({ darkmode }) => darkmode ? css`
    background-color: var(--darkmodelayer_1);
    color: var(--color-primary);
    border-top: none;
    
    ${Article} {
        color: var(--color-primary);

        strong{
            color:cyan;
        }
    }
    `: ""
    }
`
const ImgIcon = styled.img`
  width: 50px;
  transform: rotate(90deg);
`
const Article = styled.article`
  font-size: 18px;
  font-weight: 400;
  opacity: 0.8;
  color: #021220;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`

export default WelcomeWriteUp
