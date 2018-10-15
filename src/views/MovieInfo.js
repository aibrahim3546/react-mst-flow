import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { decorate, observable, action } from 'mobx';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import moment from 'moment';

type Props = {
  rootStore: Object,
  match: {
    params: {
      id: string,
    }
  }
}

type ObservableState = {
  isLoading: boolean,
}

const LandscapePoster = styled.div`
  width: 100%;
  height: ${window.screen.width / 1.8};
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: All 0.15s;
  opacity: ${props => props.isLoading ? 0 : 1};
  position: relative;
`;

const Poster = styled.div`
  height: ${window.screen.width / 2.5};
  width: 100%;
  background-image: url(${props => props.src});
  background-position:center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 1px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.25);
  max-height: 160px;
`;

const InfoContainer = styled.div`
  border-radius: 1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.25);
  padding: 10px 15px;
  background-color: #fff;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 13px;
  padding-bottom: 10px;
  color: #222;
`;

const ReleaseDate = styled.div`
  color: #333;
  font-size: 11px;
  padding-bottom: 10px;
`;

const Rating = styled.div`
  color: #FFD700;
  font-size: 12px;
  /* padding-bottom: 10px; */
  font-weight: 500;
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 17px;
  color: #888;
`;

const Plot = styled.div`
  color: #888;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  margin-top: 15px;
`;

class MovieInfo extends Component<Props> {
  observableState: ObservableState;
  componentDidMount() {
    this.fetchData();
  }

  observableState = {
    isLoading: true,
  }

  fetchData = () => {
    const { rootStore, match: { params } } = this.props;
    rootStore.movieStore.fetchMovie(
      {
        id: params.id,
      },
      () => {
        setTimeout(() => {
          this.observableState.isLoading = false;
        }, 50)  
      }
    )
  }

  render() {
    const { rootStore: { movieStore } } = this.props;
    const { movie } = movieStore;
    const { isLoading } = this.observableState;
    return (
      <div style={{ overflow: 'hidden' }}>
        <LandscapePoster src={movie.landscapePoster} isLoading={isLoading}/>
        <div style={{ padding: '10px 15px', marginTop: isLoading ? '100%' : -85, opacity: isLoading ? 0 : 1, position: 'relative', transition: 'All 0.15s' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '35%' }}>
                  <Poster src={movie.posterUrl}/>
                </td>
                <td>
                  <InfoContainer>
                    <Title>{movie.title}</Title>
                    <ReleaseDate>{moment(movie.releaseDate).format('DD MMM YYYY')}</ReleaseDate>
                    <Rating>{movie.rating}</Rating>
                  </InfoContainer>
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: 30, padding: '10px 15px', boxShadow: '1px 1px 10px rgba(0,0,0,0.1)', borderRadius: 1 }}>
            <Label>Overview</Label>
            <Plot>{movie.overview}</Plot>
          </div>

        </div>
      </div>
    );
  }
}

decorate(MovieInfo, {
  observableState: observable,
  fetchData: action,
})

export default withRouter(inject('rootStore')(observer(MovieInfo)));