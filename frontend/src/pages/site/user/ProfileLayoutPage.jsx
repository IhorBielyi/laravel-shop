import React, {useState} from "react";

import {Box, Card, CardContent, Divider, Stack, Tab, Tabs, Typography} from "@mui/material";

import Header from "../../../components/site/layout/Header.jsx";
import ProfileInfoPage from "./ProfileInfoPage.jsx";
import ProfileSecurityPage from "./ProfileSecurityPage.jsx";
import ProfileOrdersPage from "./ProfileOrdersPage.jsx";

export default function ProfileLayoutPage() {
    const [tab, setTab] = useState("info");

    return (

        <>

            <Header/>

            <Box sx={{width: "100%", px: {xs: 2, md: 3}, py: 3}}>
                <Stack spacing={2} sx={{maxWidth: 900, mx: "auto"}}>
                    <Typography variant="h5" fontWeight={900}>
                        Особистий кабінет
                    </Typography>

                    <Card variant="outlined">
                        <CardContent>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                textColor="primary"
                                indicatorColor="primary"
                            >
                                <Tab value="info" label="Особиста інформація"/>
                                <Tab value="orders" label="Замовлення"/>
                                <Tab value="security" label="Безпека"/>
                            </Tabs>

                            <Divider sx={{my: 2}}/>

                            {tab === "info" && <ProfileInfoPage/>}
                            {tab === "orders" && <ProfileOrdersPage/>}
                            {tab === "security" && <ProfileSecurityPage/>}
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </>
    );
}