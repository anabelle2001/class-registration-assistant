import * as resTypes from "./ellucianResponseTypes"
import "./millisecondDurations"
import { timeElapsed } from "./millisecondDurations"

function waitFor(milliseconds: number){
    return new Promise((resolve)=>{
        setTimeout(resolve,milliseconds)
    })
}

class DatabaseUpdater {
    constructor(){
        const proc = Bun.spawn(['/usr/bin/python3', './scraper.py'])
    }

    async getSectionListResponse(
        termcode:string,
        sectionsPerQuery: number
    ): Promise<resTypes.sectionResponse[]> {
        //part one: make sure arguments are sane
        if(termcode.length != 6){
            throw new Error("semester IDs / termcodes have to be six digit strings. They follow the format YYYY[123]0")
        }

        if(sectionsPerQuery < 10) {
            throw new Error(`When calling this function, \`sectionsPerquery\` should be at least 10. You gave it a value of ${sectionsPerQuery}. It'll probably work with smaller values but we don't want to overwhelm the server`)
        }

        //part two: make sure our list of terms / semesters is up to date,
        //          and make sure that the supplied termcode is valid.
        this.updateTerms();
        if(!this.validTerm(termcode)){
            const err = `Cannot get sections for term/semester "${termcode}" because "${termcode}" is not a valid term `

            throw new Error(err)
        }

        //part three: figure out how many sections are listed in the given term.
        let initialQueryURL = `http://localhost:5000/getClassesPaginated?pageMaxSize=0&pageOffset=0&semesterID=${termcode}'`

        let initialResponse = await fetch(initialQueryURL)
        let initialResponseTxt = await initialResponse.text() 

        //if we get an error from this line, then the server returned a response in an unexpected format
        let initialResponseJSON = JSON.parse(initialResponseTxt) as resTypes.listSectionsResponse;

        if(!initialResponseJSON.success){
            const err = `Failed to download section list for term "${termcode}", proxy responded to initial request with valid json response, but result came with key {success:false}`
            throw new Error(err);
        }

        let numSections = initialResponseJSON.totalCount;




        //part four: actually get the sections
        let responses: resTypes.listSectionsResponse[] = []
        let retryCount = 0;
        for(let offset = 0; offset < numSections; offset+= sectionsPerQuery){
            const url = `http://localhost:5000/getClassesPaginated?pageMaxSize=${sectionsPerQuery}&pageOffest=${offset}&semesterID=${termcode}`
            const res = await fetch(url)
            const resText = await res.text()
            const resJSON = await res.json() as resTypes.listSectionsResponse

            if (!resJSON.success) {
                const err = `Failed to download section list for term "${termcode}" - got syntactically valid json, but saw {success:false}`
                throw new Error(err);
            }


            //if our query stays the same, but the number of classes in the result changes, then the ellucian db changed, and we should restart
            if (resJSON.totalCount != numSections) {
                console.log("While fetching a section list, the number of visible sections changed. Restarting...")

                responses = [];
                numSections = resJSON.totalCount;
                retryCount++;
                offset = 0;

                console.log(`(Attempt ${retryCount+1})`)

                if(retryCount >= 3){
                    const err = "response.totalCount changed three times - no bueno"
                    throw new Error(err);                    
                }
            }

            responses.push(resJSON)
        }


        //part 5 - take the array of responses and synthesize it into one response
        return responses.map(res=>res.data).flat()
    }


    terms: resTypes.term[]
    termsLastUpdated: Date

    async updateTerms() {

        // Step 1 - make sure we don't do another update if we've done one recently
        const now = new Date()
        if(! timeElapsed(
            this.termsLastUpdated,
            now,
            1, "hour"
        )) return;

        this.termsLastUpdated = now;
        
        let res = await fetch('http://localhost:5000/getSemesters')
        
        let resJSON = JSON.parse(await res.text()) as resTypes.term[]
        this.terms = resJSON
    }

    validTerm(termcode: string){
        for(let i = 0; i < this.terms.length; i++){
            if (this.terms[i].code == termcode) return true;
        }
        return false
    }
}

