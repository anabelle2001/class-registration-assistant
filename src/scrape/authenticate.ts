import {JSDOM} from "jsdom";

/**
 * Authenticates anonymously with an ellucian server, 
 * allowing for the user to perform more sensitive requests
 * 
 * @param {string} targetDomain The URL of the server to authenticate with. Defaults to cofc.
 * 
 * @returns {Headers} A set of HTTP Headers that can be used to authenticate with the ellucian server
 */

export async function getAuthHeaders(
    targetDomain: String = "ssb.cofc.edu"
): Promise<Headers> {
    
    console.info(`Authenticating with ${targetDomain}...`)

    //Step 1: make a request to a publicly availible endpoint
    let authURL = `https://${targetDomain}/StudentRegistrationSsb/ssb/term/termSelection?mode=search`
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
    let parsedSyncToken = new JSDOM(await response.text())
        .window
        .document
        .querySelector('meta[name="synchronizerToken"]')
        .getAttribute('content')
    console.info(`Sync: ${parsedSyncToken}`)


    // Step 4 - Create a headers object
    //
    let headers = new Headers();
    headers.append('Accept', 'application/json, text/javascript, */*; q=0.01')
    headers.append('Accept-Encoding', 'gzip, deflate, br')
    headers.append('Accept-Language', 'en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7')
    headers.append('Cookie', `JSESSIONID=${JSessionID}}`)
    headers.append('Connection', 'keep-alive')
    headers.append('Host', authURL)
    headers.append('Referer',
        `https://${authURL}/StudentRegistrationSsb/ssb/classSearch/classSearch`
    )
    headers.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36')
    headers.append('X-Synchronizer-Token', parsedSyncToken)
    headers.append('X-Requested-With', 'XMLHttpRequest')

    return headers
}