import { listSectionsResponse, sectionResponse } from "./ellucianResponseTypes"

export async function getSections(
    semester: string,
    headers:Headers,
    pageMaxSize=50,
    pageOffset=0,
    domain='ssb.cofc.edu'
):Promise<listSectionsResponse> {
    let url = `https://${domain}/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term=${semester}&startDatepicker=&endDatepicker=&pageOffset=${pageOffset}&pageMaxSize=${pageMaxSize}&sortColumn=courseReferenceNumber&sortDirection=asc`

    let response = await fetch(url,{headers})
    
    let json = (await response.json()) as listSectionsResponse

    if (json == null) {
        throw new Error(
            "when requesting section list, got null response"
        )
    }

    if(json.success == false){
        throw new Error(
            "when requesting section list, got response of {success: false}"
        );
    }

    if(json.ztcEncodedImage.length < 2000) {
        throw new Error(
            "Got back an unusually short image, expected a big one"
        );
    }
    
    return json;
}