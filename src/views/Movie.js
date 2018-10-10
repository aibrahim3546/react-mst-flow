import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable, decorate, action } from 'mobx';
import styled from 'styled-components';

const PosterContainer = styled.div`
  float: right;
  width: 40%;
  margin: 25px 5%;
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
  box-shadow: 1px 1px 20px rgba(0,0,0,0.5);
  transition: All 0.25s;
   opacity: ${props => props.isWidth ? 1 : 0};
`;

const Container = styled.div`
  background: #f46b45;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #eea849, #f46b45);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #eea849, #f46b45); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  position: absolute;
  width: 100%;
`;

const TitleContainer = styled.div`
  color: #fff;
  padding: 30px 40px 0;
  font-size: 25px;
  font-weight: bold;
`;

const Button = styled.div`
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 10px 0;
  text-align: center;
  color: #fff;
  font-weight: bold;
  ${props => props.primary && `
    background-color: rgba(255,255,255,0.9);
    box-shadow: 1px 1px 20px rgba(0,0,0,0.5);
    color: #f46b45;
  `}

  :active {
    opacity: 0.15;
  }
`;

type Props = {
  rootStore: Object,
}

class Movie extends Component<Props> {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { rootStore } = this.props;

    rootStore.movieStore.fetchMovies(() => {
      this.observableState.isLoading = false;
      console.log('SUCESS');
    });
  }

  observableState = {
    isLoading: true,
    isTopRated: true,
    isWidth: true,
  }

  onChangeTab = () => {
    this.observableState.isWidth = false;
    this.observableState.isTopRated = !this.observableState.isTopRated;

    // setTimeout(() => {
    //   this.observableState.isTopRated = !this.observableState.isTopRated;
    // }, 250);
    setTimeout(() => {
      this.observableState.isWidth = true
    }, 300);
    // this.observableState.isTopRated = !this.observableState.isTopRated;
  }

  render() {
    const { movieStore } = this.props.rootStore;
    const { isLoading, isTopRated, isWidth } = this.observableState;
    return (
      <Container>
        <TitleContainer>
        {isTopRated ?
        'Top Rated Movies' :
        'Upcoming Movies'
        }
        </TitleContainer>


        <table style={{ width: '100%', padding: '20px 20px 0', opacity: isLoading ? 0 : 1, transition: 'All 1s'  }}>
          <tbody>
            <tr>
              <td style={{ padding: '5px 5%', width: '50%' }}>
                <Button onClick={this.onChangeTab} primary={isTopRated}>Top Rated</Button>
              </td>
              <td style={{ padding: '5px 5%', width: '50%' }}>
                <Button onClick={this.onChangeTab} primary={!isTopRated}>Coming Soon</Button>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ padding: isLoading ? '100% 20px' : '10px 20px 20px', opacity: isLoading ? 0 : 1, transition: 'All 1s' }}>
        {!isLoading && isTopRated &&
          movieStore.topRatedMovies.map(each => (
            <PosterContainer
              key={each.id}
              src={each.posterUrl}
              isWidth={isWidth}
            />
          ))}
          {!isLoading && !isTopRated &&
          movieStore.upcomingMovies.map(each => (
            <PosterContainer
              key={each.id}
              src={each.posterUrl}
              isWidth={isWidth}
            />
          ))}
        </div>
      </Container>
    );
  }
}

decorate(Movie, {
  observableState: observable,
  fetchData: action,
  onChangeTab: action,
})

export default inject('rootStore')(observer(Movie));