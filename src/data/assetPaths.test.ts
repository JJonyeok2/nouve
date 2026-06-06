import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { collections } from './collections';
import { products } from './products';

function publicAssetExists(publicPath: string) {
  const normalizedPath = publicPath.replace(/^\//, '');

  return existsSync(join(process.cwd(), 'public', normalizedPath));
}

describe('asset paths', () => {
  it('points product images to existing local files', () => {
    const productImages = products.flatMap((product) => product.images);

    expect(productImages.every(publicAssetExists)).toBe(true);
  });

  it('points collection images to existing local files', () => {
    expect(collections.map((collection) => collection.image).every(publicAssetExists)).toBe(true);
  });
});
