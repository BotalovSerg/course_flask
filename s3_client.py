import os
import asyncio
from contextlib import asynccontextmanager
from aiobotocore.session import get_session

from dotenv import load_dotenv

load_dotenv(".env", override=True)


class S3Client:
    def __init__(
        self,
        access_key: str,
        secret_key: str,
        endpoint_url: str,
        bucket_name: str,
        region_name: str,
    ):
        self.config = {
            "aws_access_key_id": access_key,
            "aws_secret_access_key": secret_key,
            "endpoint_url": endpoint_url,
            "region_name": region_name,
        }
        self.bucket_name = bucket_name
        self.session = get_session()

    @asynccontextmanager
    async def get_client(self):
        async with self.session.create_client("s3", **self.config) as client:
            yield client

    async def upload_file(
        self,
        file_path: str,
    ):
        object_name = file_path.split("/")[-1]
        async with self.get_client() as client:
            with open(file_path, "rb") as file:
                await client.put_object(
                    Bucket=self.bucket_name,
                    Key=object_name,
                    Body=file,
                )


async def main():
    s3client = S3Client(
        access_key=os.getenv("Accesskey"),
        secret_key=os.getenv("Secretkey"),
        endpoint_url=os.getenv("ENDPOINT_URL"),
        bucket_name=os.getenv("BACKET_NAME"),
        region_name=os.getenv("REGION_NAME")
    )

    await s3client.upload_file("111.png")


if __name__ == "__main__":
    asyncio.run(main())
