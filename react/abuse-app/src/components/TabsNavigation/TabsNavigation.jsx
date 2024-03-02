import {useRouteMatch} from "../../hooks/useRouteMatch.js";
import {Link} from "react-router-dom";

import {Tab, Tabs} from "@mui/material";

import styles from "./TabsNavigation.module.scss"

function TabsNavigation(){

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

export default TabsNavigation;