import {Link, matchPath, useLocation,} from "react-router-dom";
import {Tab, Tabs} from "@mui/material";

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}
export default function TabsNavigation(){

    const routeMatch = useRouteMatch(['/abuseReport', '/abuseList']);
    const currentTab = routeMatch?.pattern?.path;

    return (

        <div>
            {/*<NavLink to="/abuseList"> Abuse List</NavLink>
            <NavLink to="/abuseReport"> Abuse Report</NavLink>*/}
            <Tabs value={currentTab} centered >
                <Tab label="Abuse Report" value="/abuseReport" to="/abuseReport" component={Link} />
                <Tab label="Abuse List" value="/abuseList" to="/abuseList" component={Link} />
            </Tabs>
        </div>
    )
}