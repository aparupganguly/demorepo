import "../flow/config";
import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/cli";
import Head from "next/head";
import ReactDom from 'react-dom';

import { config } from "@onflow/fcl";

config({
    "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn" // Mainnet: "https://fcl-discovery.onflow.org/authn"
})
// 'use client';


export default function Cluster() {
    const [user, setUser] = useState({ loggedIn: null });
    useEffect(() => fcl.currentUser.subsribe(setUser), []);
    const AuthedState = () => {
        return (
            <div>
                <div> Address: {user?.addr ?? "No Address"}</div>
                <button onClick={fcl.unauthenticate}>Log Out </button>
            </div>
        );
    };

    const UnauthenticatedState = () => {
        return (
            <div>
                <button onClick={fcl.logIn}> Log In </button>
                <button onClick={fcl.signUp}> Sign Up </button>
            </div>
        );
    };
    return (
        <div>
            <Head>
                <title>FCL Quickstart with NextJS</title>
                <meta name='description' content='Web3 App on Flow' />
                <link rel='icon' href='/favicon.png' />
            </Head>
            <h1>Flow Login</h1>
            {user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
            <main>Hello World</main>
        </div>
    );
}
