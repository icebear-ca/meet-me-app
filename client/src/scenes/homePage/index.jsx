/* eslint-disable no-unused-vars */
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import FriendListWidget from "scenes/widgets/FriendsListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(mind-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
                >
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                        <UserWidget userId={_id} picturePath={picturePath} />
                    </Box>
                    {isNonMobileScreens && (
                    <Box
                        flexBasis={isNonMobileScreens ? "42%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}
                        >
                            <Box m="2rem 0" />
                            <FriendListWidget userId={_id} />
                        </Box>
                    )}
                </Box>
        </Box>
    );
};

export default HomePage;