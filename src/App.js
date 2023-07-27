import React, {useState} from 'react';

import {Ed25519Provider} from 'key-did-provider-ed25519'
import KeyResolver from 'key-did-resolver'
import {DID} from 'dids'

import seedrandom from 'seedrandom'

const App = () => {
    const [randomDid, setRandomDid] = useState('')
    const [staticDid, setStaticDid] = useState('')

    const createRandomDID = async () => {
        const seed = new Uint8Array(32)
        crypto.getRandomValues(seed)
        const randomDid = new DID({
            provider: new Ed25519Provider(seed),
            resolver: KeyResolver.getResolver()
        })
        await randomDid.authenticate()

        setRandomDid(randomDid.id)
    };

    const createStaticDID = async () => {
        const uniqueKey = '0x7a8b9cde'
        const rng = seedrandom(uniqueKey)
        const seed = new Uint8Array(32)
        for (let i = 0; i < 32; i += 1) {
            seed[i] = Math.floor(rng() * 256)
        }
        const staticDid = new DID({
            provider: new Ed25519Provider(seed),
            resolver: KeyResolver.getResolver()
        })
        await staticDid.authenticate()

        setStaticDid(staticDid.id)
    };

    return (
        <div>
            <h1>Create DID</h1>
            <button onClick={createRandomDID}>Random DID</button>
            <p>DID: {randomDid}</p>
            <br/>
            <button onClick={createStaticDID}>Static DID</button>
            <p>DID: {staticDid}</p>
        </div>
    );
};

export default App;
