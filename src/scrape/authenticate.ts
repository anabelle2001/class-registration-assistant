import {JSDOM} from "jsdom";
import * as https from 'https';

export type Credential = {
    'JSessionID': string //should be 32 hex chars.
    'SyncToken': string //should be a UUID, all lowercase
}

export type CredentialStore = {
    __key__: Credential
}

let makeAgent = (authHost: string) => new https.Agent({
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
    // 'Cookie': `JSESSIONID=${JSessionID}}`,
    'Connection': 'keep-alive',
    'Host': authURL,
    // 'Referer':
    //     `https://${authURL}/StudentRegistrationSsb/ssb/classSearch/classSearch`,

    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
    // 'X-Synchronizer-Token': SyncToken,
    'X-Requested-With': 'XMLHttpRequest',
    
})


/**
 * Returns authentication credentials to connect with an ellucian server, 
 * allowing for the user to perform more sensitive requests
 * 
 * This function memoizes the underlying function getNewAuthToken
 * 
 * @param {string} targetDomain The URL of the server to authenticate with. 
 *                              Defaults to cofc.
 * 
 * @returns {Credential}    An object containing a JSID and a Sync Token.
 * 
 */
export async function getAuthToken(
    targetDomain: string = "ssb.cofc.edu"
): Promise<Credential> {
    let cache = getAuthToken.cache as CredentialStore
    if (targetDomain in cache) {
        return cache[targetDomain]
    } else {
        let newAuthToken = await getNewAuthToken(targetDomain);
        cache[targetDomain] = newAuthToken;
        return newAuthToken;
    }
}
getAuthToken.cache = {}

async function getNewAuthToken(
    targetDomain: string = "ssb.cofc.edu"
):Promise<Credential> {

    console.info(`Authenticating with ${targetDomain}...`)

    //Step 1: make a request to a publicly availible endpoint
    let authURL = `https://${targetDomain}/StudentRegistrationSsb/ssb/term/termSelection?mode=search`

    let a = https.request({

    },(res)=>{
        res.headers
    })
    let response = await fetch(authURL) 

    console.info("Got response from server. now parsing...")

    // Step 2: Extract the JSessionID from the resopnse
    //
    // JSID is sent back as a cookie using the HTTP SET-COOKIE header
    let JSessionID = response
        .headers
        .get('set-cookie')
        .match(/JSESSIONID=([0-9A-F]+);/)
        [1]
    console.info(`JSID: ${JSessionID}`)
    
    // Step 3 - Extract the Sync Token from the response
    //
    // the sync token is sent as an attribute in a <meta> element
    let SyncToken = new JSDOM(await response.text())
        .window
        .document
        .querySelector('meta[name="synchronizerToken"]')
        .getAttribute('content')

    console.info(`Sync: ${SyncToken}`)

    let finalHeaders = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cookie': `JSESSIONID=${JSessionID}}`,
        'Connection': 'keep-alive',
        'Host': authURL,
        'Referer':
            `https://${authURL}/StudentRegistrationSsb/ssb/classSearch/classSearch`,

        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        'X-Synchronizer-Token': SyncToken,
        'X-Requested-With': 'XMLHttpRequest',
    }
    
    let provisionalHeaders = {
        ...finalHeaders,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
    }

    let provisionalPOSTURL = `https://${targetDomain}/StudentRegistrationSsb/ssb/term/search?mode=search`
    
    let knownGoodSemesterID = new Date().getFullYear() + "01"

    let req2 = fetch(
        provisionalPOSTURL,
        {
            headers: provisionalHeaders,
            method: "POST",
            body: `term=${knownGoodSemesterID}&studyPath=&studyPathText=&startDatepicker=&endDatepicker=`
        }
    );
    
    let res2 = await req2

    console.info(await res2.text())
    
    return {JSessionID, SyncToken}
}



await getAuthToken()