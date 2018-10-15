import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { action, decorate, observable } from 'mobx';
import styled from 'styled-components';
import Slick from 'react-slick';

type Props = {
  rootStore: Object,
}

type ObservableState = {
  isLoading: boolean,
}

const Label = styled.div`
  color: #fff;
  font-size: 20px;
  padding-top: 10px;
  font-weight: 500;
  width: 75px;
  display: inline-block;
`;

const BannerContainer = styled.div`
  /* & > .slick-dots .slick-thumb .slick-active li {
    border-color: #fff !important;
  } */
  /* height: ${window.screen.width / 1.5}px; */
`;

const LandscapePoster = styled.div`
  width: 95%;
  height: ${window.screen.width / 1.8}px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.src});
  margin: 0 auto;
  border-radius: 1px;
  box-shadow: 0px 0px 10px rgba(255,255,255,0.25);
  margin-top: 20px;
  margin-bottom: 15px;
`;

const PortraitPoster = styled.div`
  width: 90%;
  height: ${window.screen.width / 2.5}px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.src});
  margin: 0 auto;
  border-radius: 1px;
  box-shadow: 1px 0px 10px rgba(255,255,255,0.25);
`;

const Title = styled.div`
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap; 
  overflow: hidden;
  padding: 5px 12.5px;
  font-size: 15px;
`;

const MoviesContainer = styled.div`
  margin-top: 30px;
  border-width: 1px 0;
  padding-bottom: 10px;
  box-shadow: 1px 0px 10px rgba(255,255,255,0.25);
`;

class Home extends Component<Props> {
  observableState: ObservableState;

  componentDidMount() {
    setTimeout(() => {
      this.observableState.isLoading = false;
    }, 10)
  }

  observableState = {
    isLoading: true,
  }

  render() {
    const { rootStore: { movieStore } } = this.props;
    const { topRatedMovies, upcomingMovies } = movieStore;
    const { isLoading } = this.observableState;

    const bannerSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '15px',
      centerMode: true,
      autoplay: true,
      arrows: false,
      // adaptiveHeight: true,
      customPaging: () => (
        <div style={{ border: '2px solid #888' }} />
      )
    };

    const posterSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
      arrows: false,
      // centerPadding: '15px',
      // centerMode: true,
      // adaptiveHeight: true,
    };

    const movies = [
      {
        label: 'Top Rated',
        movie: topRatedMovies,
      },
      {
        label: 'Upcoming',
        movie: upcomingMovies,
      }
    ];

    return (
      <div style={{ overflow: 'hidden', paddingBottom:  100 }}>
        <div style={{ padding: '10px 20px 0', width: '100%' }}>
          <Label>
            Home
          </Label>
        </div>

        <BannerContainer style={{ transition: 'all 0.15s', position: 'relative', right: isLoading ? '-100%' : 0  }}>
          <Slick {...bannerSettings}>
          {topRatedMovies.slice(0,3).map(each => (
            <div key={each.id} style={{ padding: '0px' }}>
              <LandscapePoster src={each.landscapePoster} />
            </div>
          ))}
          </Slick>
        </BannerContainer>
        
          
        <div style={{ transition: 'all 0.15s', position: 'relative', left: isLoading ? '-100%' : 0  }}>
        {movies.map(item => (
          <MoviesContainer key={item.label}>
            <div style={{ padding: '0 20px 10px' }}>
              <Label style={{ width: '140px', paddingBottom: 5, fontWeight: 'normal' }}>
                {item.label}
              </Label>
            </div>
 
            <BannerContainer>
              <Slick {...posterSettings}>
              {item.movie.slice(0,6).map(each => (
                <div key={each.id} style={{ padding: '0 25px' }}>
                  <Link to={`/movie/${each.id}`}>
                    <PortraitPoster src={each.posterUrl} />
                    <Title>{each.title}</Title>
                  </Link>
                </div>
              ))}
                <div style={{ padding: '0 25px' }}>
                  <Link to={'/movies'}>
                    <PortraitPoster style={{ textAlign: 'center', paddingTop: '50%', fontWeight: 'bold', backgroundColor: '#fff', color: '#000' }}>
                      More
                    </PortraitPoster>
                  </Link>
                </div>
              </Slick>
            </BannerContainer>
          </MoviesContainer>
        ))}
        </div>
      </div>
    );
  }
}

decorate(Home, {
  setName: action,
  observableState: observable,
})

export default inject('rootStore')(observer(Home));