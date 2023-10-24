#!/usr/bin/python3

import requests
import json 
from bs4 import BeautifulSoup
import time
import pickle

def createSession(baseURL,datecode,tryHack):
	handshakeURL = f'https://{baseURL}/StudentRegistrationSsb/ssb/term/termSelection?mode=search'
	auth_session = requests.Session()
	handshake_response = auth_session.get(handshakeURL)
	handshake_response_parser = BeautifulSoup(handshake_response.text,'html.parser')
	auth_token = handshake_response_parser.find('meta',{'name':'synchronizerToken'}).attrs['content']
	headers = {
		# 'Accept':'application/json, text/javascript, */*; q=0.01',
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		# 'Accept-Encoding':'gzip, deflate, br',
		# 'Accept-Language':'en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
		# 'Connection':'keep-alive',
		# 'Host':baseURL,
		# 'Referer':(
		# 	f'https://{baseURL}/StudentRegistrationSsb/ssb/classSearch/classSearch' 
		# ),
		# 'User-Agent':(
		# 	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
		# 	'(KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
		# ),
		'X-Synchronizer-Token':auth_token,
		# 'X-Requested-With':'XMLHttpRequest',
	}
	
	auth_session.headers = headers
	cookies = auth_session.cookies

	final_url = f'https://{baseURL}/StudentRegistrationSsb/ssb/term/search?mode=search'
	final_data = f'term={datecode}&studyPath=&studyPathText=&startDatepicker=&endDatepicker='

	requests.post(
		final_url,
		data=final_data,
		headers=headers,
		cookies=handshake_response.cookies,
	)
	
	foo = requests.Session()
	# foo.headers = headers
	foo.cookies = cookies
	return foo

def getClasses(
	auth_session,
	datecode,
	pageMaxSize=50,
	pageOffset=0
):
	subj = None

	second_url = f"https://{root_url}/StudentRegistrationSsb/ssb/searchResults/searchResults?{'txt_subject={subj}&' if subj else ''}txt_term={datecode}&startDatepicker=&endDatepicker=&pageOffset={pageOffset}&pageMaxSize={pageMaxSize}&sortColumn=courseReferenceNumber&sortDirection=asc"

	final = auth_session.get(second_url)
	return json.loads(final.text)

if __name__ == "__main__":
	root_url = "ssb.cofc.edu"
	date = '202420'
	sessionHack = createSession(root_url,date,True)
	session = createSession(root_url,date,True)

	print(len(getClasses(sessionHack,date,1,2)['ztcEncodedImage']))
	try: 
		data = []
		for i in range(0, 4000, 50):
			print(f"getting classes for n={i}")
			nxt = getClasses(session,date,50,i)
			print(nxt['data'])
			if not nxt['success']: break
			data.extend(nxt['data'])
			time.sleep(3)
	except Exception as e:
		print(f"oops: {e}")
	finally:
		print(f"<DATA>{data}</DATA>")
		with open(f"{date}.json", 'w') as f:
			json.dump(data, f)


