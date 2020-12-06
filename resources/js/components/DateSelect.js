import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

import moment from 'moment'

const DateSelect = (props) => {

  let formations = props.formations

  useEffect(() => {
    console.log('use effect')
    document.querySelectorAll('.react-calendar__tile abbr').forEach(ele => {
      ele.style.border = ''
      ele.classList.remove('selected')
    })

    // color only selected
    props.currentFormation.map(cf => cf.id)
      .forEach(cf => document.querySelectorAll(`.formation_${cf}`).forEach(ele => ele.classList.add('selected')))

    formations.forEach(f => {
      document.querySelectorAll(`.formation_${f.id}`).forEach(ele => {
        console.log('Adding border to formation date')
        let abbr = ele.querySelector('abbr')
        abbr.style.border = `2px solid ${f.niveau.color}`
        if (ele.classList.contains('selected')) {
          abbr.style.backgroundColor = f.niveau.color
        } else {
          abbr.style.backgroundColor = 'transparent'
        }
      })
    })

    return function cleanup() {
      console.log('Cleanup')
      formations.map(df => df.id)
        .forEach(id => document.querySelectorAll(`.formation_${id}`).forEach(ele => {
          let abbr = ele.querySelector('abbr')
          abbr.style.border = `none`
          ele.classList.remove('selected')
        }))
    }
  }, [props.currentFormation, props.activeDate, formations])


  const onDaySelect = (value, event) => {
    console.log('Day select')
    formations.forEach(df => {
      let daysUntilStart = moment(df.date_debut).diff(
        moment(new Date()),
        'days'
      )
      if ((daysUntilStart + 1) <= 2)
        return
      if (df.places < 1)
        return
      if (event.target.parentElement.classList.contains(`formation_${df.id}`)) {

        let copy = props.currentFormation
        let findIndex = copy.findIndex(e => e.id === df.id)
        if (findIndex !== -1) {
          copy.splice(findIndex, 1)
        } else {
          copy.push(df)
        }
        props.setCurrentFormation([...copy])
      }
    })
  }
  const tileClassName = ({ date, view }) => {
    console.log('tileClassName')
    let className = ''
    formations.forEach(d => {
      let daysUntilStart = moment(d.date_debut).diff(
        moment(new Date()),
        'days'
      )
      const dates = d.dates_formation.map(dt => new Date(dt).toDateString())
      console.log(dates, date.toDateString())
      if (view === 'month' && dates.includes(date.toDateString())) {
        className += `active_date_${d.niveau.name} formation_${d.id}`
        // css fix for single months
        if (date.getDate() < 10) {
          className += ' pad-fix';
        }
        if ((daysUntilStart + 1) <= 2) {
          className += ' disabled'
        }
        if (d.places < 1) {
          className += ' disabled'
        }
      }
    })
    return className
  }

  return (
    <div className="DateSelect">
      {props.isLoading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
      <Calendar
        className="mt-4 ml-sm-4 ml-md-4 ml-lg-4 mb-4"
        tileClassName={tileClassName}
        onActiveStartDateChange={(e) => {
          props.setActiveDate(e.activeStartDate)
        }}
        showNeighboringMonth={false}
        onClickDay={onDaySelect}
        minDetail='month'
        activeStartDate={props.activeDate} />
    </div>
  )
}

export default DateSelect
