import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const currentStatus = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class CowinDashboard extends Component {
  state = {
    dayData: [],
    ageData: [],
    genderData: [],
    apiStatus: currentStatus.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: currentStatus.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formatData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      this.setState({
        dayData: formatData.last7DaysVaccination,
        ageData: formatData.vaccinationByAge,
        genderData: formatData.vaccinationByGender,
        apiStatus: currentStatus.success,
      })
    } else {
      this.setState({apiStatus: currentStatus.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCharts = () => {
    const {dayData, ageData, genderData} = this.state
    return (
      <>
        <VaccinationCoverage dayData={dayData} />
        <VaccinationByGender genderData={genderData} />
        <VaccinationByAge ageData={ageData} />
      </>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderRoutes = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case currentStatus.inProgress:
        return this.renderLoading()
      case currentStatus.success:
        return this.renderCharts()
      case currentStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-cont">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <div className="charts-const">
          <h1>CoWIN Vaccination In India</h1>
          {this.renderRoutes()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
