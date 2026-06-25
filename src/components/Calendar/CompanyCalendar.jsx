import React from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css";
import PageLoader from "../../components/Common/PageLoader";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = {"en-US": enUS};

const localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales});

function CompanyCalendar({events}){
    return(
        <div style = {{height: "600px", background: "white", padding: "15px", borderRadius: "10px"}}>
            <Calendar localizer = {localizer} events = {events} startAccessor = "start" endAccessor = "end" style = {{height: 500}}/>
        </div>
        );
    }
    
    export default CompanyCalendar;