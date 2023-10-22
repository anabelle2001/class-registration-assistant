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

    // Step 2: Extract the Cookie from the resopnse
    let cookie = response
        .headers
        .get('set-cookie')
    
    // Step 3 - Extract the Sync Token from the response
    let parsedSyncToken = new JSDOM(await response.text())
        .window
        .document
        .querySelector('meta[name="synchronizerToken"]')
        .getAttribute('content')


    // Step 4 - Create a headers object
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': cookie,
        'X-Synchronizer-Token': parsedSyncToken
    });

    //step 5 - authorize
    let final_url = `https://ssb.cofc.edu/StudentRegistrationSsb/ssb/term/search?mode=search`
    let final_data = 'term=202410&studyPath=&studyPathText=&startDatepicker=&endDatepicker='

    await fetch(final_url,{
        method:'post',
        body: final_data,
        headers
    })

    return headers
}