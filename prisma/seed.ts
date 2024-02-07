import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function load() {
	try {
		//build default database configuration here
	} catch (e) {
	  	console.error(e);
	  	process.exit(1);
	} finally {
	  	await prisma.$disconnect();
	}
}

load();