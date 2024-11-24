'use client'

import Image from "next/image";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"
import { useRouter } from "next/navigation";

import LightLogo from "@/public/images/logo/light.jpeg";
import CustomAlertDialogue from "@/src/components/CustomAlertDialogue";
import { useAuthenticationContext } from "@/src/context/AuthenticationContext";

const UserHomePage = () => {
  const { currentUser } = useAuthenticationContext();
  const router = useRouter();

  const [showAlertDialogue, setShowAlertDialogue] = useState(false);
  const [showLogoutDialogue, setShowLogoutDialogue] = useState(false);

  return (
    <div className="py-4 container" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-column justify-content-center align-items-center border border-muted rounded-3 bg-white shadow-sm px-3 py-4 w-100">
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center w-100 gap-md-3 gap-0">
          <Image src={LightLogo} alt="Globalie" style={{ width: "12.5rem", height: "fit-content" }} />

          <div className="mx-3">
            <hr className="w-100 p-0 m-0 mt-4 text-muted" />
            <p className="fs-5 my-2 text-muted text-center lh-sm w-100 px-3 user-select-none">
              Welcome, {currentUser.fullname}!
              <br />
              Let's learn English globally!
            </p>
            <hr className="w-100 p-0 m-0 mb-3 text-muted" />
          </div>
        </div>
      </div>

      <div className="container border border-muted rounded-3 bg-white shadow-sm p-3 mt-4 pt-2 pb-4">
        <Row className="w-100 p-0 m-0 g-3">
          <Col xl={3} lg={4} md={6} sm={12}>
            <Button
              variant="primary"
              size="lg"
              href="/user/free-exam"
              className="w-100">
              Take Free Exam
            </Button>
          </Col>
          <Col xl={3} lg={4} md={6} sm={12}>
            <Button
              variant="outline-secondary"
              size="lg"
              className="w-100"
              onClick={() => setShowAlertDialogue(true)}>
              Join Lesson as a Student
            </Button>
          </Col>
          <Col xl={3} lg={4} md={6} sm={12}>
            <Button
              variant="outline-secondary"
              size="lg"
              className="w-100"
              onClick={() => setShowAlertDialogue(true)}>
              Join Lesson as a Teacher
            </Button>
          </Col>
          <Col xl={3} lg={4} md={6} sm={12}>
            <Button
              variant="outline-primary"
              size="lg"
              className="w-100"
              href="/user/exam-history">
              View Exam History
            </Button>
          </Col>
          <Col xl={3} lg={4} md={6} sm={12}>
            <Button
              variant="outline-success"
              size="lg"
              className="w-100"
              href="/user/provide-feedback">
              Provide Feedback
            </Button>
          </Col>
          <Col xl={3} lg={4} md={6} sm={12}>
            <Button
              variant="outline-danger"
              size="lg"
              className="w-100"
              onClick={() => setShowLogoutDialogue(true)}>
              Logout
            </Button>
          </Col>
        </Row>
      </div>

      {
        showAlertDialogue &&
        <CustomAlertDialogue
          title='Info'
          positiveMessage='Okay'
          positiveCallback={() => setShowAlertDialogue(false)}
          show={showAlertDialogue}
          handleClose={() => setShowAlertDialogue(false)}>
          <p>Under Development!</p>
        </CustomAlertDialogue>
      }

      {
        showLogoutDialogue &&
        <CustomAlertDialogue
          title='Warning'
          positiveMessage='Yes'
          negativeMessage='No'
          positiveCallback={() => {
            router.push('/logout');
            setShowLogoutDialogue(false);
          }}
          negativeCallback={() => setShowLogoutDialogue(false)}
          show={showLogoutDialogue}
          handleClose={() => setShowLogoutDialogue(false)}>
          <p>Are you sure you want to logout?</p>
        </CustomAlertDialogue>
      }
    </div>
  )
}

export default UserHomePage