'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import StepOneImage from '@/public/images/user-guide/step_01.png'
import StepTwoImage from '@/public/images/user-guide/step_02.png'
import StepThreeImage from '@/public/images/user-guide/step_03.png'
import StepFourImage from '@/public/images/user-guide/step_04.png'
import StepFiveImage from '@/public/images/user-guide/step_05.png'

import { usePageTitle } from '@/src/hooks';

const UserGuidePage = () => {
  usePageTitle({ title: 'User Guide' })

  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    {
      image: StepOneImage,
      title: "Take Free Exam",
      description: "Click on \"Take Free Exam\" button to proceed to the test page"
    },
    {
      image: StepTwoImage,
      title: "Confirm Test Environment",
      description: "Click \"Okay\" button after ensuring you're in a quiet place"
    },
    {
      image: StepThreeImage,
      title: "Begin the Test",
      description: "Click on \"Start Free Test\" button to begin your assessment"
    },
    {
      image: StepFourImage,
      title: "Complete the Test",
      description: "After reading the test script, click \"Finish Test\" to submit your answers"
    },
    {
      image: StepFiveImage,
      title: "View Results",
      description: "Check your score and explore options like View Previous Scores, Provide Feedback, Join Lesson as a Student, or return Home"
    }
  ]

  const handleNextStep = () => {
    if (currentStep === steps.length) {
      router.push('/user')
      return
    }
    setCurrentStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSkip = () => {
    router.push('/user')
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Getting Started Guide</h3>

              <div className="text-center">
                <Image
                  src={steps[currentStep - 1].image}
                  alt={`Step ${currentStep}`}
                  className="img-fluid mb-4 rounded"
                  style={{ maxHeight: "20rem", width: "auto" }}
                  priority={true}
                />
                <h5>Step {currentStep}: {steps[currentStep - 1].title}</h5>
                <p className="text-muted">{steps[currentStep - 1].description}</p>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                <div>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={handleSkip}
                  >
                    Skip Tutorial
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={currentStep > steps.length}
                  >
                    {currentStep === steps.length ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UserGuidePage;