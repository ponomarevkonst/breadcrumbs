import { FONT_SIZE, RIGHT_OFFSET_WIDTH, SEPARATOR_WIDTH,SINGLE_DOT_WIDTH,TRIPLE_DOT_WIDTH } from "./constants";

export interface Breadcrumb {
  title: string;
  url: string;
}

export const truncateBreadcrumbs = (
  items: Breadcrumb[],
  screenWidth: number
): Breadcrumb[] => {
  if (items.length <= 1) {
    return [];
  }

  if (items.length === 2) {
    return items;
  }

  const titlesLength = items.reduce((acc, { title }) => acc + title.length, 0);
  const itemsWidth = titlesLength * FONT_SIZE;
  const itemsSeparatorCount = items.length;
  const itemsSeparatorWidth = itemsSeparatorCount * SEPARATOR_WIDTH;
  const availableWidth = screenWidth - RIGHT_OFFSET_WIDTH;

  if (itemsWidth + itemsSeparatorWidth <= availableWidth) {
    return items;
  }

  let remainingWidth = availableWidth - items[0].title.length * FONT_SIZE - SEPARATOR_WIDTH; 
  let remainingItemsReversed = [] as Breadcrumb[];

  for (let i = items.length - 1; i > 0; i--) {
    const item = items[i];
    const itemWidth = item.title.length * FONT_SIZE + SEPARATOR_WIDTH;
    if (remainingWidth >= itemWidth) {
      remainingWidth -= itemWidth;
      remainingItemsReversed.push(item);
    } else {
      const dotsWidth = remainingWidth > TRIPLE_DOT_WIDTH ? TRIPLE_DOT_WIDTH : SINGLE_DOT_WIDTH;
      remainingWidth -= dotsWidth;
      remainingItemsReversed.push({
        title: remainingWidth > 0 ? "..." : ".",
        url: item.url,
      });
      break;
    }
  }

  if (remainingItemsReversed.length <= 1) {
    return [];
  }

  return [items[0], ...remainingItemsReversed.reverse()]
};
