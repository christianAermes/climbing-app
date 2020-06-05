import React, {Component} from 'react'
import DatePicker from "react-datepicker"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import "react-datepicker/dist/react-datepicker.css";

class Ascent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showGrades:      false,
            climbtype:       this.props.climbtype,
            placeholder:     this.props.climbtype===1? "Boulder" : this.props.climbtype===0? "Route" : "",
            gradeText:       this.props.ascent.grade === null? "Grade" : this.props.ascent.grade,
            startDate:       this.props.ascent.startDate,
            selectedGradeId: this.props.ascent.grade,
            top:             this.props.ascent.top,
            flash:           this.props.ascent.flash,
            name:            this.props.ascent.name,
            crag:            this.props.ascent.crag,
            id:              this.props.ascent.id
            
        }
        this.handleDropDownClick = this.handleDropDownClick.bind(this)
        this.handleGradeSelect   = this.handleGradeSelect.bind(this)
        this.handleMethodSelect  = this.handleMethodSelect.bind(this)
        this.handleDateSelect    = this.handleDateSelect.bind(this)
        this.handleNameChange    = this.handleNameChange.bind(this)
        this.handleCragChange    = this.handleCragChange.bind(this)
        this.removeSelf          = this.removeSelf.bind(this)
    }
    removeSelf() {
        console.log("Id of removed ascent: ", this.props.ascent.id)
        this.props.handleRemoveAscent(this.state.id)
    }
    handleDropDownClick() {
        console.log(this.state.name)
        this.setState(state => ({showGrades: !state.showGrades}))
    }
    handleGradeSelect(e) {
        let grade_id = e.target.value
        let grade_name = e.target.name
        this.setState(state => ({
            selectedGradeId: parseInt(grade_id), 
            gradeText: grade_name, 
            showGrades: false,
        }))
        let ascent = {
            date: this.state.startDate,
            grade: parseInt(grade_id),
            top: this.state.top,
            flash: this.state.flash,
            name: this.state.name,
            crag: this.state.crag,
            id: this.props.ascent.id
        }
        this.props.handleAscentChange(ascent)
    }
    handleMethodSelect(e) {
        let flash = e.target.value==="1"
        let top = e.target.value==="0"
        this.setState(state => ({
            flash: flash, 
            top: top,
        }))
        let ascent = {
            date: this.state.startDate,
            grade: this.state.selectedGradeId,
            top: top,
            flash: flash,
            name: this.state.name,
            crag: this.state.crag,
            id: this.props.ascent.id
        }
        this.props.handleAscentChange(ascent)
    }
    handleDateSelect(date) {
        this.setState(state => ({
            startDate: date,
        }))
        let ascent = {
            date: date,
            grade: this.state.selectedGradeId,
            top: this.state.top,
            flash: this.state.flash,
            name: this.state.name,
            crag: this.state.crag,
            id: this.props.ascent.id
        }
        this.props.handleAscentChange(ascent)
    }
    handleCragChange(e) {
        let crag = e.target.value
        this.setState(state => ({
            crag: crag
        }))
        let ascent = {
            date: this.state.startDate,
            grade: this.state.selectedGradeId,
            top: this.state.top,
            flash: this.state.flash,
            name: this.state.name,
            crag: crag,
            id: this.props.ascent.id
        }
        this.props.handleAscentChange(ascent)
    }
    handleNameChange(e) {
        let name = e.target.value
        this.setState(state => ({
            name: name
        }))
        let ascent = {
            date: this.state.startDate,
            grade: this.state.selectedGradeId,
            top: this.state.top,
            flash: this.state.flash,
            name: name,
            crag: this.state.crag,
            id: this.props.ascent.id
        }
        this.props.handleAscentChange(ascent)
    }
    
    render() {
        let grades = this.props.grades.map(el => (<div className="dropdown-grade-item" key={el.id}>
                                                    <label>{el.grade}</label>
                                                    <input type="radio" value={el.id} name={el.grade} checked={this.state.selectedGradeId === el.id} onChange={this.handleGradeSelect}/>
                                                 </div>))
        let dropdown = this.state.showGrades? <div className="dropdown-grades">{grades}</div> : <div></div>
        // console.log(this.state.name)
        return (
            <div className="ascent-container">
                <div className="testdiv"><input type="text" placeholder={this.state.placeholder} className="test-input" onChange={this.handleNameChange}/></div>
                <div className="testdiv"><input type="text" placeholder="Crag" className="test-input" onChange={this.handleCragChange}/></div>
                <div className="testdiv grade-dropdown" >
                    <button className="dropBtn" onClick={this.handleDropDownClick}>
                        <span className="test-input">{this.state.gradeText}</span><FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                    </button>
                    {dropdown}
                </div>

                <div className="testdiv"><DatePicker dateFormat="dd.MM.yyyy" onChange={this.handleDateSelect} selected={this.state.startDate} className="outdoor-datepicker"></DatePicker></div>
                <div className="testdiv method-select">
                    <label  className="test-input">Flash</label>
                    <input type="radio" value={1} checked={this.state.flash} onChange={this.handleMethodSelect}></input>
                    
                </div>
                <div className="testdiv method-select">
                    <label  className="test-input">Top</label>
                    <input type="radio" value={0} checked={this.state.top} onChange={this.handleMethodSelect}></input>
                </div>
                <button className="close-btn btn-center" onClick={this.removeSelf}></button>
                
            </div>
        )
    }
}

export default Ascent