from prisma import Prisma
import jwt
from time import time
import tldextract
from quart_cors import cors
import csv
import traceback
import pandas as pd

from quart import Quart, request
app = Quart(__name__)

URLS = ["http://localhost:3000", "https://opal-ochre.vercel.app"]
app = cors(app, allow_origin=URLS)

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
			projects = await prisma.study_data.find_many()

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
		# Directly read and print the raw request body for debugging
		raw_body = await request.get_data()
		print("Raw request body:", raw_body)

		form_fields = await request.form
		print("Form data received:")
		for name, value in form_fields.items():
			print(f"Field name: {name}, value: {value}")

		files = await request.files
		print("Files received:")
		for file_name, file in files.items():
			print(f"File name: {file_name}, file: {file.filename}")

		return{"message": "Form data received successfully"}	
	except Exception as e:  # Added to catch and print the exception
		print(f"Error processing request: {e}")
		return {"error": "Server could not handle the request"}, 500


@app.route("/testTaxon", methods=["POST"])
async def testData():
	print("testing taxon and feature data")
	try:
		async with Prisma() as prisma:
			featuresDF = pd.read_csv("prisma/features.csv")

			#add taxonomies to db
			taxons = featuresDF["Taxon"].unique()
			taxonomyOrder = ["domain", "kingdom", "supergroup", "division", "phylum", "subdivison", "taxonClass", "order", "family", "genus", "species"]
			for t in taxons:
				#build taxon query
				taxonData = {
					"stringIdentifier": t
				}
				split = list(filter(None, t.split(";")))
				for i, tName in enumerate(taxonomyOrder):
					taxonData[tName] = split[i] if i < len(split) else None

				#build feature-createMany nested query
				taxonDF = featuresDF.loc[featuresDF["Taxon"] == t]
				taxonData["Feature"] =  {
					"createMany": {
						"data": taxonDF.apply(lambda row: {
							"featureId": row["Feature ID"],
							"confidence": float(row["Confidence"])
						}, axis=1).to_list()
					}
				}

				await prisma.taxonomy.upsert(
					where = { "stringIdentifier": t },
					data = {
						"create": taxonData,
						"update": {
							"Feature": taxonData["Feature"]
						}
					}
				)

		print("success")
		return {"message": "Test successful"}
	except Exception:
		print(traceback.format_exc())
		return {"error": "Error"}


@app.route("/deleteTestTaxon", methods=["POST"])
async def deleteTestData():
	try:
		print("deleting")
		async with Prisma() as prisma:
			feature = await prisma.feature.delete_many()
			taxonomy = await prisma.taxonomy.delete_many()
		print("deleted")

		return {"message": "Deletion successful"}
	except:
		print(traceback.format_exc())
		return {"error": "Error"}


@app.route("/testMetadata", methods=["POST"])
async def testMetadata():
	print("testing metadata")
	try:
		async with Prisma() as prisma:
			metadataDF = pd.read_csv("prisma/metadata.csv").replace(float("nan"), None)
			print(metadataDF.to_dict("records")[0])
			await prisma.samplemetadata.create_many(
				data = metadataDF.to_dict("records")
			)

			# with open("prisma/tableMetadata.csv", newline="") as f:
			# 	reader = csv.DictReader(f)
			# 	data = []
			# 	for row in reader:
			# 		print(row)
			# 		data.append(row)
				# await prisma.samplemetadata.create_many(
				# 	data = data
				# )

		print("success")
		return {"message": "Test successful"}
	except:
		print(traceback.format_exc())
		return {"error": "Error"}
	

@app.route("/testOccurrences", methods=["POST"])
async def testOccurrences():
	print("testing occurrences data")
	try:
		async with Prisma() as prisma:
			with open("prisma/occurrences.csv", newline="") as f:
				reader = csv.DictReader(f)
				data = []
				for row in reader:
					featureId = row.pop("featureId")
					for key, value in row.items():
						data.append({
							"organismQuantity": value,
							"Feature": {
								"connect": {
									"featureId": featureId
								}
							},
							"SampleMetadata": {
								"connect": {
									"sample_name": key
								}
							}
						})
				await prisma.occurrence.create_many(
					data = data
				)

		print("success")
		return {"message": "Test successful"}
	except:
		print(traceback.format_exc())
		return {"error": "Error"}