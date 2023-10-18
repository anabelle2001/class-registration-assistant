import { getAuthHeaders } from "./authenticate";


let second_url = `https://ssb.cofc.edu/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term=202410&startDatepicker=&endDatepicker=&pageOffset=1&pageMaxSize=10&sortColumn=courseReferenceNumber&sortDirection=asc`

let res = await fetch(second_url,{headers:getAuthHeaders()})
console.log(await res.text());
