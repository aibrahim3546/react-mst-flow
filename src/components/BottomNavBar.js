// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'; 
import { FaHome, FaFilm } from 'react-icons/fa';

type Props = {
  children: React.Node,
  location: Object,
}

type ObservableState = {
  menu: Array<Object>,
}

const Container = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0;
  background-color: #000;
  width: 100%;
  box-shadow: 1px 1px 5px;
  max-width: 480px;
`;

const IconContainer = styled.div`
  text-align: center;
  color: ${props => props.primary ? '#fff' : '#999'};
  padding: 10px 0;
  font-size: ${props => props.primary ? '30px' : '25px'};;
  cursor: pointer;
  :active {
    /* color: #777; */
  }
`;

class BottomNavBar extends Component<Props> {
  observableState: ObservableState;

  componentDidMount() {}

  observableState = {
    menu: [
      {
        label: 'Home',
        icon: <FaHome />,
        path: '/',
      },
      {
        label: 'Movies',
        icon: <FaFilm style={{ fontWeight: 'bolder' }} />,
        path: '/movies'
      }
    ]
  }

  render() {
    const { menu } = this.observableState;
    const { location: { pathname } } = this.props;
    return (
      <Fragment>
        {this.props.children}
        <Container>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                {menu.map(each => (
                <td key ={each.path} style={{ width: '50%' }}>
                    <Link to={each.path}>
                      <IconContainer primary={pathname === each.path}>
                          {each.icon}
                      </IconContainer>
                    </Link>
                </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Container>
      </Fragment>
     
    );
  }
}

export default withRouter(BottomNavBar);