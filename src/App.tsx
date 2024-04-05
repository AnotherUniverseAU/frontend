import MainRouter from './mainRouter.tsx';
import { GlobalStyle } from 'src/styles/globalStyle.ts';
// import ReactGA from "react-ga4";
import TagManager from 'react-gtm-module';
import { Helmet } from 'react-helmet-async';

export const App = () => {
    //   if (initialized) {
    //     ReactGA.set({ page: location.pathname });
    //     ReactGA.send("pageview");
    //   }
    // }, [initialized, location]);
    return (
        <>
            <Helmet>
                <title>AU</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
                ></meta>
            </Helmet>
            <GlobalStyle />
            <MainRouter />
        </>
    );
};
