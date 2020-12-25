import React from 'react';
import moment from 'moment';
export default function Home(){
    return (<div><h4>Welcome to Personal Trainer App!</h4>
    <p>{moment().format('lll')}</p></div>);
}