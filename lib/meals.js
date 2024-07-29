import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
//import fs from 'node:fs';
import { S3 } from '@aws-sdk/client-s3';
import sharp from 'sharp';
const { VERCEL_AWS_ACCESS_KEY_ID, VERCEL_AWS_SECRET_ACCESS_KEY, VERCEL_AWS_BUCKET_PATH } =
  process.env;

const db = sql('meals.db');

const s3 = new S3({
  region: 'us-east-1',
  credentials: {
    accessKeyId: VERCEL_AWS_ACCESS_KEY_ID,
    secretAccessKey: VERCEL_AWS_SECRET_ACCESS_KEY,
  },
});

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // затримка для демонстрації

  //throw new Error('test error')
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  //throw new Error('test error')
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  const buffer = await sharp(bufferedImage)
    .resize({
      height: 450,
      width: 500,
      fit: 'cover',
    })
    .jpeg({ quality: 70 })
    .toBuffer();

  const params = {
    Bucket: VERCEL_AWS_BUCKET_PATH,
    Key: `MealsImage/${fileName}`,
    Body: Buffer.from(buffer),
    ContentType: meal.image.type,
  };

  try {
    await s3.putObject(params);
  } catch (error) {
    console.log('error ', error);
    throw new Error('Saving image to S3 failed!');
  }

  meal.image = `MealsImage/${fileName}`;

  // ==== блок для збереження файлів у локальне сховище.
  // ==== Виникає проблема потім що ці файли не відображаються на сайті
  //const stream = fs.createWriteStream(`public/images/${fileName}`);
  //const bufferedImage = await meal.image.arrayBuffer();

  //stream.write(
  //  Buffer.from(bufferedImage, (error) => {
  //    if (error) {
  //      throw new Error('Saving image failed!');
  //    }
  //  })
  //);

  //meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (creator, creator_email, title, summary, instructions, image, slug)
    VALUES (
      @creator,
      @creator_email,
      @title,
      @summary,
      @instructions,
      @image,
      @slug
    )
  `
  ).run(meal);
}
