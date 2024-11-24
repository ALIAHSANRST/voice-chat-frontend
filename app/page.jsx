"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faTachometerAlt,
  faLayerGroup
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import LightLogo from "@/public/images/logo/light.jpeg";
import { useAuthenticationContext } from "@/src/context/AuthenticationContext";

const HomePage = () => {
  const { currentUser } = useAuthenticationContext();

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center border border-muted rounded-3 bg-white shadow-sm">
        <Image src={LightLogo} alt="Globalie" style={{
          width: "15rem",
          height: "auto"
        }} className="mt-5" />

        <h2 className="text-muted fw-normal m-0 p-0 px-lg-5 px-md-3 mt-4">
          Welcome to <span className="fw-bold">Globalie</span>
        </h2>

        <hr className="w-100 p-0 m-0 mt-4 text-muted" />

        {
          !currentUser && (
            <div className="d-flex gap-3 p-4 w-100">
              <Link className="btn btn-outline-success w-100" href='/sign-up'>
                <FontAwesomeIcon icon={faUserPlus} className="me-3" />
                Sign Up
              </Link>
              <Link className="btn btn-primary w-100" href='/sign-in'>
                <FontAwesomeIcon icon={faSignInAlt} className="me-3" />
                Sign In
              </Link>
            </div>
          )
        }

        {
          currentUser && (
            <div className="d-flex gap-3 p-4 w-100">
              <Link className="btn btn-outline-danger w-100" href='/logout'>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-3" />
                Logout
              </Link>
              <Link className="btn btn-primary w-100" href={`/${currentUser.account_type}`}>
                <FontAwesomeIcon icon={faLayerGroup} className="me-3" />
                Dashboard
              </Link>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default HomePage;