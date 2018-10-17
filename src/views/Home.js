import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { action, decorate, observable } from 'mobx';
import styled from 'styled-components';
import Slick from 'react-slick';

import PortraitPoster from '../components/PortraitPoster';

type Props = {
  rootStore: Object
};

type ObservableState = {
  isLoading: boolean
};

const Label = styled.div`
  color: #fff;
  font-size: 20px;
  padding-top: 10px;
  font-weight: 500;
  width: 75px;
  display: inline-block;
`;

const MoreCard = styled(PortraitPoster)`
  text-align: center;
  padding-top: 50%;
  font-weight: bold;
  background-color: #fff;
  color: #000;
`;

const BannerContainer = styled.div`
  transition: all 0.15s;
  position: relative;
  right: ${props => (props.isLoading ? '-100%' : '0')};
`;

const LandscapePoster = styled.div`
  width: 95%;
  height: ${window.screen.width / 1.8}px;
  max-height: 260px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.src});
  margin: 0 auto;
  border-radius: 1px;
  margin-top: 20px;
  margin-bottom: 15px;
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
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  border-width: 0.5px 0;
`;

class Home extends Component<Props> {
  observableState: ObservableState = {
    isLoading: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.observableState.isLoading = false;
    }, 10);
  }

  render() {
    const {
      rootStore: { movieStore }
    } = this.props;
    const { popularMovies, upcomingMovies } = movieStore;
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
      customPaging: () => <div style={{ border: '2px solid #888' }} />
    };

    const posterSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      arrows: false
    };

    const movies = [
      {
        label: 'Popular',
        movie: popularMovies
      },
      {
        label: 'Upcoming',
        movie: upcomingMovies
      }
    ];

    return (
      <div style={{ overflow: 'hidden', paddingBottom: 100 }}>
        <div style={{ padding: '10px 20px 0', width: '100%' }}>
          <Label>Home</Label>
        </div>

        <BannerContainer isLoading={isLoading}>
          <Slick {...bannerSettings}>
            {popularMovies.slice(0, 3).map(each => (
              <Link to={`/movie/${each.id}`} key={each.id}>
                <LandscapePoster src={each.landscapePoster} />
              </Link>
            ))}
          </Slick>
        </BannerContainer>

        <div
          style={{
            transition: 'all 0.15s',
            position: 'relative',
            left: isLoading ? '-100%' : 0
          }}
        >
          {movies.map(item => (
            <MoviesContainer key={item.label}>
              <div style={{ padding: '0 20px 10px' }}>
                <Label style={{ paddingBottom: 5, fontWeight: 'normal' }}>
                  {item.label}
                </Label>
                <div
                  style={{
                    paddingBottom: 5,
                    fontWeight: 'normal',
                    float: 'right',
                    paddingTop: 17,
                    fontSize: 12,
                    color: '#aaa'
                  }}
                >
                  <Link to={`/movies?list=${item.label.toLowerCase()}`}>
                    More &gt;
                  </Link>
                </div>
              </div>

              <Slick {...posterSettings}>
                {item.movie.slice(0, 7).map(each => (
                  <div key={each.id} style={{ padding: '0 25px' }}>
                    <Link to={`/movie/${each.id}`}>
                      <PortraitPoster
                        src={each.posterUrl}
                        maxWidth={160}
                        height={window.screen.width / 3}
                        width="90%"
                      />
                      <Title>{each.title}</Title>
                    </Link>
                  </div>
                ))}
                <div style={{ padding: '0 25px' }}>
                  <Link to={`/movies?list=${item.label.toLowerCase()}`}>
                    <MoreCard
                      maxWidth={160}
                      height={window.screen.width / 3}
                      width="90%"
                    >
                      More
                    </MoreCard>
                  </Link>
                </div>
              </Slick>
            </MoviesContainer>
          ))}
        </div>
      </div>
    );
  }
}

decorate(Home, {
  setName: action,
  observableState: observable
});

export default inject('rootStore')(observer(Home));
