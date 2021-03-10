import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import store from 'store';

export default function LoginPage(props) {
    store.remove('user');
    return <Redirect to="/login" />;
};
