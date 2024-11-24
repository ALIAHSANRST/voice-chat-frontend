'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, menuClasses, MenuItem, Sidebar, sidebarClasses } from "react-pro-sidebar";
import {
  Dashboard,
  PeopleRounded,
  Menu as MenuIcon,
  Logout,
  QuestionAnswer,
  NewspaperRounded,
  Email,
  AssignmentRounded,
  PlaylistAddCheck,
  ListAlt,
} from '@mui/icons-material';

import './layout.css'
import CustomAlertDialogue from '@/src/components/CustomAlertDialogue'

const SidebarHead = () => {
  const titleStyles = {
    textAlign: 'center',
    margin: 0,
    fontSize: '2rem',
  };

  const userStyles = {
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: 0,
    fontSize: '1.15rem',
    letterSpacing: 1.5,
  };

  return (
    <div style={{ padding: '2.75rem', backgroundColor: '#273142' }}>
      <p style={titleStyles}>Globalie</p>
      <p style={userStyles}>Admin Panel</p>
    </div>
  );
};

const SideBarSeparator = ({ title }) => {
  return (
    <p
      style={{
        margin: 0,
        padding: '0.25rem 1.25rem',
        textTransform: 'uppercase',
        fontSize: '0.8rem',
        letterSpacing: 2.5,
        background: '#4d4d4d',
        color: '#cfcfcf',
        lineHeight: '1.25rem',
      }}>
      {title}
    </p>
  );
};

const CustomMenuItem = ({ path, title, icon }) => {
  const pathname = usePathname();
  let isActive = pathname.toLowerCase().trim() === path.toLowerCase();

  return (
    <MenuItem
      id={isActive ? '' : 'rps-menu-item'}
      active={isActive}
      component={<Link href={path} />}
      icon={icon}>
      {title}
    </MenuItem>
  );
};

const GetTitleInfo = () => {
  const pathToTitle = {
    '/admin/exam-results': 'Exam Results',
    '/admin/exam-script': 'Exam Script',
    '/admin/send-email': 'Send Email',
    '/admin': 'Dashboard',
  }

  const pathname = usePathname();
  const title = pathToTitle[pathname];
  const path = Object.keys(pathToTitle).find(path => pathname.includes(path));

  return { path, title };
}

const AdminLayout = ({ children }) => {
  const SideBarRootStyles = {
    ['.' + sidebarClasses.container]: {
      backgroundColor: '#1f1f1f',
      color: '#fff',
      height: '100%',
    },
  };

  const MenuRootStyles = {
    ['.' + menuClasses.active]: {
      'backgroundColor': '#363636',
      'color': '#fff',
      '&:hover': { backgroundColor: '#363636' },
    },
    ['.' + menuClasses.button]: {
      height: 42,
    },
    ['.' + menuClasses.icon + ' *']: {
      height: 20,
    },
  };

  const router = useRouter();

  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [showClearDialogue, setShowClearDialogue] = useState(false);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (sidebarToggled) {
        if (!document.getElementById('menu-toggle-button').contains(e.target)) {
          setSidebarToggled(false);
        }
      }
    });

    return () => {
      document.removeEventListener('click', () => { });
    }
  }, [sidebarToggled]);

  return (
    <div id='admin-body' className='row m-0' style={{ minHeight: '100vh', display: 'flex' }}>
      <div className='col-auto m-0 p-0'>
        <Sidebar rootStyles={SideBarRootStyles} breakPoint='md' toggled={sidebarToggled}>
          <SidebarHead />
          <Menu rootStyles={MenuRootStyles}>
            <CustomMenuItem title='Dashboard' path={'/admin'} icon={<Dashboard />} />
            <SideBarSeparator title='Management' />
            <CustomMenuItem title='Exam Results' path={'/admin/exam-results'} icon={<AssignmentRounded />} />
            <CustomMenuItem title='Exam Script' path={'/admin/exam-script'} icon={<ListAlt />} />
            <SideBarSeparator title='Utilities' />
            <CustomMenuItem title='Send Email' path={'/admin/send-email'} icon={<Email />} />
          </Menu>
        </Sidebar>
      </div>
      <div className='col m-0 p-0 pb-5' style={{ maxWidth: '100%', width: '12.5rem' }}>
        <div style={{ display: 'flex', backgroundColor: '#fff', padding: '0.5rem 1rem', }}>
          <button id='menu-toggle-button' onClick={() => setSidebarToggled(!sidebarToggled)}>
            <MenuIcon />
          </button>
          <p onClick={() => GetTitleInfo().path} style={{
            margin: 0,
            // textTransform: 'uppercase',
            display: 'inline-block',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>{GetTitleInfo().title}</p>
          <button style={{ marginLeft: 'auto' }} id='logout-button' onClick={() => setShowClearDialogue(true)}>
            <Logout />
          </button>
        </div>
        {
          showClearDialogue
            ? <CustomAlertDialogue
              title='Warning'
              positiveMessage='Yes'
              negativeMessage='No'
              positiveCallback={() => {
                router.push('/logout');
                setShowClearDialogue(false);
              }}
              negativeCallback={() => setShowClearDialogue(false)}
              show={showClearDialogue}
              handleClose={() => setShowClearDialogue(false)}>
              <p>Are you sure you want to logout?</p>
            </CustomAlertDialogue>
            : null
        }
        {children}
      </div>
    </div>
  )
}

export default AdminLayout