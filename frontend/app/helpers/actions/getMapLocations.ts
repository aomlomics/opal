'use server';

import { prisma } from "@/app/helpers/prisma";
import { DeadValue } from "@/types/enums";

export async function getMapLocations() {
    // Get all dead values as numbers
    const deadValues = Object.values(DeadValue).filter(v => !isNaN(Number(v))) as number[];

    return await prisma.$transaction(async (tx) => {
        return tx.sample.groupBy({
            by: ['project_id'],
            _sum: {
                decimalLatitude: true,
                decimalLongitude: true,
            },
            _count: {
                decimalLatitude: true,
                decimalLongitude: true,
            },
            where: {
                AND: [
                    {
                        NOT: {
                            decimalLatitude: {
                                in: deadValues
                            }
                        }
                    },
                    {
                        NOT: {
                            decimalLongitude: {
                                in: deadValues
                            }
                        }
                    }
                ]
            }
        });
    });
} 