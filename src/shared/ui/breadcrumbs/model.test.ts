import { truncateBreadcrumbs } from './model';
import {
  Breadcrumb
} from './model';

describe('truncateBreadcrumbs', () => {
  const items: Breadcrumb[] = [
    { title: 'Home', url: '/home' },
    { title: 'Category', url: '/category' },
    { title: 'Subcategory', url: '/subcategory' },
    { title: 'Product', url: '/product' },
  ];

  it('returns an empty array when there is only one item', () => {
    const result = truncateBreadcrumbs([{ title: 'Home', url: '/home' }], 800);
    expect(result).toEqual([]);
  });

  it('returns the same array when there are only two items', () => {
    const result = truncateBreadcrumbs([{ title: 'Home', url: '/home' }, { title: 'Category', url: '/category' }], 800);
    expect(result).toEqual([{ title: 'Home', url: '/home' }, { title: 'Category', url: '/category' }]);
  });

  it('returns the same array when there is enough space for all items', () => {
    const result = truncateBreadcrumbs(items, 800);
    expect(result).toEqual(items);
  });

  it('truncates the items when there is not enough space', () => {
    const result = truncateBreadcrumbs(items, 400);
    expect(result).toEqual([
      { title: 'Home', url: '/home' },
      { title: '...', url: '/subcategory' },
      { title: 'Product', url: '/product' },
    ]);
  });

  it('truncates the items with no dots when there is not enough space for any item', () => {
    const result = truncateBreadcrumbs(items, 200);
    expect(result).toEqual([]);
  });
});


