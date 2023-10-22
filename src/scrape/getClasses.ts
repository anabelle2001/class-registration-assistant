import { listSectionsResponse, sectionResponse } from "./ellucianResponseTypes"

export async function getClasses(
    semester: string,
    headers:Headers,
    pageMaxSize=50,
    pageOffset=0,
    domain='ssb.cofc.edu'
):Promise<sectionResponse[]> {
    let url = `https://${domain}/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term=${semester}&startDatepicker=&endDatepicker=&pageOffset=${pageOffset}&pageMaxSize=${pageMaxSize}&sortColumn=courseReferenceNumber&sortDirection=asc`

    let response = await fetch(url,{headers})
    
    let json = (await response.json()) as listSectionsResponse

    if(json.success == false){
        throw new Error("response said success false");
    }

    if(json.ztcEncodedImage.length < 2000) {
        throw new Error("Got back an unusually short image, expected a big one");
    }
    return json.data
}