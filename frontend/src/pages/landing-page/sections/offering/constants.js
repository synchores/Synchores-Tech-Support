import { offerings } from './data/offeringsData';

export const OFFERINGS_DATA = offerings.map((offering, index) => ({
  id: offering.id,
  title: offering.title,
  displayTitle: offering.displayTitle,
  subtitle: offering.heroSubtitle,
  color: index === 0 ? '#008B99' : '#6B7280',
  video: offering.video,
  description: offering.longDescription,
}));
