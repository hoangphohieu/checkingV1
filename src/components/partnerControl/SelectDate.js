import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
              selectedDays: [],
        };
    }

    handleDayClick(day, { selected }) {

        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        // console.log(selectedDays);

        this.setState({ selectedDays });
    }

    componentDidUpdate = () => {
        let listDay = this.props.partnerAndDay.filter(param => { return param[0] !== "id" }).map(param => {return (new Date((param[1] - 25569) * 24 * 60 * 60 * 1000))} );
        // console.log(listDay);
        if(this.state.selectedDays.length===0 && listDay.length!==0){
            // console.log(listDay);
            this.setState({selectedDays:[...listDay]})
            
        }
        
         
    }
    render() {
        let partnerAndDay = this.props.partnerAndDay;
        // let listDay = partnerAndDay.filter(param => { return param[0] !== "id" }).map(param => param[1]);
        // console.log(this.state.selectedDays);

        return (
            <div>
                <p>
                    {partnerAndDay.filter(param => { return param[0] === "id" }).map(param => param[1])}
                </p>
                <DayPicker
                    selectedDays={this.state.selectedDays}
                    onDayClick={this.handleDayClick}
                />
            </div>
        );
    }
}