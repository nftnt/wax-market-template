import React from 'react';

import qs from 'qs';
import Home from "../components/home";

const HomePage = (props) => {
    return <Home {...props} />;
};


HomePage.getInitialProps = async (ctx) => {
    const paths = ctx.asPath.split('/');

    return qs.parse(paths[1].replace('?', ''));
};

export default HomePage;
