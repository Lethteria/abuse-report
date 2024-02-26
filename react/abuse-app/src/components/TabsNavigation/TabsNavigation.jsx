import {NavLink} from "react-router-dom";

export default function TabsNavigation(){
    return (
        <div>
            <NavLink to="/abuseList"> Abuse List</NavLink>
            <NavLink to="/abuseReport"> Abuse Report</NavLink>
        </div>
    )
}