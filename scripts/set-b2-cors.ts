
import { config } from "dotenv";
import { resolve } from "node:path";

import {
    S3Client,
    PutBucketCorsCommand,
    GetBucketCorsCommand,
} from "@aws-sdk/client-s3";

config({ path: resolve(process.cwd(), ".env") });

const required = [
    "B2_APPLICATION_KEY_ID",
    "B2_APPLICATION_KEY",
    "B2_BUCKET_NAME",
    "B2_ENDPOINT",
];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

const client = new S3Client({
    region: process.env.B2_REGION || "us-east-005",
    endpoint: process.env.B2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.B2_APPLICATION_KEY_ID!,
        secretAccessKey: process.env.B2_APPLICATION_KEY!,
    },
});

async function main() {
    const bucket = process.env.B2_BUCKET_NAME!;
    const appUrl = process.env.APP_URL || "https://hackathon.hyperlearningtech.in";
    const allowedOrigins = Array.from(
        new Set([
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://hackathon.hyperlearningtech.in",
            appUrl,
        ])
    );

    await client.send(
        new PutBucketCorsCommand({
            Bucket: bucket,
            CORSConfiguration: {
                CORSRules: [
                    {
                        AllowedOrigins: allowedOrigins,
                        AllowedMethods: ["PUT", "GET", "HEAD"],
                        AllowedHeaders: ["*"],
                        ExposeHeaders: ["ETag"],
                        MaxAgeSeconds: 3600,
                    },
                ],
            },
        })
    );

    console.log("CORS configuration submitted.");

    const result = await client.send(
        new GetBucketCorsCommand({ Bucket: bucket })
    );

    console.log("Verified CORS configuration:");
    console.log(JSON.stringify(result.CORSRules, null, 2));
}

main().catch((error) => {
    console.error("B2 CORS configuration failed:", error);
    process.exit(1);
});
