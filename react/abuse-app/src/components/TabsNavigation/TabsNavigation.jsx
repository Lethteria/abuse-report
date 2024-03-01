import {Link, matchPath, useLocation,} from "react-router-dom";
import {Tab, Tabs} from "@mui/material";
import styles from "./TabsNavigation.module.scss"

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

        <div className={styles.wrap}>
            <Tabs value={currentTab} centered >
                <Tab label="Abuse Report" value="/abuseReport" to="/abuseReport" component={Link} />
                <Tab label="Abuse List" value="/abuseList" to="/abuseList" component={Link} />
            </Tabs>
        </div>
    )
}