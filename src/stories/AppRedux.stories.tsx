import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {action} from "@storybook/addon-actions";

import {Task} from "../Task";
import {AppRedux} from "../AppRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLISTS/AppRedux',
    component: AppRedux,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators:[ReduxStoreProviderDecorator],

} as ComponentMeta<typeof AppRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppRedux> = (args) => <AppRedux />;



export const AppReduxStory = Template.bind({});




