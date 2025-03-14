import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' });

export const ourFileRouter = {
  // Chỉ cho phép upload 1 hình ảnh
  singleImageUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Single image uploaded:', file.url);
      return { uploadedBy: metadata.userId, fileUrl: file.url, url: file.url, expiresIn: '1h' };
    }),

  // Cho phép upload nhiều file
  fileUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 2 },
    video: { maxFileSize: '16MB' },
    pdf: { maxFileSize: '4MB' },
    text: { maxFileSize: '64KB' },
    'application/msword': { maxFileSize: '4MB' },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('File uploaded:', file.url);
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
