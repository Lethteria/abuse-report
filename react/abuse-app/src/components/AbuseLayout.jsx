import {Outlet} from "react-router-dom";
import PageWrap from "./PageWrap/PageWrap.jsx";
import TabsNavigation from "./TabsNavigation/TabsNavigation.jsx";

export default function AbuseLayout(){
    return (
        <PageWrap>
            <TabsNavigation />
            <Outlet />
        </PageWrap>
    )
}