import requests
import json 
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request

class ellucianConnector():
    def __init__(self,domain):
        #If we don't specify a semester here, then ellucian will handle our authentication request but we won't be able to access specific data later
        dummySemesterID = "202410"
        self.domain = domain

        handshakeURL = f'https://{domain}/StudentRegistrationSsb/ssb/term/termSelection?mode=search'

        self.session = requests.Session()
        auth_response = self.session.get(handshakeURL)
        auth_response_parser = BeautifulSoup(auth_response.text,'html.parser')
        auth_token = auth_response_parser.find('meta',{'name':'synchronizerToken'}).attrs['content']

        final_headers = {
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding':'gzip, deflate, br',
            'Accept-Language':'en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie':f'JSESSIONID={self.session.cookies["JSESSIONID"]}',
            'Connection':'keep-alive',
            'Host':domain,
            'Referer':(
                f'https://{domain}/StudentRegistrationSsb/ssb/classSearch/classSearch' 
            ),
            'User-Agent':(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                '(KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
            ),
            'X-Synchronizer-Token':auth_token,
            'X-Requested-With':'XMLHttpRequest',
        }
        
        provisional_headers = {
            ** final_headers,
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept':'*/*',
        }

        self.session.post(
            f'https://{domain}/StudentRegistrationSsb/ssb/term/search?mode=search',
            data=f'term={dummySemesterID}&studyPath=&studyPathText=&startDatepicker=&endDatepicker=',
            headers=provisional_headers
        )

        self.session.headers = final_headers

    def getClassesPaginated(
        self,
        semesterID,
        pageMaxSize=50,
        pageOffset=0
    ) -> str:
        subj = None

        url = f"https://{self.domain}/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term={semesterID}&startDatepicker=&endDatepicker=&pageOffset={pageOffset}&pageMaxSize={pageMaxSize}&sortColumn=courseReferenceNumber&sortDirection=asc"

        response = self.session.get(url)

        return response.text

    def getSemesters(
        self
    ) -> str:
        url = f"https://{self.domain}/StudentRegistrationSsb/ssb/classSearch/getTerms?offset=0&max=0"

        response = self.session.get(url)

        return response.text

if __name__ == '__main__':
    instance = ellucianConnector('ssb.cofc.edu')

    app = Flask(__name__)

    @app.route('/newIdentity',methods=['GET'])
    def newIdentity():
        instance = ellucianConnector('ssb.cofc.edu')
        return "done"

    @app.route('/getSemesters',methods=['GET'])
    def getData():
        return instance.getSemesters()

    @app.route('/getClassesPaginated')
    def getClassesPaginated():
        if request.args.get('semesterID') is None:
            return "can i have a <code>?semesterID=20xxxx</code> please? 🥺"

        positionalArgs = {'pageMaxSize','pageOffset','semesterID'}
        paramsReceived = set(request.args.keys())
    
        # We 
        functionArgs = {
            param: request.args.get(param) 
            for param in paramsReceived if param in positionalArgs
        }

        print(functionArgs)
        return instance.getClassesPaginated(**functionArgs)

    app.run()
