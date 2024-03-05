from prisma import Prisma
import jwt
from time import time
import tldextract
#from quart_cors import cors

from quart import Quart, request

app = Quart(__name__)
#app = cors(app, allow_origin="http://localhost:3000")
#app = cors(app, allow_origin="https://opal-ochre.vercel.app")

URLS = ["http://localhost:3000", "https://opal-ochre.vercel.app"]
ACCEPTED_EMAIL_DOMAINS=["noaa.gov", "msstate.edu"]
CLERK_PEM_PUBLIC_KEY="""-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvO06iWJ1mGVwtrynz9oq
m2jylpU7MXgRyU+gh2Mu9LLLKJbD5TnHD65K2VDl3CAhGi4au2vubUJx4H10W35B
U0SfpQxDIzyAUkNCHEhP6r7yJqQit/NeZUNl5eFXjuS9m8vu+4HovqD/yzRp39s8
+6kzCYKB80a+UQ4RbSqukXHN9EmRsz6m8zgosx95JgVt0iwJq6W+D00JaFdAjAC+
KY2G7ZV0d0P/XxepLOF5HyGCeZ9PVQlzDdm3Fb91S6jIDXVnhROrc4bUbTi2A/0Y
HlTwEsP5JlwUzAdYwaRp+GoCpsB8Y6C2j6iFzn8O6zazydUStp5Sop9nMgvcYCg9
4QIDAQAB
-----END PUBLIC KEY-----"""


# Helpers
def authenticate(encodedJWT):
	try:
		decoded = jwt.decode(encodedJWT, CLERK_PEM_PUBLIC_KEY, algorithms="RS256")
		inTime = decoded["nbf"] < time() < decoded["exp"]
		fromValidSource = "azp" in decoded and decoded["azp"] in URLS
		emailDomain = tldextract.extract(decoded["primaryEmail"])
		fromValidEmail = emailDomain.domain + "." + emailDomain.suffix in ACCEPTED_EMAIL_DOMAINS
		return inTime and fromValidSource and fromValidEmail
	except:
		return False


# Route handlers
@app.route("/")
async def hello_world():
	try:
		projects = None
		async with Prisma() as prisma:
			projects = await prisma.project.find_many()

		return list(map(lambda proj: proj.model_dump_json(), projects))
	except:
		return { "error": "Database error" }


@app.route("/admin", methods=["POST"])
async def admin():
	try:
		req = await request.get_json()
		auth = authenticate(req["jwt"])
		return { "authenticated": auth }
	except:
		return { "error": "Server could not handle the request" }



@app.route("/tourmalineReceive", methods=["POST"])
async def tourmaline_receive():
    try:
        form_data = await request.form
        print("Form data received:", dict(form_data))
        
        return {"message": "Form data received successfully"}
    except:
        return {"error": "Server could not handle the request"}
