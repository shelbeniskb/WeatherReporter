import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getCityThenWeather } from './ActionCreators';
import './style.scss';

@connect(state => ({ report: state.report }), { getCityThenWeather })
class WeatherReport extends Component {

  static propTypes = {
    report: PropTypes.object,
    getCityThenWeather: PropTypes.func,
  };

  static defaultProps = {
    getCityThenWeather: () => null,
  };

  componentDidMount() {
    this.props.getCityThenWeather();
  }

  renderWeatherReportHeader() {
    const { report: { city, weather } } = this.props;
    return (
      <div className="report-header clearfix">
        <div className="header-main">
          <div className="city">{city}</div>
          {weather.wendu &&
            (<div className="wendu">{weather.wendu}<sup>℃</sup></div>)
          }
        </div>
        {weather.ganmao &&
          (<div className="header-ganmao">{weather.ganmao}</div>)
        }
      </div>
    );
  }

  renderWeatherReportBody() {
    const { report: { weather } } = this.props;
    return (
      <div className="report-body clearfix">
      { weather.forecast &&
        weather.forecast.map((one, i) => {
          const { type, date, fengxiang, high, low } = one;
          const wendu = low.split(' ')[1] + '~' + high.split(' ')[1];
          return (
            <div className={`forecast forecast-${i}`} key={`forecast-${i}`}>
              <div className="date">{date}</div>
              <div className="wendu">{wendu}</div>
              <div className="type">{type}</div>
              <div className="fengxiang">{fengxiang}</div>
            </div>
          );
        })
      }
      </div>
    );
  }

  render() {
    console.log(this.props.report);
    return (
      <div className="report-container">
        {this.renderWeatherReportHeader()}
        {this.renderWeatherReportBody()}
      </div>
    );
  }
}

export default WeatherReport;
