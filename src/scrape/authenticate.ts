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
    console.log(response.headers.toJSON())
    // Step 2: Extract the Cookie from the resopnse
    let cookie = response
        .headers
        .get('set-cookie')
    
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
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    headers.append('Cookie', cookie)
    headers.append('X-Synchronizer-Token', parsedSyncToken)

    //step 5 - authorize
    let final_url = `https://ssb.cofc.edu/StudentRegistrationSsb/ssb/term/search?mode=search`
    let final_data = 'term=202410&studyPath=&studyPathText=&startDatepicker=&endDatepicker='

    console.log(headers.get('cookie'))

    await fetch(final_url,{
        method:'post',
        body: final_data,
        headers
    })

    return headers
}