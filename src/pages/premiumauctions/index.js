import React from 'react';

import FirstApps from "../../components/firstapp";
import qs from 'qs';

const FApage = (props) => {
    return <FirstApps {...props} />;
};

FApage.getInitialProps = async (ctx) => {
    const paths = ctx.asPath.split('/');

    return qs.parse(paths[1].replace('auctions?', ''));
};

export default FApage;
