import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async upload(file) {
    const { originalname } = file;
    const bucketS3 = 'innerscore-experiential-learning';
    return await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: 'AKIARVMYZ4WJ7PBDX6G5',
      secretAccessKey: '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',
    });
  }
}
