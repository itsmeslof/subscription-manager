import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import BaseLayout from './Layouts/BaseLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Subscription Manager';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        let page = await pages[`./Pages/${name}.jsx`]();
        page.default.layout ??= ((page) => <BaseLayout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#14B8A6',
    },
});
