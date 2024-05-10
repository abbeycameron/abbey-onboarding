import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import styled from 'styled-components';

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem('user')
      props.setLoggedIn(false)
    } else {
      navigate('./login')
    }
  }

  const onRegisterClick = () => {
    navigate('./register')
  }

  return (
    <div className='bg-home'>
      
    <div className="mainContainer">
      <Nav style={{ position: 'absolute', top: 0, left: 3}}>
      <Logo>KFLA Parks</Logo>
    </Nav>
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div style={{ position: 'absolute', top: 0, right: 0}}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        <input
        type="button"
        onClick={onRegisterClick}
        value='Register'
        />
      </div>
    </div>
    </div>
  )
}

export default Home