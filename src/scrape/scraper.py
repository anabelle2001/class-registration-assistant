#!/usr/bin/python3

import requests
import json 
from bs4 import BeautifulSoup
import time
import pickle

ROOT_URL = "ssb.cofc.edu"

class ellucianConnector():
    def __init__(self,domain):
        #If we don't specify a semester here, then ellucian will handle our authentication request but we won't be able to access specific data later
        dummySemesterID = "202310"
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
        semester_id,
        pageMaxSize=50,
        pageOffset=0
    ):
        subj = None

        url = f"https://{self.domain}/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term={semester_id}&startDatepicker=&endDatepicker=&pageOffset={pageOffset}&pageMaxSize={pageMaxSize}&sortColumn=courseReferenceNumber&sortDirection=asc"

        response = self.session.get(url)

        return json.loads(response.text)


    def getSemesters(
        self
    ):
        url = f"https://{self.domain}/StudentRegistrationSsb/ssb/classSearch/getTerms?offset=0&max=0"

        response = self.session.get(url)

        return json.loads(response.text)


	# session = createSession(ROOT_URL,date)

	# try: 
	# 	data = []
	# 	for i in range(0, 4000, 50):
	# 		print(f"getting classes for n={i}")
	# 		nxt = getClasses(session,date,50,i)
	# 		print(nxt['data'])
	# 		if not nxt['success']: break
	# 		data.extend(nxt['data'])
	# 		time.sleep(3)
	# except Exception as e:
	# 	print(f"oops: {e}")
	# finally:
	# 	print(f"<DATA>{data}</DATA>")

