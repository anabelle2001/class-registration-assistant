import { listSectionsResponse, sectionResponse } from "./ellucianResponseTypes"

export async function getClasses(
    semester: string,
    headers:Headers,
    pageOffset=0,
    pageMaxSize=50,
):Promise<sectionResponse[]> {
    let proxyDomain = "http://127.0.0.0:10668"
    let realDomain = 'https://ssb.cofc.edu'
    let url = `${realDomain}/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term=202410/`

    let response = await fetch(url,{headers})

    console.log(await response.text());
    
    let json = (await response.json()) as listSectionsResponse

    if(json.success == false){
        throw new Error("response said success false");
    }

    if(json.ztcEncodedImage.length < 2000) {
        throw new Error("Got back an unusually short reply");
    }
    return json.data
}