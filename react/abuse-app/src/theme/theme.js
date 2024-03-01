import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            h1, h2, h3, h4, h5, p {
                margin: 0;
            }
            ul {
                margin: 0;
                padding: 0;
            }
            ul li {
                list-style: none;
            } 
            `,
        },
        MuiPagination: {
            styleOverrides: {
                ul: {
                    justifyContent: "center",
                },
            },
        },
    },
});