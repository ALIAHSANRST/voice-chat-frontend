"use client";

import styled from "styled-components";

import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components";
import { USER_COLORS } from "@/src/utils/colors";
import { COMMON_ASSETS, HOMEPAGE_ASSETS, ICON_ASSETS } from "@/src/utils/assets";
import Link from "next/link";
import { ROUTES } from "@/src/utils/routes";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { usePageTitle } from "@/src/hooks";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  font-family: 'Montserrat', sans-serif;
  background-color: #F4F6F9;
`

const HomePage = () => {
  const router = useRouter();

  usePageTitle({ title: ['Home'] });

  const SectionOneRef = useRef(null);
  const SectionOneImagesContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const backgroundGradient = document.querySelector('img[alt="background gradient"]');
      if (backgroundGradient) {
        backgroundGradient.style.height = `calc(${SectionOneRef.current?.getBoundingClientRect().height}px + ${SectionOneImagesContainerRef.current?.getBoundingClientRect().height / 2}px)`;
      }
    }

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <MainContainer>
      <img src={HOMEPAGE_ASSETS.BACKGROUND_GRADIENT} alt="background gradient" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `calc(${SectionOneRef.current?.getBoundingClientRect().height}px + ${SectionOneImagesContainerRef.current?.getBoundingClientRect().height / 2}px)`,
        objectFit: 'cover',
        zIndex: 1,
      }} />

      <div ref={SectionOneRef} style={{
        position: 'relative',
        zIndex: 2,
      }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem',
          maxWidth: '81.5rem',
          margin: '0 auto',
        }}>
          <img src={COMMON_ASSETS.WIDE_LOGO} alt="globalie logo" style={{
            maxHeight: '3rem',
          }} />

          <div style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
          }}>
            {
              [
                { title: 'Home', link: '/' },
                { title: 'Why Choose', link: '/' },
                { title: 'How It Work', link: '/' },
                { title: 'Testimonial', link: '/' },
                { title: 'FAQs', link: '/' },
              ].map((item, index) => (
                <Link key={`${index}_${item.title}`} href={item.link}
                  style={{
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    color: '#1A1A1A',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}>{item.title}</Link>
              ))
            }
          </div>

          <Link href={ROUTES.SIGN_IN.path}
            style={{
              border: '1px solid #0066FF',
              background: 'white',
              padding: '0.25rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
            }}>
            <span style={{
              fontWeight: 700,
              color: '#0066FF',
              fontSize: '1rem',
              padding: '0 1.25rem'
            }}>Register Now</span>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.875rem',
              background: '#0066FF',
              borderRadius: '0.5rem',
            }}>
              <img src={HOMEPAGE_ASSETS.REGISTER_ARROW_ICON} alt="register arrow icon" />
            </div>
          </Link>
        </nav>

        <section style={{
          margin: '0 auto',
          padding: '3.875rem 0',
          maxWidth: '50rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '50rem',
            padding: '0.5rem 1.5rem',
            display: 'flex',
            gap: '0.5rem',
            color: '#1A1A1A',
          }}>
            <span style={{
              fontWeight: 600,
            }}>+1</span>
            <span style={{
              fontWeight: 400
            }}>Learn and Connect with Top Experts Globally</span>
          </div>

          <h1 style={{
            color: '#1A1A1A',
            fontSize: '4.325rem',
            fontWeight: 600,
            textAlign: 'center',
            margin: 0,
          }}>
            Master Your Skills with Globalie
          </h1>

          <p style={{
            color: '#414D60',
            fontSize: '1rem',
            textAlign: 'center',
            maxWidth: '26.875rem',
            margin: '0 auto',
            fontWeight: 400
          }}>
            AI-Powered Exams and Expert-Led Lessons for Students and Professionals.
          </p>

          <USER_COMPONENTS.Button text={'Take the Exam Now'} onClick={() => router.push(ROUTES.USER_FREE_EXAM.path)} />
        </section>
      </div>

      <section
        ref={SectionOneImagesContainerRef}
        style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'clip',
          position: 'relative',
          zIndex: 2,
        }}>
        {
          [
            HOMEPAGE_ASSETS.PERSON_ONE,
            HOMEPAGE_ASSETS.PERSON_TWO,
            HOMEPAGE_ASSETS.PERSON_THREE,
            HOMEPAGE_ASSETS.PERSON_FOUR,
            HOMEPAGE_ASSETS.PERSON_ONE,
            HOMEPAGE_ASSETS.PERSON_TWO,
            HOMEPAGE_ASSETS.PERSON_THREE,
            HOMEPAGE_ASSETS.PERSON_FOUR,
          ].map((item, index) => (
            <img key={`${index}_${item}`} src={item} alt={`person ${index + 1}`} style={{
              width: '100%',
              maxWidth: '17.5rem',
              objectFit: 'cover',
            }} />
          ))
        }
      </section>

      <section style={{
        margin: '4.875rem auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: '33rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '3.1875rem',
            color: '#1A1A1A',
            fontWeight: 600,
            textAlign: 'center',
          }}>Why Choose Masters in Me?</h2>
          <p style={{
            color: '#414D60',
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: 400,
            margin: 0
          }}>Unlock your true potential and discover a world of opportunities that align with your skills, interests, and aspirations</p>
        </div>

        <div style={{
          display: 'flex',
          gap: '3.5rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignSelf: 'flex-end',
            zIndex: 4,
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: `10px 25px 100px 0px #002B6B40`,
              border: '1px solid #EDEEF0',
              maxWidth: '16.25rem',
            }}>
              <span style={{ padding: '0.5rem', }}>
                <img src={HOMEPAGE_ASSETS.EXPERIENCED_TEACHER_ICON} alt="experienced teacher icon" />
              </span>
              <div>
                <p style={{
                  color: '#1A1A1A',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Experienced Teachers
                </p>
                <p style={{
                  color: '#545D69',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Showcase your project to stand out among all
                </p>
              </div>
              <USER_COMPONENTS.Button text={'Request a tutor'} style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.375rem',
              }} />
            </div>
            <div style={{
              background: 'white',
              borderRadius: '1.25rem',
              padding: '1.5rem 1rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              boxShadow: `10px 25px 100px 0px #002B6B40`,
              border: '1px solid #EDEEF0',
              maxWidth: '16.25rem',
            }}>
              <span style={{ padding: '0.5rem', }}>
                <img src={HOMEPAGE_ASSETS.AUDIENCE_COUNT_ICON} alt="audience count icon" />
              </span>
              <div>
                <p style={{
                  color: '#1A1A1A',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  margin: 0,
                }}>
                  100K+
                </p>
                <p style={{
                  color: '#545D69',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  margin: 0,
                }}>
                  Worldwide Active Users
                </p>
              </div>
            </div>
            <img src={HOMEPAGE_ASSETS.BOTTOM_HAND_DRAWN_ARROW} alt="bottom hand drawn arrow" style={{
              maxWidth: '5.625rem',
              marginRight: '-1.75rem',
              alignSelf: 'flex-end',
            }} />
          </div>
          <div style={{
            position: 'relative',
          }}>
            <div style={{
              background: '#0064FF12',
              border: `1px solid #0064FF99`,
              borderRadius: '100%',
              width: '25rem',
              height: '25rem',
              position: 'absolute',
              zIndex: 3,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}></div>

            <div style={{
              background: '#0064FF0D',
              border: `1px solid #8AB9FF`,
              borderRadius: '100%',
              width: '33.25rem',
              height: '33.25rem',
              position: 'absolute',
              zIndex: 2,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}></div>

            <div style={{
              background: '#0064FF0A',
              border: `1px solid #B0D0FF`,
              borderRadius: '100%',
              width: '40rem',
              height: '40rem',
              position: 'absolute',
              zIndex: 1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}></div>

            <img src={HOMEPAGE_ASSETS.PERSON_FIVE} alt="person five" style={{
              width: '100%',
              maxWidth: '22.5rem',
              objectFit: 'cover',
              zIndex: 4,
              position: 'relative',
            }} />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginTop: '-2rem',
            alignSelf: 'flex-start',
            zIndex: 4,
          }}>
            <img src={HOMEPAGE_ASSETS.TOP_HAND_DRAWN_ARROW} alt="top hand drawn arrow" style={{
              maxWidth: '5.625rem',
            }} />
            <div style={{
              background: 'white',
              borderRadius: '1.25rem',
              padding: '1.5rem 1rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              boxShadow: `10px 25px 100px 0px #002B6B40`,
              border: '1px solid #EDEEF0',
              maxWidth: '16.25rem',
            }}>
              <span style={{ padding: '0.5rem', }}>
                <img src={HOMEPAGE_ASSETS.CUSTOMIZED_EXAMS_ICON} alt="customized exams icon" />
              </span>
              <div>
                <p style={{
                  color: '#1A1A1A',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: '1.5rem',
                }}>
                  Customized Exams
                </p>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: `10px 25px 100px 0px #002B6B40`,
              border: '1px solid #EDEEF0',
              maxWidth: '16.25rem',
            }}>
              <span style={{ padding: '0.5rem', }}>
                <img src={HOMEPAGE_ASSETS.FLEXIBLE_SCHEDULE_ICON} alt="flexible schedule icon" />
              </span>
              <div>
                <p style={{
                  color: '#1A1A1A',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Flexible<br />Schedule
                </p>
                <p style={{
                  color: '#545D69',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Study anytime, anywhere, with your preferred teacher
                </p>
              </div>
              <USER_COMPONENTS.Button text={'Request a tutor'} style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.375rem',
              }} />
            </div>
          </div>
        </div>
      </section>

      <div style={{ background: 'white' }}>
        <section style={{
          padding: '5.5rem 2rem',
          margin: '0 auto',
          display: 'flex',
          gap: '5rem',
          maxWidth: '81.5rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
            maxWidth: '37.5rem',
            width: '100%',
          }}>
            <h1 style={{
              color: '#1A1A1A',
              fontSize: '3.1875rem',
              fontWeight: 600,
            }}>How It Works</h1>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              alignItems: 'center',
            }}>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}>
                <div style={{
                  fontSize: '6.75rem',
                  fontWeight: 600,
                  color: '#0064FF',
                  opacity: 0.15,
                  lineHeight: '1',
                }}>01</div>
                <div style={{
                  boxShadow: `0px 5px 15px 0px #00000026`,
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid #F4F6F9',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <img src={HOMEPAGE_ASSETS.STEP_ONE_ICON} alt="step one icon" style={{ maxWidth: '3.5rem' }} />
                  <div>
                    <p style={{
                      color: '#1A1A1A',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      margin: 0,
                    }}>Register and Verify</p>
                    <p style={{
                      color: '#545D69',
                      fontSize: '0.8125rem',
                      fontWeight: 400,
                      margin: 0,
                    }}>Sign up easily and secure your account to start your journey.</p>
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}>
                <div style={{
                  boxShadow: `0px 5px 15px 0px #00000026`,
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid #F4F6F9',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <img src={HOMEPAGE_ASSETS.STEP_TWO_ICON} alt="step two icon" style={{ maxWidth: '3.5rem' }} />
                  <div>
                    <p style={{
                      color: '#1A1A1A',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      margin: 0,
                    }}>Take the Exam</p>
                    <p style={{
                      color: '#545D69',
                      fontSize: '0.8125rem',
                      fontWeight: 400,
                      margin: 0,
                    }}>Complete the online exam and receive detailed, personalized feedback.</p>
                  </div>
                </div>
                <div style={{
                  fontSize: '6.75rem',
                  fontWeight: 600,
                  color: '#0064FF',
                  opacity: 0.15,
                  lineHeight: '1',
                }}>02</div>
              </div>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}>
                <div style={{
                  fontSize: '6.75rem',
                  fontWeight: 600,
                  color: '#0064FF',
                  opacity: 0.15,
                  lineHeight: '1',
                }}>03</div>
                <div style={{
                  boxShadow: `0px 5px 15px 0px #00000026`,
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid #F4F6F9',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <img src={HOMEPAGE_ASSETS.STEP_THREE_ICON} alt="step three icon" style={{ maxWidth: '3.5rem' }} />
                  <div>
                    <p style={{
                      color: '#1A1A1A',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      margin: 0,
                    }}>Schedule Lessons</p>
                    <p style={{
                      color: '#545D69',
                      fontSize: '0.8125rem',
                      fontWeight: 400,
                      margin: 0,
                    }}>Book sessions with experienced teachers at your convenience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            width: '100%',
            alignItems: 'flex-start',
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
            }}>
              <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_ONE} alt='how it works photo one' style={{
                width: '100%',
                objectFit: 'cover',
              }} />
              <div style={{
                width: '17rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                padding: '1rem',
                background: 'white',
                borderRadius: '1.25rem',
                boxShadow: `10px 25px 100px 0px #002B6B40`,
                border: '1px solid #EDEEF0',
                position: 'absolute',
                top: 'calc(100% + 1.5rem)',
                right: '-2.25rem',
                left: '0',
                zIndex: 4,
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                  <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_THREE} alt='how it works photo three' style={{
                    width: '100%',
                    objectFit: 'cover',
                  }} />
                  <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_FOUR} alt='how it works photo four' style={{
                    width: '100%',
                    objectFit: 'cover',
                    marginLeft: '-0.75rem',
                  }} />
                  <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_FIVE} alt='how it works photo five' style={{
                    width: '100%',
                    objectFit: 'cover',
                    marginLeft: '-0.75rem',
                  }} />
                </div>
                <div style={{
                }}>
                  <p style={{
                    color: '#0066FF',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    margin: 0,
                  }}>10K+</p>
                  <p style={{
                    color: '#545D69',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    margin: 0,
                  }}>Teacher</p>
                </div>
              </div>
            </div>
            <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_TWO} alt='how it works photo two' style={{
              width: '100%',
              objectFit: 'cover',
            }} />
          </div>
        </section>
      </div>

      <section style={{
        padding: '5.5rem 2rem',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        maxWidth: '81.5rem',
      }}>
        <h1 style={{
          color: '#1A1A1A',
          fontSize: '3.1875rem',
          fontWeight: 600,
        }}>
          What our clients say
        </h1>

        <div style={{
          width: '100%',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
        }}>
          <div style={{
            flex: 1.5,
            background: '#1E242C',
            borderRadius: '1.25rem',
            padding: '3rem',
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <span style={{
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 600,
              }}>Manuel Rikob</span>
              <span style={{
                width: '0.3rem',
                height: '0.3rem',
                borderRadius: '50%',
                background: 'white',
              }}></span>
              <span style={{
                color: '#AAB1BA',
                fontSize: '1.25rem',
                fontWeight: 600,
              }}>CEO of Intel</span>
            </div>
            <div style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 400,
              textAlign: 'center',
              lineHeight: '3rem',
            }}>
              “Working with Master in me has been an incredibly
              painless and enjoyable
              experience.”
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
                borderRadius: '50%',
                background: 'white',
                cursor: 'pointer',
              }}>
                <img src={HOMEPAGE_ASSETS.ARROW_LEFT_LINE_ICON} alt='arrow left line icon' />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
                borderRadius: '50%',
                background: '#0064FF',
                cursor: 'pointer',
              }}>
                <img src={HOMEPAGE_ASSETS.ARROW_RIGHT_LINE_ICON} alt='arrow right line icon' />
              </div>
            </div>
          </div>
          <img src={HOMEPAGE_ASSETS.CLIENT_PHOTO_ONE} alt='client photo one' style={{
            width: '100%',
            objectFit: 'cover',
            flex: 1,
          }} />
        </div>
      </section>

      <div style={{ background: 'white' }}>
        <section style={{
          padding: '5.5rem 2rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          maxWidth: '81.5rem',
        }}>
          <h1 style={{
            color: '#1A1A1A',
            fontSize: '3.1875rem',
            fontWeight: 600,
          }}>Frequently asked Questions</h1>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            width: '100%',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: '100%',
            }}>
              <div style={{
                border: '1px solid #EBEEF2',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                cursor: 'pointer',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                }}>
                  <div style={{
                    background: '#F4F6F9',
                    borderRadius: '50%',
                    minWidth: '3.5rem',
                    minHeight: '3.5rem',
                    color: '#2C3A4B',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>01</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}>
                    <p style={{
                      color: '#1A1A1A',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem',
                      margin: 0,
                    }}>
                      How do I create an account on the job board?
                    </p>
                  </div>
                </div>
                <img src={HOMEPAGE_ASSETS.FAQ_OPEN_QUESTION_ICON} alt='faq open question icon' />
              </div>

              <div style={{
                border: '1px solid #EBEEF2',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                cursor: 'pointer',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                }}>
                  <div style={{
                    background: '#F4F6F9',
                    borderRadius: '50%',
                    minWidth: '3.5rem',
                    minHeight: '3.5rem',
                    color: '#2C3A4B',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>02</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}>
                    <p style={{
                      color: '#1A1A1A',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem',
                      margin: 0,
                    }}>
                      How do I apply for a job through the platform?
                    </p>
                  </div>
                </div>
                <img src={HOMEPAGE_ASSETS.FAQ_OPEN_QUESTION_ICON} alt='faq open question icon' />
              </div>

              <div style={{
                border: '1px solid #EBEEF2',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                cursor: 'pointer',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                }}>
                  <div style={{
                    background: '#F4F6F9',
                    borderRadius: '50%',
                    minWidth: '3.5rem',
                    minHeight: '3.5rem',
                    color: '#2C3A4B',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>03</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}>
                    <p style={{
                      color: '#1A1A1A',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem',
                      margin: 0,
                    }}>
                      How can I track the status of my job applications?
                    </p>
                  </div>
                </div>
                <img src={HOMEPAGE_ASSETS.FAQ_OPEN_QUESTION_ICON} alt='faq open question icon' />
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: '100%',
            }}>
              <div style={{
                border: '1px solid #8AB9FF',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                cursor: 'pointer',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                background: '#E6F0FF',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '10rem',
                    minWidth: '3.5rem',
                    minHeight: '3.5rem',
                    color: '#002B6B',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-start',
                  }}>04</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}>
                    <p style={{
                      color: '#1A1A1A',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem',
                      margin: 0,
                    }}>
                      How do I create an account on the job board?
                    </p>

                    <p style={{
                      color: '#414D60',
                      fontSize: '1rem',
                      fontWeight: 400,
                      lineHeight: '1.5rem',
                      margin: 0,
                    }}>
                      Use the search bar on the homepage to enter keywords related to your skills, job title, or preferred location. You can also use the advanced search filters to narrow down results by industry, job type (full-time, part-time, freelance), and experience level.
                    </p>
                  </div>
                </div>
                <img src={HOMEPAGE_ASSETS.FAQ_OPEN_QUESTION_ICON} alt='faq open question icon' />
              </div>

              <div style={{
                border: '1px solid #EBEEF2',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                cursor: 'pointer',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                }}>
                  <div style={{
                    background: '#F4F6F9',
                    borderRadius: '50%',
                    minWidth: '3.5rem',
                    minHeight: '3.5rem',
                    color: '#2C3A4B',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>05</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}>
                    <p style={{
                      color: '#1A1A1A',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem',
                      margin: 0,
                    }}>
                      Is there a cost to use the job board, and what features are free?
                    </p>
                  </div>
                </div>
                <img src={HOMEPAGE_ASSETS.FAQ_OPEN_QUESTION_ICON} alt='faq open question icon' />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div style={{
        position: 'relative',
      }}>
        <img src={HOMEPAGE_ASSETS.FOOTER_GRADIENT_BACKGROUND} alt='footer gradient background' style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: 1,
        }} />
        <section style={{
          padding: '0 2rem',
          margin: '0 auto',
          maxWidth: '81.5rem',
          zIndex: 2,
          position: 'relative',
        }}>
          <div style={{
            width: '100%',
            boxShadow: '0px 16px 40px 0px #0064FF14',
            borderRadius: '1.5rem',
            padding: '4rem 2rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              zIndex: 3,
              overflow: 'hidden',
              borderRadius: '1.5rem',
            }}>
              <img src={HOMEPAGE_ASSETS.JOIN_US_GRADIENT_BACKGROUND} alt='join us gradient background' style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }} />
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              zIndex: 4,
            }}>
              <p style={{
                maxWidth: '41.875rem',
                color: '#1A1A1A',
                textAlign: 'center',
                fontSize: '2.375rem',
                fontWeight: 600,
                margin: '0',
                lineHeight: '3rem',
              }}>Join ambitious professionals and unlock your dream career today</p>
              <p style={{
                maxWidth: '35rem',
                color: '#6D7580',
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: 400,
                margin: '0',
              }}>Unlock your true potential and discover a world of opportunities that align with your skills, interests, and aspirations</p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              zIndex: 4,
              width: '100%',
            }}>
              <COMMON_COMPONENTS.Auth.InputField
                name={'email'}
                placeholder={'Enter your email'}
                type={'email'}
                leftIcon={ICON_ASSETS.SMS_ICON}
                inputContainerStyle={{
                  width: '20rem',
                }}
              />
              <USER_COMPONENTS.Button text={'Join Us'} style={{
                alignSelf: 'stretch',
                padding: '0rem 2rem',
              }} />
            </div>
          </div>

          <footer style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '5rem 0',
            zIndex: 5,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <img src={COMMON_ASSETS.WIDE_LOGO} alt='logo icon' style={{ height: '3rem' }} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <img src={HOMEPAGE_ASSETS.INSTAGRAM_ICON} alt='instagram icon' />
                <img src={HOMEPAGE_ASSETS.TELEGRAM_ICON} alt='telegram icon' />
                <img src={HOMEPAGE_ASSETS.TIKTOK_ICON} alt='tiktok icon' />
                <img src={HOMEPAGE_ASSETS.YOUTUBE_ICON} alt='youtube icon' />
              </div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <span style={{
                fontSize: '1.1875rem',
                fontWeight: 600,
                color: '#1A1A1A',
              }}>Quick Links</span>
              <span style={{
                fontSize: '1rem',
                fontWeight: 400,
                color: '#414D60',
                cursor: 'pointer',
              }}>Home</span>
              <span style={{
                fontSize: '1rem',
                fontWeight: 400,
                color: '#414D60',
                cursor: 'pointer',
              }}>Jobs</span>
              <span style={{
                fontSize: '1rem',
                fontWeight: 400,
                color: '#414D60',
                cursor: 'pointer',
              }}>Employer</span>
              <span style={{
                fontSize: '1rem',
                fontWeight: 400,
                color: '#414D60',
                cursor: 'pointer',
              }}>Careers</span>
              <span style={{
                fontSize: '1rem',
                fontWeight: 400,
                color: '#414D60',
                cursor: 'pointer',
              }}>Contact Us</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <span style={{
                fontSize: '1.1875rem',
                fontWeight: 600,
                color: '#1A1A1A',
              }}>Others</span>
              <span style={{
                fontSize: '1rem',
                fontWeight: 400,
                color: '#414D60',
                cursor: 'pointer',
              }}>Terms and Conditions</span>
              <span style={{
                fontSize: '1rem',
                fontWeight: 400,
                color: '#414D60',
                cursor: 'pointer',
              }}>Privacy Policy</span>
            </div>
          </footer>

          <div style={{
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: 400,
            color: '#394452',
            paddingBottom: '2.25rem',
            zIndex: 6,
          }}>
            &copy; 2025 All rights reserved
          </div>
        </section>
      </div>

    </MainContainer>
  )
}

export default HomePage;