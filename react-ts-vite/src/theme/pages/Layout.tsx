import { Suspense } from 'react';
import { CssBaseline, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { BreadCrumb, ConfirmDialog, SimpleCard } from '../../common/components';
import Wrapper from '../components/Wrapper';
import BasicMenu from '../components/BasicMenu';
import SideNavBar from '../components/SideNavBar';
import Footer from '../components/Footer';
import { useSelector } from '../../store';

function Layout() {
    const { mode } = useSelector((state) => state.themeSlice.theme);
    const theme = createTheme({
        palette: { mode, },
        typography: {
            button: {
                textTransform: 'none',
            },
        },
    });

    return (
        <Wrapper>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BasicMenu />
                <SideNavBar />
                <section id="layout__container">
                    <Suspense fallback={<Fallback />}>
                        {/* <SimpleCard title={''} subtitle={''} /> */}
                        <Outlet />
                    </Suspense>
                </section>
                <Footer />
            </ThemeProvider>
        </Wrapper>);
}

const Fallback = () => (
    <div className="w-full h-[80vh] grid place-content-center">
        <CircularProgress />
    </div>
);

export default Layout;