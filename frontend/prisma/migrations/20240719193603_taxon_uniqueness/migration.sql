/*
  Warnings:

  - A unique constraint covering the columns `[domain,kingdom,supergroup,division,phylum,subdivison,class,order,family,genus,species]` on the table `Taxonomy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Taxonomy_domain_kingdom_supergroup_division_phylum_subdivis_key" ON "Taxonomy"("domain", "kingdom", "supergroup", "division", "phylum", "subdivison", "class", "order", "family", "genus", "species");
